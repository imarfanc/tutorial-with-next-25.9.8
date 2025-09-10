# Deno KV Playbook

Elegant patterns for tiny, fast content APIs (Files + HTML pages) using Deno KV and Hono. Skim this header for the gist; the rest of the document has fully copy‑pasteable code.

---

## TL;DR

- Run this in Deno (local, Deploy, or edge). If your app is Node/Nuxt, call this service over HTTP.
- Use tuple keys with clear prefixes. List by prefix, upsert with `atomic()` to avoid conflicts.
- Store small/medium strings or JSON in KV; for large blobs store elsewhere and keep metadata in KV.

### Keyspace at a glance

```
["files", "{filename}"]                         -> string (plain text or HTML)
["html",  "HTML-PAGES-V7-INDEX.json"]          -> string (JSON array of entries)
["html",  "{resolved-filename}.html"]          -> string (HTML)
```

---

## Table of contents

- [Prerequisites](#prerequisites)
- [Project skeleton](#project-skeleton)
- [server.ts](#serverts)
- [routes/files.ts](#routesfilests)
- [routes/html-pages.ts](#routeshtml-pagests)
- [Running locally](#running-locally)
- [Notes on design choices](#notes-on-design-choices)
- [Deploying](#deploying)
- [Integrating with a Node/Nuxt app](#integrating-with-a-nodenuxt-app)
- [Port customization](#port-customization)
- [Minimal reference snippets](#minimal-reference-snippets)

---

## Why this design

- Zero external dependencies: Deno KV is built in; Hono is URL‑imported.
- Minimal surface area: a few clear endpoints; predictable keyspace.
- Safe writes: `atomic()` pattern prevents lost updates during concurrent writes.
- Fast reads: prefix scans let you list everything in a namespace efficiently.

## When not to use this

- Very large files or binary assets (send them to object storage and keep pointers in KV).
- Complex relational queries (use a relational DB; KV is for direct key lookups and prefix scans).

# Deno KV quick guide: building simple content APIs

This document shows how to use Deno KV to build small APIs for storing and serving text/HTML content. It is written so another LLM can follow it step‑by‑step to recreate two APIs:

- Files API: GET/PUT/DELETE plain text by filename
- HTML Pages API: GET an HTML page by a human‑friendly title using either an index JSON or a slugged filename fallback

Important constraints:

- Deno KV is available only in the Deno runtime (local deno, Deno Deploy, or Deno on the edge). It is not available inside a Node/Nuxt server. If your app runs on Node, run a small Deno microservice and call it over HTTP.
- KV values are intended for small/medium blobs. For large files, store externally and keep pointers/metadata in KV.

Prerequisites

- Install Deno: https://deno.land
- Use Deno v1.45+ for stable KV APIs

Project skeleton

Create three files:

- server.ts — Hono app with routes
- routes/files.ts — reusable Files API using KV
- routes/html-pages.ts — reusable HTML Pages API using KV

deno.json (optional, for tasks/permissions)

```json
{
  "tasks": {
    "dev": "deno run -A --watch server.ts",
    "start": "deno run -A server.ts"
  }
}
```

Install nothing: Deno fetches URL imports automatically.

Shared KV approach

- Open KV once at startup and reuse it.
- Use tuple keys with a stable prefix: ["files", filename] and ["html", filename]
- Use atomic() for upserts to avoid lost updates.

server.ts

```ts
// server.ts
import { Hono } from "jsr:@hono/hono";
import { registerFilesRoutes } from "./routes/files.ts";
import { registerHtmlPagesRoutes } from "./routes/html-pages.ts";

const app = new Hono();

// Open KV once
const kv = await Deno.openKv();

// Mount routes
registerFilesRoutes(app, kv);
registerHtmlPagesRoutes(app, kv);

Deno.serve(app.fetch);
```

routes/files.ts

```ts
// routes/files.ts
import type { Hono } from "jsr:@hono/hono";

export function registerFilesRoutes(app: Hono, kv: Deno.Kv) {
  // GET file content (text) by filename
  app.get("/files/:filename", async (c) => {
    const filename = c.req.param("filename");
    const key = ["files", filename] as const;
    const res = await kv.get<string>(key);
    const content = res.value ?? "";
    return c.json({ content });
  });

  // PUT create/update file content
  app.put("/files/:filename", async (c) => {
    const filename = c.req.param("filename");
    const { content } = await c.req.json();
    if (typeof content !== "string") {
      return c.json({ error: "Content must be a string" }, 400);
    }
    const key = ["files", filename] as const;
    // upsert with atomic for safety
    const cur = await kv.get<string>(key);
    const tx = kv.atomic();
    if (cur.versionstamp) tx.check(cur);
    tx.set(key, content);
    const ok = (await tx.commit()).ok;
    return ok
      ? c.json({ success: true, filename })
      : c.json({ error: "Conflict" }, 409);
  });

  // GET list all filenames (recent first)
  app.get("/files", async (c) => {
    const iter = kv.list<string>({ prefix: ["files"] }, { reverse: true });
    const files: Array<{ filename: string }> = [];
    for await (const e of iter) {
      const [, name] = e.key as ["files", string];
      files.push({ filename: name });
    }
    return c.json({ files });
  });

  // DELETE file
  app.delete("/files/:filename", async (c) => {
    const filename = c.req.param("filename");
    const key = ["files", filename] as const;
    await kv.delete(key);
    return c.json({ success: true, filename });
  });
}
```

routes/html-pages.ts

```ts
// routes/html-pages.ts
import type { Hono } from "jsr:@hono/hono";

type IndexEntry = {
  id: string;
  sort_title: string;
  category?: string;
  height?: number;
  filename: string;
  created_at?: string;
  updated_at?: string;
};

const slugify = (input: string): string =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const filenameFromSortTitle = (sortTitle: string) =>
  `HTML-PAGES-V7-${slugify(sortTitle || "page")}.html`;

export function registerHtmlPagesRoutes(app: Hono, kv: Deno.Kv) {
  app.get("/html/:sortTitle", async (c) => {
    const sortTitle = c.req.param("sortTitle");

    // 1) Try to resolve via index JSON stored at a fixed key
    const indexKey = ["html", "HTML-PAGES-V7-INDEX.json"] as const;
    let resolvedFilename: string | null = null;
    try {
      const res = await kv.get<string>(indexKey);
      const raw = res.value ?? "";
      if (raw.trim()) {
        const entries = JSON.parse(raw) as IndexEntry[];
        const match = entries.find((e) => e.sort_title === sortTitle);
        if (match?.filename) resolvedFilename = match.filename;
      }
    } catch {
      // ignore malformed index
    }

    // 2) Fallback to slug-based filename
    const filename = resolvedFilename ?? filenameFromSortTitle(sortTitle);
    const pageKey = ["html", filename] as const;
    const page = await kv.get<string>(pageKey);
    const html = page.value ?? "";
    if (!html.trim()) {
      return new Response("Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  });
}
```

Running locally

- Start the server:

```sh
deno task dev
# or
deno run -A server.ts
```

- Test with curl:

```sh
# Save a file
curl -X PUT localhost:8000/files/hello.txt \
  -H 'content-type: application/json' \
  -d '{"content":"Hello KV"}'

# Read it
curl localhost:8000/files/hello.txt

# List files
curl localhost:8000/files

# Delete it
curl -X DELETE localhost:8000/files/hello.txt

# Save an HTML page and index
curl -X PUT localhost:8000/files/HTML-PAGES-V7-INDEX.json \
  -H 'content-type: application/json' \
  -d '{"content":"[{\"id\":\"1\",\"sort_title\":\"My Page\",\"filename\":\"HTML-PAGES-V7-my-page.html\"}]"}'

curl -X PUT localhost:8000/files/HTML-PAGES-V7-my-page.html \
  -H 'content-type: application/json' \
  -d '{"content":"<html><body><h1>My Page</h1></body></html>"}'

# Fetch the HTML via sort title
curl localhost:8000/html/My%20Page
```

Notes on design choices

- No SQL schema migrations. KV uses keys and values; you design the key-space instead of tables.
- Use prefixes to group related data. They make listing fast and cheap.
- Use atomic() for compare-and-set style writes to avoid overwriting concurrent updates.
- For TTL/expiring data you can pass an options object to set() with expireIn (ms). Example: kv.set(key, value, { expireIn: 60_000 }).
- Values are JSON-serializable. For HTML or arbitrary text, store strings. For binary, use Uint8Array.

Deploying

- Deno Deploy: push this repo and use Deno.serve handler. KV storage is provisioned automatically in Deploy.
- Self-hosted Deno: KV stores data on disk locally for development. For production you can use Deploy or a Deno KV compatible service when available.

Integrating with a Node/Nuxt app

- Keep your Nuxt app as-is.
- Run this Deno server alongside it on another port.
- From Nuxt, call the Deno endpoints with $fetch/axios/fetch just like any other API.
- This avoids the “Deno is not defined” error you saw when trying to open KV inside a Node process.

Port customization

Hono defaults to port 8000 under Deno. To change:

```ts
// server.ts
// ...
Deno.serve({ port: 8787 }, app.fetch);
```

Minimal reference snippets

```ts
// Open once
const kv = await Deno.openKv();

// Get
const v = await kv.get(["ns", "k"]);

// Set
await kv.set(["ns", "k"], "value");

// Atomic upsert
const cur = await kv.get(["ns", "k"]);
const tx = kv.atomic();
if (cur.versionstamp) tx.check(cur);
tx.set(["ns", "k"], "value");
const ok = (await tx.commit()).ok;

// List
for await (const e of kv.list({ prefix: ["ns"] })) {
  console.log(e.key, e.value);
}

// Delete
await kv.delete(["ns", "k"]);
```

That’s it. Copy the three files into a Deno project, adjust prefixes as needed, and you have a small KV-backed content API ready to be called from any frontend or server.

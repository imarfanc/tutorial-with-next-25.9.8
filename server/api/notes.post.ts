export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, content } = body;

  // @ts-ignore
  const kv = await Deno.openKv();
  const id = crypto.randomUUID();
  const note = {
    id,
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await kv.set(["notes", id], note);
  return note;
});
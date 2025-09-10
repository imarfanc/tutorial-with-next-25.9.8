export default defineEventHandler(async (event) => {
  // @ts-ignore
  // @ts-ignore
  const kv = await Deno.openKv();
  const body = await readBody(event);
  const id = Date.now().toString();
  await kv.set(["todos", id], body.text);
  return { id, text: body.text };
});

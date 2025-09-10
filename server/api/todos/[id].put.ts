export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  await kv.set(["todos", id], body.text);
  return { id, text: body.text };
});

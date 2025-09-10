export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const id = getRouterParam(event, "id");
  await kv.delete(["todos", id]);
  return { success: true };
});

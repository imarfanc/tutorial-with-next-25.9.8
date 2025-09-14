export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  // @ts-ignore
  const kv = await Deno.openKv();
  await kv.delete(["notes", id]);
  return { success: true };
});
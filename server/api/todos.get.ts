export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const todoFile = await kv.get(["files", "todos-25914.json"]);

  if (!todoFile.value) {
    return [];
  }

  return todoFile.value.todos || [];
});

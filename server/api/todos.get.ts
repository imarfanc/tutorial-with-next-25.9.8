export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();

  // Get existing todos file
  const todosFile = await kv.get(["files", "todos-25914.json"]);
  const todos = todosFile.value?.todos || [];

  return todos;
});
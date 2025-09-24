export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  // @ts-ignore
  const kv = await Deno.openKv();

  // Get existing todos file
  const todosFile = await kv.get(["files", "todos-25914.json"]);
  let todos = todosFile.value?.todos || [];

  // Remove todo by id
  todos = todos.filter(todo => todo.id !== id);

  // Save back to file
  await kv.set(["files", "todos-25914.json"], {
    todos,
    lastUpdated: new Date().toISOString(),
  });

  return { success: true };
});
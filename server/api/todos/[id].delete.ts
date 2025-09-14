export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const id = getRouterParam(event, "id");

  // Get existing todos file
  const todoFile = await kv.get(["files", "todos-25914.json"]);
  let todos = todoFile.value?.todos || [];

  // Remove todo by id
  todos = todos.filter(todo => todo.id !== id);

  // Save back to file
  await kv.set(["files", "todos-25914.json"], {
    todos,
    lastUpdated: new Date().toISOString(),
  });

  return { success: true };
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const { text, completed } = body;

  // @ts-ignore
  const kv = await Deno.openKv();

  // Get existing todos file
  const todosFile = await kv.get(["files", "todos-25914.json"]);
  let todos = todosFile.value?.todos || [];

  // Find and update the todo
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Todo not found",
    });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    text: text !== undefined ? text : todos[todoIndex].text,
    completed: completed !== undefined ? completed : todos[todoIndex].completed,
    updatedAt: new Date().toISOString(),
  };

  // Save back to file
  await kv.set(["files", "todos-25914.json"], {
    todos,
    lastUpdated: new Date().toISOString(),
  });

  return todos[todoIndex];
});
export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  // Get existing todos file
  const todoFile = await kv.get(["files", "todos-25914.json"]);
  let todos = todoFile.value?.todos || [];

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
    text: body.text,
    updatedAt: new Date().toISOString(),
  };

  // Save back to file
  await kv.set(["files", "todos-25914.json"], {
    todos,
    lastUpdated: new Date().toISOString(),
  });

  return todos[todoIndex];
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { text } = body;

  if (!text) {
    throw createError({
      statusCode: 400,
      statusMessage: "Todo text is required",
    });
  }

  // @ts-ignore
  const kv = await Deno.openKv();

  // Get existing todos file
  const todosFile = await kv.get(["files", "todos-25914.json"]);
  let todos = todosFile.value?.todos || [];

  // Create new todo
  const newTodo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.push(newTodo);

  // Save back to file
  await kv.set(["files", "todos-25914.json"], {
    todos,
    lastUpdated: new Date().toISOString(),
  });

  return newTodo;
});
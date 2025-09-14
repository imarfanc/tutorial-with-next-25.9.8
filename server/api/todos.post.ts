export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const body = await readBody(event);

  // Get existing todos file
  const todoFile = await kv.get(["files", "todos-25914.json"]);
  let todos = todoFile.value?.todos || [];

  // Add new todo
  const newTodo = {
    id: crypto.randomUUID(),
    text: body.text,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);

  // Save back to file
  await kv.set(["files", "todos-25914.json"], {
    todos,
    lastUpdated: new Date().toISOString(),
  });

  return newTodo;
});

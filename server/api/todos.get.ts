export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const todos = [];
  for await (const entry of kv.list({ prefix: ["todos"] })) {
    if (entry.value) {
      todos.push({
        id: entry.key[1],
        text: entry.value,
      });
    }
  }
  return todos;
});

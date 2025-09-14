export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const notes = [];
  for await (const entry of kv.list({ prefix: ["notes"] })) {
    notes.push(entry.value);
  }
  return notes;
});
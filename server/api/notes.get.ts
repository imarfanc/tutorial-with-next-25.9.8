export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const notesFile = await kv.get(["files", "notes-25914.json"]);

  if (!notesFile.value) {
    return [];
  }

  return notesFile.value.notes || [];
});
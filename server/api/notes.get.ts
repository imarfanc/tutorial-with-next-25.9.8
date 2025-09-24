export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();

  // Get existing notes file
  const notesFile = await kv.get(["files", "notes-25914.json"]);
  const notes = notesFile.value?.notes || [];

  return notes;
});
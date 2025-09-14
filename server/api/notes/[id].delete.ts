export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  // @ts-ignore
  const kv = await Deno.openKv();

  // Get existing notes file
  const notesFile = await kv.get(["files", "notes-25914.json"]);
  let notes = notesFile.value?.notes || [];

  // Remove note by id
  notes = notes.filter(note => note.id !== id);

  // Save back to file
  await kv.set(["files", "notes-25914.json"], {
    notes,
    lastUpdated: new Date().toISOString(),
  });

  return { success: true };
});
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, content } = body;

  // @ts-ignore
  const kv = await Deno.openKv();

  // Get existing notes file
  const notesFile = await kv.get(["files", "notes-25914.json"]);
  let notes = notesFile.value?.notes || [];

  // Add new note
  const newNote = {
    id: crypto.randomUUID(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  notes.push(newNote);

  // Save back to file
  await kv.set(["files", "notes-25914.json"], {
    notes,
    lastUpdated: new Date().toISOString(),
  });

  return newNote;
});
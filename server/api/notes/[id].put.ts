export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const { title, content } = body;

  // @ts-ignore
  const kv = await Deno.openKv();

  // Get existing notes file
  const notesFile = await kv.get(["files", "notes-25914.json"]);
  let notes = notesFile.value?.notes || [];

  // Find and update the note
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Note not found",
    });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content,
    updatedAt: new Date().toISOString(),
  };

  // Save back to file
  await kv.set(["files", "notes-25914.json"], {
    notes,
    lastUpdated: new Date().toISOString(),
  });

  return notes[noteIndex];
});
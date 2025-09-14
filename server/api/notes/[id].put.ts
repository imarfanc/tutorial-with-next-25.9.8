export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const { title, content } = body;

  // @ts-ignore
  const kv = await Deno.openKv();
  const existingNote = await kv.get(["notes", id]);

  if (!existingNote.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Note not found",
    });
  }

  const updatedNote = {
    ...existingNote.value,
    title,
    content,
    updatedAt: new Date().toISOString(),
  };

  await kv.set(["notes", id], updatedNote);
  return updatedNote;
});
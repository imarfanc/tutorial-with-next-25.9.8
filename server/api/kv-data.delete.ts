export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { key } = body;

  if (!key || !Array.isArray(key)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid key provided",
    });
  }

  try {
    // @ts-ignore
    const kv = await Deno.openKv();
    await kv.delete(key);

    return { success: true, message: "Entry deleted successfully" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to delete entry: ${error.message}`,
    });
  }
});
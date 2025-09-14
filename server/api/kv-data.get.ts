export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const rawData = [];

  // Get all entries without any prefix filter to show everything
  for await (const entry of kv.list({ prefix: [] })) {
    rawData.push({
      key: entry.key,
      value: entry.value,
      versionstamp: entry.versionstamp,
    });
  }

  return { data: rawData };
});

export default defineEventHandler(async (event) => {
  // @ts-ignore
  const kv = await Deno.openKv();
  const rawData = [];
  for await (const entry of kv.list({ prefix: ["todos"] })) {
    rawData.push({
      key: entry.key,
      value: entry.value,
    });
  }
  return rawData;
});

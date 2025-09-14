export default defineEventHandler(async (event) => {
  // @ts-ignore
  const testEnvVar = Deno.env.get("TEST_ENV_VAR");

  return {
    TEST_ENV_VAR: testEnvVar || null,
    isSet: !!testEnvVar,
    timestamp: new Date().toISOString(),
  };
});
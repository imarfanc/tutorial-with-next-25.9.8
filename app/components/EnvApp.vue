<template>
  <div id="env-app-container" class="mx-auto p-6 max-w-4xl container">
    <h1 id="env-app-title" class="mb-8 font-bold text-primary text-4xl text-center">Environment Variable Reader</h1>

    <div id="env-info-card" class="bg-base-100 border border-base-300 shadow-lg rounded-xl card mb-8">
      <div class="p-8 card-body">
        <h2 class="card-title text-accent mb-6 text-2xl">TEST_ENV_VAR Status</h2>

        <div v-if="loading" id="env-loading" class="text-center">
          <span class="loading loading-spinner loading-lg text-primary"></span>
          <p class="mt-2">Checking environment variable...</p>
        </div>

        <div v-else-if="error" id="env-error" class="alert alert-error">
          <span>{{ error }}</span>
        </div>

        <div v-else id="env-result" class="space-y-6">
          <div
            class="flex items-center justify-between p-4 rounded-lg"
            :class="envData.isSet ? 'bg-success/10 border border-success/20' : 'bg-warning/10 border border-warning/20'"
          >
            <div class="flex items-center gap-3">
              <div class="text-2xl">{{ envData.isSet ? "✅" : "⚠️" }}</div>
              <div>
                <div class="font-semibold text-lg">
                  {{ envData.isSet ? "Variable is SET" : "Variable is NOT SET" }}
                </div>
                <div class="text-sm opacity-70">TEST_ENV_VAR</div>
              </div>
            </div>
            <button @click="refreshEnv" class="btn btn-outline btn-sm">🔄 Refresh</button>
          </div>

          <div v-if="envData.isSet" class="bg-base-200 border border-base-300 p-6 rounded-lg">
            <h3 class="font-semibold text-secondary mb-3">Variable Value:</h3>
            <div class="bg-base-100 border border-base-300 p-4 rounded font-mono text-sm break-all">
              {{ envData.TEST_ENV_VAR }}
            </div>
          </div>

          <div v-else class="bg-base-200 border border-base-300 p-6 rounded-lg">
            <h3 class="font-semibold text-warning mb-3">How to set the variable:</h3>
            <div class="space-y-2 text-sm">
              <p class="text-base-content/80">Set the environment variable before starting the application:</p>
              <div class="bg-base-100 border border-base-300 p-3 rounded font-mono">
                <div class="text-accent">export TEST_ENV_VAR="your_value_here"</div>
                <div class="text-secondary">npm run dev</div>
              </div>
              <p class="text-base-content/60 text-xs mt-2">Or add it to your .env file in the project root</p>
            </div>
          </div>

          <div class="text-xs text-base-content/60 border-t border-base-300 pt-4">
            <div class="flex items-center gap-2">
              <span class="text-info">🕒</span>
              Last checked: {{ formatDate(envData.timestamp) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Environment Info -->
    <div id="env-help-card" class="bg-base-100 border border-base-300 shadow-lg rounded-xl card">
      <div class="p-6 card-body">
        <h3 class="card-title text-accent mb-4">About Environment Variables</h3>
        <div class="prose prose-sm max-w-none">
          <p class="text-base-content/80">
            Environment variables are key-value pairs that provide configuration data to applications. They're commonly
            used for:
          </p>
          <ul class="text-base-content/70 space-y-1 ml-4">
            <li>• API keys and secrets</li>
            <li>• Database connection strings</li>
            <li>• Feature flags and configuration</li>
            <li>• Application environment settings</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables and state
const envData = ref({});
const loading = ref(true);
const error = ref(null);

const fetchEnvData = async () => {
  try {
    loading.value = true;
    error.value = null;
    const data = await $fetch("/api/env");
    envData.value = data;
  } catch (err) {
    error.value = "Failed to fetch environment data: " + err.message;
  } finally {
    loading.value = false;
  }
};

const refreshEnv = async () => {
  await fetchEnvData();
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

// Fetch on mount
await fetchEnvData();
</script>

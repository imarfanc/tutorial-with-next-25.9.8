<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-4xl font-bold text-primary">Environment Reader</h1>
        <p class="text-base-content/70 mt-2">Check and monitor environment variables</p>
      </div>

      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Environment</div>
          <div class="stat-value text-primary">{{ envData.isSet ? 'SET' : 'UNSET' }}</div>
          <div class="stat-desc">TEST_ENV_VAR</div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl mb-8">
      <div class="p-8 card-body">
        <h2 class="card-title text-accent mb-6 text-2xl">TEST_ENV_VAR Status</h2>

        <div v-if="loading" class="hero min-h-48">
          <div class="hero-content text-center">
            <div>
              <span class="loading loading-spinner loading-lg text-primary mb-4"></span>
              <h3 class="text-xl font-bold">Checking Environment</h3>
              <p class="text-base-content/70">Reading TEST_ENV_VAR...</p>
            </div>
          </div>
        </div>

        <div v-else-if="error" class="alert alert-error shadow-lg">
          <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ error }}</span>
        </div>

        <div v-else class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="indicator">
                <span v-if="envData.isSet" class="indicator-item badge badge-success">SET</span>
                <span v-else class="indicator-item badge badge-warning">UNSET</span>
                <div class="avatar placeholder">
                  <div class="bg-neutral text-neutral-content rounded-full w-12">
                    <span class="text-xl">{{ envData.isSet ? "✅" : "⚠️" }}</span>
                  </div>
                </div>
              </div>
              <div>
                <div class="font-semibold text-lg">
                  {{ envData.isSet ? "Variable is configured" : "Variable is missing" }}
                </div>
                <div class="text-sm text-base-content/70">TEST_ENV_VAR</div>
              </div>
            </div>
            <button @click="refreshEnv" class="btn btn-outline btn-sm gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
          </div>

          <div v-if="envData.isSet" class="card bg-success/10 border border-success/20">
            <div class="card-body">
              <h3 class="card-title text-success">✅ Variable Value</h3>
              <div class="mockup-code">
                <pre data-prefix="$"><code>echo $TEST_ENV_VAR</code></pre>
                <pre data-prefix=">" class="text-success"><code>{{ envData.TEST_ENV_VAR }}</code></pre>
              </div>
            </div>
          </div>

          <div v-else class="card bg-warning/10 border border-warning/20">
            <div class="card-body">
              <h3 class="card-title text-warning">⚠️ Variable Not Set</h3>
              <p class="text-base-content/80 mb-4">Set the environment variable to get started:</p>

              <div class="tabs tabs-boxed mb-4">
                <a class="tab tab-active">Shell</a>
                <a class="tab">.env File</a>
              </div>

              <div class="mockup-code">
                <pre data-prefix="$"><code>export TEST_ENV_VAR="your_value_here"</code></pre>
                <pre data-prefix="$"><code>npm run dev</code></pre>
              </div>

              <div class="alert alert-info mt-4">
                <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Alternatively, create a .env file in your project root</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center gap-2 text-sm text-base-content/60 pt-4 border-t border-base-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Last checked: {{ formatDate(envData.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Environment Info -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title text-accent mb-4">💡 About Environment Variables</h3>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-base-content mb-3">Common Use Cases</h4>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <span class="badge badge-primary badge-sm">🔐</span>
                <span class="text-sm">API keys and secrets</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="badge badge-secondary badge-sm">🗄️</span>
                <span class="text-sm">Database connections</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="badge badge-accent badge-sm">🚩</span>
                <span class="text-sm">Feature flags</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="badge badge-info badge-sm">⚙️</span>
                <span class="text-sm">App configuration</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-base-content mb-3">Best Practices</h4>
            <div class="space-y-2 text-sm">
              <div class="alert alert-info py-2">
                <span class="text-xs">Never commit secrets to version control</span>
              </div>
              <div class="alert alert-warning py-2">
                <span class="text-xs">Use different values per environment</span>
              </div>
              <div class="alert alert-success py-2">
                <span class="text-xs">Document required variables</span>
              </div>
            </div>
          </div>
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

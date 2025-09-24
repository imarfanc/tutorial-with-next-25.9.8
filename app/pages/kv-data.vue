<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-4xl font-bold text-primary">Database Explorer</h1>
        <p class="text-base-content/70 mt-2">Browse and inspect Deno KV database entries</p>
      </div>

      <div v-if="!loading && !error" class="stats shadow">
        <div class="stat">
          <div class="stat-title">Total Entries</div>
          <div class="stat-value text-primary">{{ rawData.length }}</div>
          <div class="stat-desc">{{ getStats() }}</div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="hero min-h-96">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <span class="loading loading-spinner loading-lg text-primary mb-4"></span>
          <h3 class="text-xl font-bold">Loading Database</h3>
          <p class="text-base-content/70">Fetching KV store entries...</p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-error shadow-lg">
      <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>{{ error }}</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="rawData.length === 0" class="hero min-h-96">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="text-6xl mb-4">🗄️</div>
          <h3 class="text-2xl font-bold mb-4">Database is Empty</h3>
          <p class="text-base-content/70 mb-6">No entries found in the KV database yet.</p>
          <div class="alert alert-info">
            <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Create some todos or notes to see data appear here!</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Database Entries -->
    <div v-else class="grid gap-6 lg:grid-cols-2">
      <div
        v-for="(entry, index) in rawData"
        :key="index"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-300"
      >
        <div class="card-body">
          <div class="flex justify-between items-start mb-4">
            <h2 class="card-title text-primary">{{ getEntryType(entry.key) }}</h2>
            <div class="flex items-center gap-2">
              <div class="badge badge-outline">{{ entry.key.join(" → ") }}</div>
              <button
                class="btn btn-error btn-xs"
                @click="deleteEntry(entry.key, index)"
                :disabled="deleting[index]"
              >
                <span v-if="deleting[index]" class="loading loading-spinner loading-xs"></span>
                <span v-else>🗑️</span>
              </button>
            </div>
          </div>

          <div role="tablist" class="tabs tabs-boxed mb-4">
            <input
              type="radio"
              :name="`tab-${index}`"
              role="tab"
              class="tab"
              aria-label="Value"
              :checked="selectedTab !== `meta-${index}`"
              @change="selectedTab = `value-${index}`"
            />
            <div role="tabpanel" class="tab-content bg-base-200 border border-base-300 rounded-box p-4 mt-4">
              <div class="mockup-code">
                <pre><code>{{ JSON.stringify(entry.value, null, 2) }}</code></pre>
              </div>
            </div>

            <input
              type="radio"
              :name="`tab-${index}`"
              role="tab"
              class="tab"
              aria-label="Metadata"
              :checked="selectedTab === `meta-${index}`"
              @change="selectedTab = `meta-${index}`"
            />
            <div role="tabpanel" class="tab-content bg-base-200 border border-base-300 rounded-box p-4 mt-4">
              <div class="overflow-x-auto">
                <table class="table table-sm">
                  <tbody>
                    <tr>
                      <th>Key</th>
                      <td><code class="text-xs">{{ JSON.stringify(entry.key) }}</code></td>
                    </tr>
                    <tr>
                      <th>Versionstamp</th>
                      <td><code class="text-xs">{{ entry.versionstamp }}</code></td>
                    </tr>
                    <tr v-if="entry.value?.createdAt">
                      <th>Created</th>
                      <td>{{ formatDate(entry.value.createdAt) }}</td>
                    </tr>
                    <tr v-if="entry.value?.updatedAt && entry.value.updatedAt !== entry.value.createdAt">
                      <th>Updated</th>
                      <td>{{ formatDate(entry.value.updatedAt) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const rawData = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedTab = ref(null);
const deleting = ref({});

const fetchRawData = async () => {
  try {
    const { data } = await $fetch("/api/kv-data");
    rawData.value = data || [];
  } catch (err) {
    error.value = "Failed to fetch raw KV data: " + err.message;
  } finally {
    loading.value = false;
  }
};

const getEntryType = (key) => {
  if (key[0] === "todos") return "📝 Todo";
  if (key[0] === "notes") return "📓 Note";
  return `🔑 ${key[0] || "Unknown"}`;
};

const getStats = () => {
  if (rawData.value.length === 0) return "";
  const todoCount = rawData.value.filter(entry => entry.key[0] === "todos").length;
  const noteCount = rawData.value.filter(entry => entry.key[0] === "notes").length;
  const otherCount = rawData.value.length - todoCount - noteCount;

  const parts = [];
  if (todoCount > 0) parts.push(`${todoCount} todos`);
  if (noteCount > 0) parts.push(`${noteCount} notes`);
  if (otherCount > 0) parts.push(`${otherCount} other`);

  return parts.join(", ");
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

const deleteEntry = async (key, index) => {
  if (!confirm(`Are you sure you want to delete this entry?\nKey: ${key.join(" → ")}`)) {
    return;
  }

  deleting.value[index] = true;

  try {
    await $fetch("/api/kv-data", {
      method: "DELETE",
      body: { key },
    });

    rawData.value.splice(index, 1);
  } catch (err) {
    alert("Failed to delete entry: " + err.message);
  } finally {
    deleting.value[index] = false;
  }
};

await fetchRawData();
</script>

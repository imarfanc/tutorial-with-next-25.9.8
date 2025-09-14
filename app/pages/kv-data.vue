<template>
  <div id="kv-data-container" class="mx-auto p-6 max-w-4xl">
    <h1 id="kv-data-title" class="mb-8 font-bold text-primary text-4xl text-center">
      Deno KV Database Explorer
    </h1>

    <div v-if="loading" id="loading-section" class="text-center">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-2">Loading raw KV data...</p>
    </div>

    <div v-else-if="error" id="error-section" class="alert alert-error">
      <span>{{ error }}</span>
    </div>

    <div
      v-else-if="rawData.length === 0"
      id="empty-state"
      class="text-center mt-12">
      <div class="bg-base-100 border border-base-300 rounded-xl p-8 max-w-md mx-auto">
        <div class="text-4xl mb-4">🗄️</div>
        <p class="text-base-content/60 text-lg">No data in KV database yet</p>
        <p class="text-base-content/40 text-sm mt-2">Create some todos or notes to see data appear here</p>
      </div>
    </div>

    <div v-else id="kv-data-list" class="space-y-6">
      <div
        v-for="(entry, index) in rawData"
        :key="index"
        :id="`kv-entry-${index}`"
        class="bg-base-100 border border-base-300 hover:border-accent shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 card">
        <div class="p-6 card-body">
          <div class="flex justify-between items-start mb-4">
            <h2 class="font-semibold text-xl text-primary">{{ getEntryType(entry.key) }}</h2>
            <div class="badge badge-outline badge-sm">{{ entry.key.join(' → ') }}</div>
          </div>

          <div class="tabs tabs-bordered mb-4">
            <input type="radio" :name="`tab-${index}`" role="tab" class="tab text-secondary" aria-label="Value" checked />
            <div role="tabpanel" class="tab-content">
              <div class="bg-base-200 border border-base-300 p-4 rounded-lg overflow-auto">
                <pre class="text-sm">{{ JSON.stringify(entry.value, null, 2) }}</pre>
              </div>
            </div>

            <input type="radio" :name="`tab-${index}`" role="tab" class="tab text-info" aria-label="Metadata" />
            <div role="tabpanel" class="tab-content">
              <div class="bg-base-200 border border-base-300 p-4 rounded-lg">
                <div class="text-sm space-y-2">
                  <div><span class="font-semibold text-accent">Key:</span> {{ JSON.stringify(entry.key) }}</div>
                  <div><span class="font-semibold text-accent">Versionstamp:</span> {{ entry.versionstamp }}</div>
                  <div v-if="entry.value?.createdAt"><span class="font-semibold text-accent">Created:</span> {{ formatDate(entry.value.createdAt) }}</div>
                  <div v-if="entry.value?.updatedAt && entry.value.updatedAt !== entry.value.createdAt">
                    <span class="font-semibold text-accent">Updated:</span> {{ formatDate(entry.value.updatedAt) }}
                  </div>
                </div>
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
  return `🔑 ${key[0] || 'Unknown'}`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

await fetchRawData();
</script>

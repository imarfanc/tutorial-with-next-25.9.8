<template>
  <div class="mx-auto p-6 max-w-4xl">
    <h1 class="mb-8 font-bold text-primary text-4xl text-center">
      Raw Deno KV Data
    </h1>

    <div v-if="loading" class="text-center">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-2">Loading raw KV data...</p>
    </div>

    <div v-else-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>

    <div
      v-else-if="rawData.length === 0"
      class="text-base-content/60 text-center">
      <p class="mt-8">No todos data in KV yet.</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="(entry, index) in rawData"
        :key="index"
        class="bg-base-100 shadow-xl rounded-xl card">
        <div class="p-4 card-body">
          <h2 class="mb-2 font-semibold text-xl">Entry {{ index + 1 }}</h2>
          <pre class="bg-base-200 p-4 rounded-lg overflow-auto text-sm">{{
            JSON.stringify(entry, null, 2)
          }}</pre>
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

await fetchRawData();
</script>

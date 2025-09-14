<template>
  <div id="home-container" class="mx-auto p-8 max-w-2xl">
    <h1 id="home-title" class="mb-8 font-bold text-primary text-5xl text-center">
      Welcome
    </h1>

    <div id="navigation-section" class="space-y-4">
      <div id="navigation-card" class="bg-base-100 shadow-xl rounded-xl card">
        <div id="navigation-body" class="p-6 card-body">
          <h2 id="pages-title" class="mb-4 font-semibold text-2xl">Pages</h2>
          <div id="navigation-links" class="space-y-3">
            <NuxtLink
              to="/todo"
              class="btn btn-primary btn-lg w-full"
            >
              📝 Todo App
            </NuxtLink>
            <NuxtLink
              to="/notes"
              class="btn btn-accent btn-lg w-full"
            >
              📓 Notes App
            </NuxtLink>
            <NuxtLink
              to="/kv-data"
              class="btn btn-secondary btn-lg w-full"
            >
              🗄️ KV Data
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
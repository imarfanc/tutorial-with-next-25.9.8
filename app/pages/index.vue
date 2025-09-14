<template>
  <div id="home-container" class="mx-auto p-8 max-w-2xl">
    <h1 id="home-title" class="mb-8 font-bold text-primary text-5xl text-center">
      Welcome
    </h1>

    <div id="navigation-section" class="space-y-6">
      <div id="navigation-card" class="bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl card">
        <div id="navigation-body" class="p-8 card-body">
          <h2 id="pages-title" class="mb-6 font-bold text-accent text-3xl text-center">Explore Apps</h2>
          <div id="navigation-links" class="space-y-4">
            <NuxtLink
              to="/todo"
              class="btn btn-primary btn-lg w-full hover:scale-[1.02] transition-transform"
            >
              📝 Todo App
            </NuxtLink>
            <NuxtLink
              to="/notes"
              class="btn btn-accent btn-lg w-full hover:scale-[1.02] transition-transform"
            >
              📓 Notes App
            </NuxtLink>
            <NuxtLink
              to="/env"
              class="btn btn-info btn-lg w-full hover:scale-[1.02] transition-transform"
            >
              🔧 Env Reader
            </NuxtLink>
            <NuxtLink
              to="/kv-data"
              class="btn btn-secondary btn-lg w-full hover:scale-[1.02] transition-transform"
            >
              🗄️ Database Explorer
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
          <div class="text-primary text-2xl mb-2">📝</div>
          <h3 class="font-semibold text-primary">Todos</h3>
          <p class="text-sm text-base-content/70">Manage your tasks</p>
        </div>
        <div class="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
          <div class="text-accent text-2xl mb-2">📓</div>
          <h3 class="font-semibold text-accent">Notes</h3>
          <p class="text-sm text-base-content/70">Store your thoughts</p>
        </div>
        <div class="bg-info/10 border border-info/20 rounded-lg p-4 text-center">
          <div class="text-info text-2xl mb-2">🔧</div>
          <h3 class="font-semibold text-info">Environment</h3>
          <p class="text-sm text-base-content/70">Check env variables</p>
        </div>
        <div class="bg-secondary/10 border border-secondary/20 rounded-lg p-4 text-center">
          <div class="text-secondary text-2xl mb-2">🗄️</div>
          <h3 class="font-semibold text-secondary">Database</h3>
          <p class="text-sm text-base-content/70">View raw KV data</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
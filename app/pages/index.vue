<template>
  <div class="hero min-h-96 bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20">
    <div class="hero-content text-center">
      <div class="max-w-2xl">
        <h1 class="text-5xl font-bold text-primary mb-8">Welcome</h1>
        <p class="text-xl text-base-content/80 mb-8">
          Explore our Nuxt.js tutorial applications built with DaisyUI v5 and TypeScript
        </p>

        <!-- Quick Access Buttons -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <NuxtLink to="/todo" class="btn btn-primary btn-lg hover:scale-105 transition-transform">
            📝 Todo
          </NuxtLink>
          <NuxtLink to="/notes" class="btn btn-accent btn-lg hover:scale-105 transition-transform">
            📓 Notes
          </NuxtLink>
          <NuxtLink to="/env" class="btn btn-info btn-lg hover:scale-105 transition-transform">
            🔧 Env
          </NuxtLink>
          <NuxtLink to="/kv-data" class="btn btn-secondary btn-lg hover:scale-105 transition-transform">
            🗄️ Database
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12 text-base-content">Featured Applications</h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div class="card-body items-center text-center">
            <div class="text-4xl mb-4">📝</div>
            <h3 class="card-title text-primary">Todo Manager</h3>
            <p class="text-base-content/70">Full CRUD todo application with edit-in-place functionality</p>
            <div class="card-actions justify-end">
              <NuxtLink to="/todo" class="btn btn-primary btn-sm">Try It</NuxtLink>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div class="card-body items-center text-center">
            <div class="text-4xl mb-4">📓</div>
            <h3 class="card-title text-accent">Notes App</h3>
            <p class="text-base-content/70">Rich note-taking with view/edit modes and timestamps</p>
            <div class="card-actions justify-end">
              <NuxtLink to="/notes" class="btn btn-accent btn-sm">Explore</NuxtLink>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div class="card-body items-center text-center">
            <div class="text-4xl mb-4">🔧</div>
            <h3 class="card-title text-info">Environment Reader</h3>
            <p class="text-base-content/70">Inspect environment variables and configuration</p>
            <div class="card-actions justify-end">
              <NuxtLink to="/env" class="btn btn-info btn-sm">Check</NuxtLink>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div class="card-body items-center text-center">
            <div class="text-4xl mb-4">🗄️</div>
            <h3 class="card-title text-secondary">Database Explorer</h3>
            <p class="text-base-content/70">Browse and inspect Deno KV database entries</p>
            <div class="card-actions justify-end">
              <NuxtLink to="/kv-data" class="btn btn-secondary btn-sm">Browse</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Technology Stack -->
  <div class="bg-base-200 py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8 text-base-content">Built With</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-3">
            <span class="text-2xl">🟢</span>
          </div>
          <h3 class="font-semibold">Nuxt.js</h3>
          <p class="text-sm text-base-content/70">Vue Framework</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-3">
            <span class="text-2xl">🎨</span>
          </div>
          <h3 class="font-semibold">DaisyUI v5</h3>
          <p class="text-sm text-base-content/70">UI Components</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 bg-info/20 rounded-full flex items-center justify-center mb-3">
            <span class="text-2xl">📘</span>
          </div>
          <h3 class="font-semibold">TypeScript</h3>
          <p class="text-sm text-base-content/70">Type Safety</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-3">
            <span class="text-2xl">🦕</span>
          </div>
          <h3 class="font-semibold">Deno KV</h3>
          <p class="text-sm text-base-content/70">Database</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

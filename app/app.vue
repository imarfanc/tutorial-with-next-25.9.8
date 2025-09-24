<template>
  <div data-theme="light" class="min-h-screen bg-base-200">
    <NuxtRouteAnnouncer />

    <!-- Navigation Bar -->
    <div class="navbar bg-base-100 shadow-lg">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path>
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><NuxtLink to="/">🏠 Home</NuxtLink></li>
            <li><NuxtLink to="/todo">📝 Todo App</NuxtLink></li>
            <li><NuxtLink to="/notes">📓 Notes App</NuxtLink></li>
            <li><NuxtLink to="/env">🔧 Env Reader</NuxtLink></li>
            <li><NuxtLink to="/kv-data">🗄️ Database Explorer</NuxtLink></li>
            <li><NuxtLink to="/components-test">🧪 Components</NuxtLink></li>
          </ul>
        </div>
        <NuxtLink to="/" class="btn btn-ghost text-xl">🚀 Nuxt DaisyUI</NuxtLink>
      </div>

      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/" class="btn btn-ghost">🏠 Home</NuxtLink></li>
          <li><NuxtLink to="/todo" class="btn btn-ghost">📝 Todo</NuxtLink></li>
          <li><NuxtLink to="/notes" class="btn btn-ghost">📓 Notes</NuxtLink></li>
          <li><NuxtLink to="/env" class="btn btn-ghost">🔧 Env</NuxtLink></li>
          <li><NuxtLink to="/kv-data" class="btn btn-ghost">🗄️ Database</NuxtLink></li>
          <li><NuxtLink to="/components-test" class="btn btn-ghost">🧪 Components</NuxtLink></li>
        </ul>
      </div>

      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32">
            <li><a onclick="document.documentElement.setAttribute('data-theme', 'light')">☀️ Light</a></li>
            <li><a onclick="document.documentElement.setAttribute('data-theme', 'dark')">🌙 Dark</a></li>
            <li><a onclick="document.documentElement.setAttribute('data-theme', 'cupcake')">🧁 Cupcake</a></li>
            <li><a onclick="document.documentElement.setAttribute('data-theme', 'synthwave')">🌸 Synthwave</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav class="grid grid-flow-col gap-4">
        <NuxtLink to="/todo" class="link link-hover">Todo App</NuxtLink>
        <NuxtLink to="/notes" class="link link-hover">Notes App</NuxtLink>
        <NuxtLink to="/env" class="link link-hover">Environment</NuxtLink>
        <NuxtLink to="/kv-data" class="link link-hover">Database</NuxtLink>
        <NuxtLink to="/components-test" class="link link-hover">Components</NuxtLink>
      </nav>
      <aside>
        <p>Built with ❤️ using Nuxt.js and DaisyUI v5</p>
      </aside>
    </footer>
  </div>
</template>

<script setup>
import { appConfig } from '../config/app.config'

// Set default theme on mount
onMounted(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme') || 'light'
    document.documentElement.setAttribute('data-theme', savedTheme)

    // Hello message and version from config
    console.log(`🚀 Welcome to ${appConfig.name}!`)
    console.log(`📦 Version: ${appConfig.version}`)
    console.log(`🎨 Built with ${appConfig.tech.framework}, ${appConfig.tech.ui}, and ${appConfig.tech.database}`)
    console.log(`🌐 Repository: ${appConfig.repository}`)
    console.log(`🚀 Deployed on: ${appConfig.deployment.platform}`)
  }
})
</script>

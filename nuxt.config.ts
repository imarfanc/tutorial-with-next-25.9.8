import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/app.css"],
  nitro: {
    preset: "deno",
    types: {
      deno: true,
    },
  },
  devtools: { enabled: true },
});

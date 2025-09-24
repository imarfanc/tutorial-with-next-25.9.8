export const appConfig = {
  name: "Nuxt DaisyUI Tutorial App",
  version: "1.0.2",
  description: "A comprehensive tutorial application showcasing Nuxt.js, DaisyUI v5, and Deno KV",
  author: "Claude Code",
  repository: "https://github.com/imarfanc/tutorial-with-next-25.9.8",
  features: {
    todoManager: true,
    notesApp: true,
    environmentReader: true,
    databaseExplorer: true,
    componentTester: true,
  },
  tech: {
    framework: "Nuxt.js",
    ui: "DaisyUI v5",
    database: "Deno KV",
    language: "TypeScript",
    styling: "Tailwind CSS v4",
  },
  deployment: {
    platform: "Deno Deploy",
    preset: "deno-deploy",
  },
};

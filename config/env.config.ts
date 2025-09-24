export const envConfig = {
  // Database configuration
  kv: {
    notesFile: "notes-25914.json",
    todosFile: "todos-25914.json",
    dataPrefix: "files"
  },

  // API configuration
  api: {
    baseUrl: "/api",
    timeout: 5000,
    retries: 3
  },

  // Development settings
  dev: {
    port: 3000,
    host: "localhost",
    debugMode: true
  },

  // Production settings
  production: {
    enableAnalytics: false,
    enableLogging: true,
    compressionLevel: 6
  },

  // Feature flags
  features: {
    experimental: false,
    beta: false,
    maintenance: false
  }
};
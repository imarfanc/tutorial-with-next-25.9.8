export const featuresConfig = {
  // Core features
  core: {
    todoManager: {
      enabled: true,
      maxTodos: 100,
      allowDuplicates: false,
      autoSave: true
    },
    notesApp: {
      enabled: true,
      maxNotes: 500,
      maxNoteLength: 10000,
      allowMarkdown: true
    },
    environmentReader: {
      enabled: true,
      showSensitive: false,
      allowExport: false
    },
    databaseExplorer: {
      enabled: true,
      allowDelete: true,
      maxEntries: 1000,
      pagination: true
    },
    componentTester: {
      enabled: true,
      showCode: true,
      allowCustomization: true
    }
  },

  // UI features
  ui: {
    darkMode: true,
    themeSelector: true,
    animations: true,
    responsiveDesign: true,
    accessibility: true
  },

  // Performance features
  performance: {
    lazyLoading: true,
    caching: true,
    compression: true,
    preloading: false
  }
};
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    chromeWebSecurity: false, // Adicione esta linha
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});



const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
  //video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

import { defineConfig } from "cypress";
import { lighthouse, prepareAudit } from "@cypress-audit/lighthouse";
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

export default defineConfig({

  /*
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportDir: 'cypress/reports',
    reportPageTitle: 'My Mocha Report custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  */


  /*
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochafile: 'cypress/reports/junitreport-[hash].xml',
    toConsole: true
  },
  */

  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',

    mochawesomeReporterOptions: {
        charts: true,
        reportDir: 'cypress/reports',
        reportPageTitle: 'My Mocha Report custom-title',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
    },

    mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/reports/junitreport-[hash].xml',
        toConsole: true
    }
  },


  video: false,

  e2e: {

    specPattern: ["cypress/e2e/*.cy.ts", "cypress/e2e/features/*.feature"],
    pageLoadTimeout: 150000,
    taskTimeout: 80000,
    defaultCommandTimeout: 30000,

    env: {
      allureReuseAfterSpec: true,
    },

    setupNodeEvents(on, config) {
      preprocessor.addCucumberPreprocessorPlugin(on, config);

      require('cypress-mochawesome-reporter/plugin')(on);

      // implement node event listeners here
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
      });

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
      allureWriter(on, config);

      return config;
    },
  },
});

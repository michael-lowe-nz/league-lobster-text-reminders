const { awscdk } = require("projen");
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "league-lobster-text-reminders",
  gitignore: ["src/contacts.yml"],
  eslint: true,
  prettier: true,
  // prettierOptions: { settings: { singleQuote: true, trailingComma: 'es5' } },
  deps: [
    "@types/js-yaml@4.0.5",
    "js-yaml",
    "@aws-sdk/client-sns",
  ] /* Runtime dependencies of this module. */,
  description: "Send Text Reminders based on a lambda scrape and approval",
  devDeps: [] /* Build dependencies for this module. */,
  packageName:
    "league-lobster-text-reminders" /* The "name" in package.json. */,
  lambdaOptions: {
    externals: ["@aws-cdk/client-sns"],
  },
});

project.synth();

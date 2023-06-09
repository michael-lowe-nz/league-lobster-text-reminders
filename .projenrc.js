const { awscdk } = require("projen");
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "league-lobster-text-reminders",
  gitignore: ["src/contacts.yml"],
  eslint: true,
  prettier: true,
  deps: [
    "@types/js-yaml@4.0.5",
    "js-yaml",
    "@aws-sdk/client-sns",
    "cdk-pipelines-github",
    "cheerio@latest",
    "@types/cheerio",
    "@types/axios",
    "@types/aws-lambda",
    "axios",
    "moment",
  ] /* Runtime dependencies of this module. */,
  description: "Send Text Reminders based on a lambda scrape and approval",
  devDeps: [] /* Build dependencies for this module. */,
  packageName:
    "league-lobster-text-reminders" /* The "name" in package.json. */,
  lambdaOptions: {
    externals: ["@aws-cdk/client-sns"],
  },
  githubOptions: {
    pullRequestLint: false,
  },
  pullRequestTemplateContents: [
    `## Description`,
    `<!--- Describe your changes in detail -->`,
    `## Checklist:`,
    `- [ ] The project can be synthesised without error \`npm run snyth\``,
    `- [ ] My change requires a change to the documentation.`,
    `- [ ] I have updated the documentation accordingly.`,
  ],
});

project.synth();

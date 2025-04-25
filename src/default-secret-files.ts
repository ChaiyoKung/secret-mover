export const defaultSecretFiles: string[] = [
  //
  // node.js
  //
  ".env",
  ".env.local",
  ".env.development",
  ".env.development.local",
  ".env.test",
  ".env.test.local",
  ".env.production",
  ".env.production.local",

  //
  // terraform
  //
  "*.tfvars",
  "*.tfvars.json",
  "*.tfstate",
  "*.tfstate.*",

  //
  // azure functions
  //
  "local.settings.json",
];

import { copySecretFile } from "./copy-secret-file";

const sourceDirectory = "./test-data"; // Adjust as needed
const targetDirectory = "./test-result"; // Adjust as needed
const dryRun = true; // Set to `false` to perform actual copying

await copySecretFile(sourceDirectory, targetDirectory, { dryRun });

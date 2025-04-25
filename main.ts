import { Glob } from "bun";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const defaultSecretFiles: string[] = [
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

  // azure functions
  "local.settings.json",
];

async function main(sourceDir: string, targetDir: string, secretFiles: string[] = defaultSecretFiles) {
  const sourceFileOrDirs = await readdir(sourceDir, { withFileTypes: true, recursive: true });
  const sourceFiles = sourceFileOrDirs.filter((fileOrDir) => fileOrDir.isFile());
  const sourceSecretFiles = sourceFiles.filter((file) => {
    const glob = new Glob("{" + secretFiles.join(",") + "}");
    return glob.match(file.name);
  });
  for (const sourceSecretFile of sourceSecretFiles) {
    const sourceSecretFilePath = join(sourceSecretFile.parentPath, sourceSecretFile.name);
    const targetFilePath = join(targetDir, sourceSecretFile.parentPath, sourceSecretFile.name);
    const file = Bun.file(sourceSecretFilePath);
    await Bun.write(targetFilePath, file);
    console.log(`Copied secret file: '${sourceSecretFilePath}' to '${targetFilePath}'`);
  }
}

const sourceDirectory = "./test-data"; // Adjust as needed
const targetDirectory = "./test-result"; // Adjust as needed

await main(sourceDirectory, targetDirectory);

import { Glob } from "bun";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { defaultSecretFiles } from "./default-secret-files";
import { normalizePathStart } from "./normalize-path-start";

export interface CopySecretFileOptions {
  secretFiles?: string[];
  dryRun?: boolean;
}

export async function copySecretFile(sourceDir: string, targetDir: string, options?: CopySecretFileOptions) {
  const secretFiles = options?.secretFiles ?? defaultSecretFiles;
  const sourceFileOrDirs = await readdir(sourceDir, { withFileTypes: true, recursive: true });
  const sourceFiles = sourceFileOrDirs.filter((fileOrDir) => fileOrDir.isFile());
  const sourceSecretFiles = sourceFiles.filter((file) => {
    const glob = new Glob("{" + secretFiles.join(",") + "}");
    return glob.match(file.name);
  });
  for (const sourceSecretFile of sourceSecretFiles) {
    const sourceSecretFilePath = join(sourceSecretFile.parentPath, sourceSecretFile.name);
    const normalizedSourceSecretFilePath = normalizePathStart(sourceDir, sourceSecretFile.parentPath);
    const targetFilePath = join(targetDir, normalizedSourceSecretFilePath, sourceSecretFile.name);

    if (options?.dryRun) {
      console.log(`[Dry Run] Copied secret file: '${sourceSecretFilePath}' to '${targetFilePath}'`);
      continue;
    }

    const file = Bun.file(sourceSecretFilePath);
    await Bun.write(targetFilePath, file);
    console.log(`Copied secret file: '${sourceSecretFilePath}' to '${targetFilePath}'`);
  }
}

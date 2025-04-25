# Secret Mover

A simple tool to copy secret files (like .env, terraform.tfvars, and more) to a specific directory. Perfect for safely transferring configuration files to a new device or backup location.

## Getting Started

> This project was created using `bun init` in bun v1.2.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
bun run dev
```

## Example Usage

Edit the source and target directories as needed in `src/main.ts` file.

```ts
// 1.
const sourceDirectory = "./path/to/source";
const targetDirectory = "./path/to/target";
await copySecretFile(sourceDirectory, targetDirectory);
```

```ts
// 2.
const sourceDirectory = "D:/path/to/source";
const targetDirectory = "D:/path/to/target";
await copySecretFile(sourceDirectory, targetDirectory, { dryRun: false });
```

```ts
// 3.
const sourceDirectory = "D:\\path\\to\\source";
const targetDirectory = "path/to/target";
await copySecretFile(sourceDirectory, targetDirectory, { dryRun: true });
```

import type { CommandReceipt } from "./types.js";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { toMarkdown } from "./markdown.js";

export async function writeReceipt(receipt: CommandReceipt, outDir: string): Promise<void> {
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "cmd-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
  await writeFile(path.join(outDir, "cmd-receipt.md"), toMarkdown(receipt), "utf8");
}

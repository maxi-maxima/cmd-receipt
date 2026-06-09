#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { runCommand } from "./runner.js";
import { writeReceipt } from "./writer.js";
import type { CommandReceipt } from "./types.js";

const program = new Command();

program
  .name("cmd-receipt")
  .description("Wrap verification commands and write shareable execution receipts.")
  .version("0.1.0");

program
  .command("run")
  .description("Run a command and write a receipt. Use -- before the command.")
  .option("--out <dir>", "output directory", "reports/cmd-receipt")
  .option("--tail-bytes <bytes>", "stdout/stderr tail bytes", (value) => Number.parseInt(value, 10), 16_000)
  .allowUnknownOption(true)
  .argument("[command...]", "command and arguments")
  .action(async (command: string[], options: { out: string; tailBytes: number }) => {
    const normalized = command[0] === "--" ? command.slice(1) : command;
    const receipt = await runCommand(normalized, { cwd: process.cwd(), tailBytes: options.tailBytes });
    await writeReceipt(receipt, options.out);
    printSummary(receipt);
    console.log(`Reports: ${options.out}`);
    process.exitCode = receipt.exitCode ?? 1;
  });

program.command("demo").option("--out <dir>", "output directory", "reports/demo").action(async (options: { out: string }) => {
  const receipt = await runCommand([process.execPath, "-e", "console.log('demo ok')"], { cwd: process.cwd() });
  await writeReceipt(receipt, options.out);
  printSummary(receipt);
  console.log(`Reports: ${options.out}`);
});

program.parse();

function printSummary(receipt: CommandReceipt): void {
  const status = receipt.exitCode === 0 ? pc.green("PASS") : pc.red("FAIL");
  console.log(`Cmd Receipt ${status}`);
  console.log(`Command: ${receipt.command.join(" ")}`);
  console.log(`Exit code: ${receipt.exitCode}`);
  console.log(`Duration: ${receipt.durationMs} ms`);
}

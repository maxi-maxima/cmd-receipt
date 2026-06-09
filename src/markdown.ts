import type { CommandReceipt } from "./types.js";

export function toMarkdown(receipt: CommandReceipt): string {
  const lines = [
    "# Command Receipt",
    "",
    "| Command | Exit code | Duration | Started | Finished |",
    "| --- | ---: | ---: | --- | --- |",
    `| \`${escapePipes(receipt.command.join(" "))}\` | ${receipt.exitCode ?? "signal"} | ${receipt.durationMs} ms | ${receipt.startedAt} | ${receipt.finishedAt} |`,
    "",
    "## Context",
    "",
    `- CWD: \`${receipt.cwd}\``
  ];

  if (receipt.git) {
    lines.push(`- Git SHA: \`${receipt.git.sha || "unknown"}\``);
    lines.push(`- Git branch: \`${receipt.git.branch || "unknown"}\``);
    lines.push(`- Git dirty: ${receipt.git.dirty ? "yes" : "no"}`);
  }

  lines.push("");
  lines.push("## Stdout Tail");
  lines.push("");
  lines.push("```text");
  lines.push(receipt.stdoutTail.trimEnd());
  lines.push("```");
  lines.push("");
  lines.push("## Stderr Tail");
  lines.push("");
  lines.push("```text");
  lines.push(receipt.stderrTail.trimEnd());
  lines.push("```");
  lines.push("");

  return lines.join("\n");
}

function escapePipes(value: string): string {
  return value.replaceAll("|", "\\|");
}

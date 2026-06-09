import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { writeReceipt } from "../src/writer.js";

describe("writeReceipt", () => {
  it("writes JSON and Markdown receipt files", async () => {
    const out = await mkdtemp(path.join(os.tmpdir(), "cmd-receipt-"));
    await writeReceipt(
      {
        command: ["node", "-e", "console.log('ok')"],
        cwd: process.cwd(),
        startedAt: "2026-06-09T00:00:00.000Z",
        finishedAt: "2026-06-09T00:00:01.000Z",
        durationMs: 1000,
        exitCode: 0,
        signal: null,
        stdoutTail: "ok",
        stderrTail: ""
      },
      out
    );

    await expect(readFile(path.join(out, "cmd-receipt.json"), "utf8")).resolves.toContain("stdoutTail");
    await expect(readFile(path.join(out, "cmd-receipt.md"), "utf8")).resolves.toContain("Command Receipt");
  });
});

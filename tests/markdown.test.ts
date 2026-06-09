import { describe, expect, it } from "vitest";
import { toMarkdown } from "../src/markdown.js";
import type { CommandReceipt } from "../src/types.js";

describe("toMarkdown", () => {
  it("renders a concise command receipt", () => {
    const markdown = toMarkdown({
      command: ["npm", "test"],
      cwd: "E:/Projects/demo",
      startedAt: "2026-06-09T00:00:00.000Z",
      finishedAt: "2026-06-09T00:00:01.000Z",
      durationMs: 1000,
      exitCode: 0,
      signal: null,
      stdoutTail: "1 passed",
      stderrTail: "",
      git: {
        sha: "abc123",
        branch: "main",
        dirty: false
      }
    } satisfies CommandReceipt);

    expect(markdown).toContain("# Command Receipt");
    expect(markdown).toContain("npm test");
    expect(markdown).toContain("1 passed");
    expect(markdown).toContain("abc123");
  });
});

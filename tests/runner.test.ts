import { describe, expect, it } from "vitest";
import { runCommand } from "../src/runner.js";

describe("runCommand", () => {
  it("captures exit code, stdout, stderr, timing, and cwd", async () => {
    const receipt = await runCommand(
      [process.execPath, "-e", "console.log('ok'); console.error('warn')"],
      { cwd: process.cwd(), tailBytes: 2000 }
    );

    expect(receipt.exitCode).toBe(0);
    expect(receipt.stdoutTail).toContain("ok");
    expect(receipt.stderrTail).toContain("warn");
    expect(receipt.timedOut).toBe(false);
    expect(receipt.durationMs).toBeGreaterThanOrEqual(0);
    expect(receipt.cwd).toBe(process.cwd());
  });

  it("captures failed command exit codes without throwing", async () => {
    const receipt = await runCommand([process.execPath, "-e", "process.exit(7)"], { cwd: process.cwd() });

    expect(receipt.exitCode).toBe(7);
  });

  it("terminates commands that exceed the timeout", async () => {
    const receipt = await runCommand([process.execPath, "-e", "setTimeout(() => console.log('late'), 500)"], {
      cwd: process.cwd(),
      timeoutMs: 50
    });

    expect(receipt.timedOut).toBe(true);
    expect(receipt.timeoutMs).toBe(50);
    expect(receipt.signal).toBe("SIGTERM");
  });
});

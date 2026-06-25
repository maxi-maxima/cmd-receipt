import type { CommandReceipt } from "./types.js";
import { spawn } from "node:child_process";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface RunOptions {
  cwd: string;
  tailBytes?: number;
  timeoutMs?: number;
}

export async function runCommand(command: string[], options: RunOptions): Promise<CommandReceipt> {
  if (command.length === 0) {
    throw new Error("No command provided.");
  }

  const tailBytes = options.tailBytes ?? 16_000;
  const started = new Date();
  const startedMs = Date.now();
  const git = await readGitState(options.cwd);

  const result = await new Promise<Pick<CommandReceipt, "exitCode" | "signal" | "stdoutTail" | "stderrTail" | "timedOut">>(
    (resolve, reject) => {
      const child = spawn(command[0], command.slice(1), {
        cwd: options.cwd,
        shell: false,
        windowsHide: true
      });
      let stdout = "";
      let stderr = "";
      let timedOut = false;
      const timeout = options.timeoutMs
        ? setTimeout(() => {
            timedOut = true;
            child.kill("SIGTERM");
          }, options.timeoutMs)
        : undefined;

      child.stdout?.on("data", (chunk: Buffer) => {
        stdout = keepTail(stdout + chunk.toString("utf8"), tailBytes);
      });
      child.stderr?.on("data", (chunk: Buffer) => {
        stderr = keepTail(stderr + chunk.toString("utf8"), tailBytes);
      });
      child.on("error", reject);
      child.on("close", (exitCode, signal) => {
        if (timeout) clearTimeout(timeout);
        resolve({
          exitCode,
          signal,
          stdoutTail: stdout,
          stderrTail: stderr,
          timedOut
        });
      });
    }
  );

  const finished = new Date();
  return {
    command,
    cwd: options.cwd,
    startedAt: started.toISOString(),
    finishedAt: finished.toISOString(),
    durationMs: Math.max(0, Date.now() - startedMs),
    timeoutMs: options.timeoutMs,
    ...result,
    git
  };
}

function keepTail(value: string, maxBytes: number): string {
  const buffer = Buffer.from(value, "utf8");
  if (buffer.byteLength <= maxBytes) {
    return value;
  }
  return buffer.subarray(buffer.byteLength - maxBytes).toString("utf8");
}

async function readGitState(cwd: string): Promise<CommandReceipt["git"] | undefined> {
  try {
    const [sha, branch, status] = await Promise.all([
      execFileAsync("git", ["rev-parse", "HEAD"], { cwd }).then((result) => result.stdout.trim()),
      execFileAsync("git", ["branch", "--show-current"], { cwd }).then((result) => result.stdout.trim()),
      execFileAsync("git", ["status", "--porcelain"], { cwd }).then((result) => result.stdout.trim())
    ]);
    return {
      sha,
      branch,
      dirty: status.length > 0
    };
  } catch {
    return undefined;
  }
}

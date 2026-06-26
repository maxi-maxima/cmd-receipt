export interface CommandReceipt {
  command: string[];
  cwd: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  timedOut: boolean;
  timeoutMs?: number;
  stdoutTail: string;
  stderrTail: string;
  environment: {
    node: string;
    platform: NodeJS.Platform;
    arch: string;
    shell?: string;
  };
  git?: {
    sha?: string;
    branch?: string;
    dirty?: boolean;
  };
}

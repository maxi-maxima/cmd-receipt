export interface CommandReceipt {
  command: string[];
  cwd: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  stdoutTail: string;
  stderrTail: string;
  git?: {
    sha?: string;
    branch?: string;
    dirty?: boolean;
  };
}

<div align="center">

# Cmd Receipt

**Wrap verification commands and write shareable execution receipts.**

[简体中文](README.zh-CN.md)

</div>

AI coding agents often say "tests passed." Reviewers need better evidence:

- what command ran
- where it ran
- when it started and finished
- exit code
- output tail
- git SHA, branch, and dirty state when available

`cmd-receipt` runs one explicit command and writes JSON and Markdown receipts.

No API keys. No telemetry. No automatic command discovery.

## 30 Second Demo

```bash
npx github:maxi-maxima/cmd-receipt demo
```

The demo writes:

```text
reports/demo/cmd-receipt.json
reports/demo/cmd-receipt.md
```

## Wrap A Verification Command

```bash
npx github:maxi-maxima/cmd-receipt run -- npm test -- --run
```

Use a custom output directory:

```bash
npx github:maxi-maxima/cmd-receipt run --out reports/verify -- npm run check
```

The CLI exits with the wrapped command's exit code, so it can be used in CI.

## Output

Markdown receipt:

```md
# Command Receipt

| Command | Exit code | Duration | Started | Finished |
| --- | ---: | ---: | --- | --- |
| `npm test -- --run` | 0 | 812 ms | ... | ... |

## Context

- CWD: `E:/Projects/app`
- Git SHA: `abc123`
- Git branch: `main`
- Git dirty: no
```

JSON receipt contains the same structured data.

## What It Is Not

`cmd-receipt` is not a sandbox, cryptographic attestation system, or trust framework. It records local execution evidence for humans and agents to inspect. If you need signed supply-chain provenance, use a dedicated attestation tool.

## Safety

`cmd-receipt` only runs the command you pass after `run --`. It does not read package scripts and choose commands by itself.

## Development

```bash
npm install
npm run check
node dist/cli.js demo --out reports/demo
npm pack --dry-run --ignore-scripts
```

## License

MIT

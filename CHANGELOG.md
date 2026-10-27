# Changelog

## Unreleased

- Add Node.js, platform, architecture, and shell metadata to receipts.
- Write receipts for commands that fail to start instead of exiting with an uncaught error.
- Remove the unused Zod runtime dependency.

## 0.1.0

- Initial public release.
- Run explicit commands without shell string composition.
- Capture exit code, duration, stdout/stderr tails, cwd, and git state.
- Write JSON and Markdown receipts.
- Include `run` and `demo` commands.

# Contributing

Thanks for improving Cmd Receipt.

## Local Setup

```bash
npm install
npm run check
```

## Development Rules

- Do not auto-discover and run project commands.
- Avoid shell string composition.
- Keep receipts machine-readable and human-readable.
- Add tests for command failure cases.

## Pull Requests

Please include:

- the receipt field or runner behavior being changed
- a minimal command fixture
- verification output from `npm run check`

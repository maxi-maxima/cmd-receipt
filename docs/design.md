# Cmd Receipt Design

## Problem

Agents often say they ran tests, but reviewers need concrete evidence: command, exit code, time, output tail, and repository state.

## Scope

`cmd-receipt` runs an explicit command and writes a local JSON/Markdown receipt. It is not a sandbox, attestation system, or test runner framework.

## Commands

- `run -- <command>`: execute a command and write a receipt.
- `demo`: run a small demo command and write a receipt.

## Verification

The release gate is `npm run check`, demo generation, and `npm pack --dry-run --ignore-scripts`.

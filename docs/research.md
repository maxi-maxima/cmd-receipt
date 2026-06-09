# Research Notes

This project was selected after avoiding overlap with the user's existing public-launch repos:

- `mcp-fire-drill`: MCP and agent security drills
- `context-cal`: agent context budget auditing
- `screenlint`: rendered UI checking
- `mcp-flightcheck`: MCP server contract checks
- `webmcp-formkit`: WebMCP form metadata migration
- `agent-pr-brief`: deterministic PR review brief generation
- `test-lane-finder`: verification lane planning
- `import-proof`: package API hallucination checks

The opportunity is verification evidence. Agents often produce status claims in prose. Reviewers and future agents need compact execution records they can inspect or attach to PRs.

There are heavier ecosystems for signed attestations, provenance, and supply-chain verification. `cmd-receipt` deliberately avoids that scope. It is a local receipt for a command run: command array, cwd, timing, exit code, output tails, and git state.

This sits well after tools like `test-lane-finder`: first choose what to run, then wrap the run and keep the receipt.

Useful current references:

- https://slsa.dev/spec/v1.1/provenance
- https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-artifact-attestations
- https://in-toto.io/

# Security

`cmd-receipt` executes the explicit command supplied by the user. It is not a sandbox. Treat the wrapped command with the same care you would use when running it directly.

## Reporting Issues

Please report security issues privately if you find:

- execution of commands other than the explicit command array
- unsafe shell string composition
- arbitrary file writes outside the output directory
- accidental leakage beyond stdout/stderr tails

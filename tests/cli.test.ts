import { describe, expect, it } from "vitest";
import { parsePositiveInteger } from "../src/cli.js";

describe("parsePositiveInteger", () => {
  it("accepts safe positive integers", () => {
    expect(parsePositiveInteger("16000")).toBe(16000);
  });

  it("rejects partially numeric values", () => {
    expect(() => parsePositiveInteger("10ms")).toThrow("Expected a positive integer");
  });

  it("rejects zero, negatives, decimals, and unsafe integers", () => {
    for (const value of ["0", "-1", "1.5", String(Number.MAX_SAFE_INTEGER + 1)]) {
      expect(() => parsePositiveInteger(value)).toThrow("Expected a positive integer");
    }
  });
});
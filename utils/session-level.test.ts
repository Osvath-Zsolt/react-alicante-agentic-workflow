import { describe, expect, it } from "vitest";

import { formatLevel } from "./session-level";

describe("formatLevel", () => {
  it("capitalizes the first letter", () => {
    expect(formatLevel("beginner")).toBe("Beginner");
    expect(formatLevel("intermediate")).toBe("Intermediate");
    expect(formatLevel("advanced")).toBe("Advanced");
  });
});

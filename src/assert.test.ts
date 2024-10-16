// tests/assert.test.ts

import { describe, it, expect } from "vitest";
import { nanoid } from "nanoid";
import { assert } from "./assert"; // Adjust the import path as needed
import { hasProperty } from "./policies/testPolicies"; // Adjust the import path as needed
import { all } from "./policies"; // Adjust the import path as needed

const randKey1 = nanoid();
const rankKey2 = nanoid();

describe("assert", () => {
  const policyA = hasProperty(randKey1);
  const policyB = hasProperty(rankKey2);

  it("should not throw an error when the policy returns true", () => {
    const data = { [randKey1]: "some value" };
    expect(() => assert(policyA)(data)).not.toThrow();
  });

  it("should throw an error when the policy returns false", () => {
    const data = {};
    expect(() => assert(policyA)(data)).toThrow("Unauthorized");
  });

  it("should not throw an error when the policy returns true (complex policy)", () => {
    const data = {
      [randKey1]: "value",
      [rankKey2]: "value",
      extraProp: "extra",
    };
    expect(() => assert(all(policyA, policyB))(data)).not.toThrow();
  });

  it("should throw an error when the policy returns false (complex policy)", () => {
    const data = { [randKey1]: "value", extraProp: "extra" };
    expect(() => assert(all(policyA, policyB))(data)).toThrow("Unauthorized");
  });
});

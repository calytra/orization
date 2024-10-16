import { describe, it, expect } from "vitest";
import type { Policy } from "./types";

interface TestCase<TData> {
  description?: string;
  data: TData;
  expected: boolean;
}

export function testPolicy<TData>(
  policyName: string,
  policyFactory: () => Policy<TData>,
  testCases: TestCase<TData>[],
): void {
  describe(`Policy: ${policyName}`, () => {
    const policy = policyFactory();

    for (const [
      index,
      { description, data, expected },
    ] of testCases.entries()) {
      it(description || `Test case #${index + 1}`, () => {
        expect(policy(data)).toBe(expected);
      });
    }
  });
}

interface ParameterizedTestCase<TData, Args extends any[]> {
  description?: string;
  args: Args;
  data: TData;
  expected: boolean;
}

export function testParameterizedPolicy<TData, Args extends any[]>(
  policyName: string,
  policyDefinition: (...args: Args) => Policy<TData>,
  testCases: ParameterizedTestCase<TData, Args>[],
): void {
  describe(`Policy: ${policyName}`, () => {
    for (const [
      index,
      { description, args, data, expected },
    ] of testCases.entries()) {
      const policy = policyDefinition(...args);
      it(description || `Test case #${index + 1}`, () => {
        expect(policy(data)).toBe(expected);
      });
    }
  });
}

interface LogicalOperatorTestCase<TData> {
  description?: string;
  policies: (() => Policy<any>)[];
  data: TData;
  expected: boolean;
}

export function testLogicalOperatorPolicy<TData>(
  operatorName: string,
  operatorFunction: (...policies: Policy<any>[]) => Policy<TData>,
  testCases: LogicalOperatorTestCase<TData>[],
): void {
  describe(`Logical Operator: ${operatorName}`, () => {
    for (const [
      index,
      { description, policies, data, expected },
    ] of testCases.entries()) {
      const instantiatedPolicies = policies.map((policyFactory) =>
        policyFactory(),
      );
      const policy = operatorFunction(...instantiatedPolicies);
      it(description || `Test case #${index + 1}`, () => {
        expect(policy(data)).toBe(expected);
      });
    }
  });
}

interface IfElseTestCase<TData> {
  description?: string;
  conditionPolicy: () => Policy<any>;
  thenPolicy: () => Policy<any>;
  elsePolicy: () => Policy<any>;
  data: TData;
  expected: boolean;
}

export function testIfElsePolicy<TData>(
  operatorName: string,
  operatorFunction: (
    condition: Policy<any>,
    thenPolicy: Policy<any>,
    elsePolicy: Policy<any>,
  ) => Policy<TData>,
  testCases: IfElseTestCase<TData>[],
): void {
  describe(`Logical Operator: ${operatorName}`, () => {
    for (const [
      index,
      { description, conditionPolicy, thenPolicy, elsePolicy, data, expected },
    ] of testCases.entries()) {
      const policy = operatorFunction(
        conditionPolicy(),
        thenPolicy(),
        elsePolicy(),
      );
      it(description || `Test case #${index + 1}`, () => {
        expect(policy(data)).toBe(expected);
      });
    }
  });
}

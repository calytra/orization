import { nanoid } from "nanoid";
import { testIfElsePolicy } from "../../tests";
import { hasProperty } from "../testPolicies";
import { ifElse } from "./ifElse";

const randKeyCondition = nanoid();
const randKeyThen = nanoid();
const randKeyElse = nanoid();

testIfElsePolicy("ifElse", ifElse, [
  {
    description: "Condition is true, Then policy is true (should return true)",
    conditionPolicy: () => hasProperty(randKeyCondition),
    thenPolicy: () => hasProperty(randKeyThen),
    elsePolicy: () => hasProperty(randKeyElse),
    data: {
      [randKeyCondition]: "condition value",
      [randKeyThen]: "then value",
    },
    expected: true,
  },
  {
    description:
      "Condition is true, Then policy is false (should return false)",
    conditionPolicy: () => hasProperty(randKeyCondition),
    thenPolicy: () => hasProperty(randKeyThen),
    elsePolicy: () => hasProperty(randKeyElse),
    data: {
      [randKeyCondition]: "condition value",
      // Missing randKeyThen
    },
    expected: false,
  },
  {
    description: "Condition is false, Else policy is true (should return true)",
    conditionPolicy: () => hasProperty(randKeyCondition),
    thenPolicy: () => hasProperty(randKeyThen),
    elsePolicy: () => hasProperty(randKeyElse),
    data: {
      [randKeyElse]: "else value",
    },
    expected: true,
  },
  {
    description:
      "Condition is false, Else policy is false (should return false)",
    conditionPolicy: () => hasProperty(randKeyCondition),
    thenPolicy: () => hasProperty(randKeyThen),
    elsePolicy: () => hasProperty(randKeyElse),
    data: {
      // Missing both randKeyThen and randKeyElse
    },
    expected: false,
  },
]);

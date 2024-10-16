import { nanoid } from "nanoid";
import { testParameterizedPolicy } from "../../tests";
import { hasProperty } from "../testPolicies";
import { exactly } from "./exactly";

const randKey1 = nanoid();
const randKey2 = nanoid();
const randKey3 = nanoid();

testParameterizedPolicy("exactly", exactly, [
  {
    description: "Exactly 2 policies are true (2 out of 3)",
    args: [
      2,
      hasProperty(randKey1),
      hasProperty(randKey2),
      hasProperty(randKey3),
    ],
    data: {
      [randKey1]: "value",
      [randKey2]: "value",
    },
    expected: true,
  },
  {
    description: "Exactly 2 policies are true (3 out of 3)",
    args: [
      2,
      hasProperty(randKey1),
      hasProperty(randKey2),
      hasProperty(randKey3),
    ],
    data: {
      [randKey1]: "value",
      [randKey2]: "value",
      [randKey3]: "value",
    },
    expected: false,
  },
  {
    description: "Exactly 0 policies are true (0 out of 2)",
    args: [0, hasProperty(randKey1), hasProperty(randKey2)],
    data: {},
    expected: true,
  },
  {
    description: "Exactly 1 policy is true (1 out of 2)",
    args: [1, hasProperty(randKey1), hasProperty(randKey2)],
    data: {
      [randKey2]: "value",
    },
    expected: true,
  },
]);

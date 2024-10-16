// atLeast.test.ts

import { nanoid } from "nanoid";
import { testParameterizedPolicy } from "../../tests";
import { hasProperty } from "../testPolicies";
import { atLeast } from "./atLeast";

const randKey1 = nanoid();
const randKey2 = nanoid();
const randKey3 = nanoid();

testParameterizedPolicy("atLeast", atLeast, [
  {
    description: "At least 2 policies are true (2 out of 3)",
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
    description: "At least 2 policies are true (1 out of 3)",
    args: [
      2,
      hasProperty(randKey1),
      hasProperty(randKey2),
      hasProperty(randKey3),
    ],
    data: {
      [randKey1]: "value",
    },
    expected: false,
  },
  {
    description: "At least 1 policy is true (0 out of 2)",
    args: [1, hasProperty(randKey1), hasProperty(randKey2)],
    data: {},
    expected: false,
  },
  {
    description: "At least 1 policy is true (1 out of 2)",
    args: [1, hasProperty(randKey1), hasProperty(randKey2)],
    data: {
      [randKey2]: "value",
    },
    expected: true,
  },
]);

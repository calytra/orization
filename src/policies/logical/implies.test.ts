import { nanoid } from "nanoid";
import { testLogicalOperatorPolicy } from "../../tests";
import { hasProperty, inArray } from "../testPolicies";
import { implies } from "./implies";

const randKey = nanoid();
const randKey1 = nanoid();

testLogicalOperatorPolicy("implies", implies, [
  {
    description: "First policy is false (implies true)",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      arrayProperty: ["other"],
    },
    expected: true,
  },
  {
    description: "Both policies are true",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      [randKey]: "some value",
      arrayProperty: [randKey1, "other"],
    },
    expected: true,
  },
  {
    description: "First policy is true, second is false",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      [randKey]: "some value",
      arrayProperty: ["other"],
    },
    expected: false,
  },
  {
    description: "Both policies are false",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {},
    expected: true,
  },
]);

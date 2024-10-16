import { nanoid } from "nanoid";
import { testLogicalOperatorPolicy } from "../../tests";
import { hasProperty, inArray } from "../testPolicies";
import { all } from "./all";

const randKey = nanoid();
const randKey1 = nanoid();

testLogicalOperatorPolicy("all", all, [
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
    description: "First policy is false",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      arrayProperty: [randKey1, "other"],
    },
    expected: false,
  },
  {
    description: "Second policy is false",
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
    expected: false,
  },
]);

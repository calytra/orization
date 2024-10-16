import { nanoid } from "nanoid";
import { testLogicalOperatorPolicy } from "../../tests";
import { hasProperty, inArray } from "../testPolicies";
import { some } from "./some";

const randKey = nanoid();
const randKey1 = nanoid();

testLogicalOperatorPolicy("some", some, [
  {
    description: "Both policies are false",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {},
    expected: false,
  },
  {
    description: "First policy is true",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      [randKey]: "some value",
    },
    expected: true,
  },
  {
    description: "Second policy is true",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      arrayProperty: [randKey1],
    },
    expected: true,
  },
  {
    description: "Both policies are true",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      [randKey]: "some value",
      arrayProperty: [randKey1],
    },
    expected: true,
  },
]);

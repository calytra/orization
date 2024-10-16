import { nanoid } from "nanoid";
import { testLogicalOperatorPolicy } from "../../tests";
import { hasProperty, inArray } from "../testPolicies";
import { same } from "./same";

const randKey = nanoid();
const randKey1 = nanoid();

testLogicalOperatorPolicy("same", same, [
  {
    description: "Both policies are true",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      [randKey]: "value",
      arrayProperty: [randKey1],
    },
    expected: true,
  },
  {
    description: "Both policies are false",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {},
    expected: true,
  },
  {
    description: "First policy is true, second is false",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      [randKey]: "value",
    },
    expected: false,
  },
  {
    description: "First policy is false, second is true",
    policies: [() => hasProperty(randKey), () => inArray(randKey1)],
    data: {
      arrayProperty: [randKey1],
    },
    expected: false,
  },
]);

import { nanoid } from "nanoid";
import { testLogicalOperatorPolicy } from "../../tests";
import { hasProperty } from "../testPolicies";
import { xor } from "./xor";

const randKey1 = nanoid();
const randKey2 = nanoid();

testLogicalOperatorPolicy("xor", (a, b) => xor(a, b), [
  {
    description: "Both policies are true",
    policies: [() => hasProperty(randKey1), () => hasProperty(randKey2)],
    data: {
      [randKey1]: "value1",
      [randKey2]: "value2",
    },
    expected: false,
  },
  {
    description: "First policy is true, second is false",
    policies: [() => hasProperty(randKey1), () => hasProperty(randKey2)],
    data: {
      [randKey1]: "value1",
    },
    expected: true,
  },
  {
    description: "First policy is false, second is true",
    policies: [() => hasProperty(randKey1), () => hasProperty(randKey2)],
    data: {
      [randKey2]: "value2",
    },
    expected: true,
  },
  {
    description: "Both policies are false",
    policies: [() => hasProperty(randKey1), () => hasProperty(randKey2)],
    data: {},
    expected: false,
  },
]);

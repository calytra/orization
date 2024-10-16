import { nanoid } from "nanoid";
import { testParameterizedPolicy } from "../../tests";
import { inArray } from "./in-array";

const randKey = nanoid();

testParameterizedPolicy("inArray", inArray, [
  {
    description: "arrayProperty includes the value",
    args: [randKey],
    data: { arrayProperty: ["other", randKey, "another"] },
    expected: true,
  },
  {
    description: "arrayProperty does not include the value",
    args: [randKey],
    data: { arrayProperty: ["other", "another"] },
    expected: false,
  },
  {
    description: "arrayProperty is empty",
    args: [randKey],
    data: { arrayProperty: [] },
    expected: false,
  },
  {
    description: "arrayProperty is missing",
    args: [randKey],
    data: {},
    expected: false,
  },
]);

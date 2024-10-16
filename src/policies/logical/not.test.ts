// not.test.ts

import { nanoid } from "nanoid";
import { testPolicy } from "../../tests";
import { hasProperty } from "../testPolicies";
import { not } from "./not";

const randKey = nanoid();

testPolicy("not(hasProperty)", () => not(hasProperty(randKey)), [
  {
    description: "Inner policy is false",
    data: {},
    expected: true,
  },
  {
    description: "Inner policy is true",
    data: {
      [randKey]: "some value",
    },
    expected: false,
  },
]);

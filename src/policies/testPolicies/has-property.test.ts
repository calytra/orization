import { nanoid } from "nanoid";
import { testParameterizedPolicy } from "../../tests";
import { hasProperty } from "./has-property";

const randKey = nanoid();

testParameterizedPolicy("hasProperty", hasProperty, [
  {
    description: "Data has the property",
    args: [randKey],
    data: { [randKey]: "some value" },
    expected: true,
  },
  {
    description: "Data does not have the property",
    args: [randKey],
    data: {},
    expected: false,
  },
]);

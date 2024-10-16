// ifElse.ts

import { definePolicy, type IntersectPolicies, type Policy } from "../../types";

export const ifElse = definePolicy(
  <Policies extends [Policy<any>, Policy<any>, Policy<any>]>(
    condition: Policies[0],
    thenPolicy: Policies[1],
    elsePolicy: Policies[2],
  ) => {
    return (data: IntersectPolicies<Policies>) => {
      return condition(data) === true ? thenPolicy(data) : elsePolicy(data);
    };
  },
);

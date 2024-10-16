// implies.ts

import { definePolicy, type IntersectPolicies, type Policy } from "../../types";

export const implies = definePolicy(
  <Policies extends [Policy<any>, Policy<any>]>(
    policyA: Policies[0],
    policyB: Policies[1],
  ) => {
    return (data: IntersectPolicies<Policies>) => {
      return !policyA(data) || policyB(data);
    };
  },
);

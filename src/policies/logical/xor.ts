import { definePolicy, type Policy, type IntersectPolicies } from "../../types";

export const xor = definePolicy(
  <Policies extends [Policy<any>, Policy<any>]>(
    policyA: Policies[0],
    policyB: Policies[1],
  ) => {
    return (data: IntersectPolicies<Policies>) => {
      return policyA(data) !== policyB(data);
    };
  },
);

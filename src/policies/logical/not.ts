import { definePolicy, type IntersectPolicies, type Policy } from "../../types";

export const not = definePolicy(
  <Policies extends [Policy<any>]>(policy: Policies[0]) => {
    return (data: IntersectPolicies<Policies>) => {
      return !policy(data);
    };
  },
);

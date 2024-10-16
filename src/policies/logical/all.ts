import { definePolicy, type IntersectPolicies, type Policy } from "../../types";

export const all = definePolicy(
  <Policies extends Policy<any>[]>(...policies: Policies) => {
    return (data: IntersectPolicies<Policies>) => {
      return policies.every((policy) => policy(data) === true);
    };
  },
);

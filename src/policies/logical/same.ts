import { definePolicy, type IntersectPolicies, type Policy } from "../../types";

export const same = definePolicy(
  <Policies extends Policy<any>[]>(...policies: Policies) => {
    return (data: IntersectPolicies<Policies>) => {
      if (policies.length === 0) return true;
      const firstResult = policies[0]!(data);
      return policies.every((policy) => policy(data) === firstResult);
    };
  },
);

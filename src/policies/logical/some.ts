import { definePolicy, type IntersectPolicies, type Policy } from "../../types";

export const some = definePolicy(
  <Policies extends Policy<any>[]>(...policies: Policies) => {
    return (data: IntersectPolicies<Policies>) => {
      return policies.some((policy) => policy(data) === true);
    };
  },
);

import { definePolicy, type IntersectPolicies, type Policy } from "../../types";

export const atLeast = definePolicy(
  <Policies extends Policy<any>[]>(n: number, ...policies: Policies) => {
    return (data: IntersectPolicies<Policies>) => {
      let count = 0;
      for (const policy of policies) {
        if (policy(data) == true) {
          count++;
          if (count >= n) return true; // Short-circuit
        }
      }
      return false;
    };
  },
);

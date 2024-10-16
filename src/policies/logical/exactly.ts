import { definePolicy, type IntersectPolicies, type Policy } from "../../types";

export const exactly = definePolicy(
  <Policies extends Policy<any>[]>(n: number, ...policies: Policies) => {
    return (data: IntersectPolicies<Policies>) => {
      let count = 0;
      for (const policy of policies) {
        if (policy(data) === true) {
          count++;
        }
      }
      return count === n;
    };
  },
);

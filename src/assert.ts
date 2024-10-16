import type { Policy, IntersectPolicies } from "./types";
import { all } from "./policies";

export function assert<Policies extends Policy<any>[]>(
  ...policies: Policies
): (data: IntersectPolicies<Policies>) => IntersectPolicies<Policies> {
  return (data: IntersectPolicies<Policies>) => {
    if (all(...policies)(data) === false) {
      throw new Error("Unauthorized");
    }
    return data;
  };
}

import { definePolicy } from "../../types";

// Policy: inArray(valueKey)
export const inArray = definePolicy((valueKey: string) => {
  return (data: { arrayProperty?: string[] }) =>
    Array.isArray(data.arrayProperty) && data.arrayProperty.includes(valueKey);
});

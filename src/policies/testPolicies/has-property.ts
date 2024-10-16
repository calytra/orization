import { definePolicy } from "../../types";

export const hasProperty = definePolicy((propKey: string) => {
  return (data: { [key: string]: any }) => propKey in data;
});

import { ProductType } from "./../interfaces";

export const productTypeConfig: {
  [type in ProductType]: { label: string; colorScheme: string };
} = {
  BASIC: { label: "BASICO", colorScheme: "purple" },
  ELABORATED: { label: "ELABORADO", colorScheme: "cyan" },
};

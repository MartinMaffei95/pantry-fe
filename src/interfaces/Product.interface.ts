export interface Product {
  id: number;
  name: string;
  type: ProductType;
}

export type ProductType = "BASIC" | "ELABORATED";

export interface ProductFromAPI {
  id: number;
  name: string;
  type: ProductType;
  __v: number;
}

export interface AddProductForm extends Omit<Product, "id"> {}

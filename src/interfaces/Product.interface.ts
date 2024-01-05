export interface Product {
  id: string;
  name: string;
  type: ProductType;
}

export type ProductType = "BASIC" | "ELABORATED";

export interface ProductFromAPI {
  _id: string;
  name: string;
  type: ProductType;
  __v: number;
}

export interface AddProductForm extends Omit<Product, "id"> {}

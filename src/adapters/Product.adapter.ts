import { Product, ProductFromAPI } from "../interfaces";

export const adaptProductFromAPI = (product: ProductFromAPI): Product => {
  const adaptedProduct: Product = {
    id: product.id,
    name: product.name,
    type: product.type,
  };
  return adaptedProduct;
};

export const adaptProductsFromAPI = (products: ProductFromAPI[]): Product[] => {
  let adaptedProducts: Product[] = [];

  products.forEach((product) => {
    const adaptedProduct = adaptProductFromAPI(product);

    adaptedProducts.push(adaptedProduct);
  });

  return adaptedProducts;
};

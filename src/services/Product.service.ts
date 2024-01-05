import axios, { AxiosError } from "axios";
import { adaptProductsFromAPI } from "../adapters/Product.adapter";
import { AddProductForm, PaginatedData, Product } from "../interfaces";

export default class ProductService {
  async getAllProducts() {
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}/product`,
        method: "GET",
      });

      const adaptedData = adaptProductsFromAPI(request.data.data);
      const paginatedData: PaginatedData<Product[]> = {
        data: adaptedData,
        pagination: request.data.pagination,
      };
      return paginatedData;
    } catch (error: any | AxiosError) {
      throw new Error("ROMPIDO");
    }
  }

  async addProduct(data: AddProductForm) {
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}/product`,
        method: "POST",
        data: data,
      });

      return "SUCCESS";
    } catch (error: any | AxiosError) {
      throw new Error("ROMPIDO");
    }
  }
  async searchProducts(query: string, filters: string = "") {
    try {
      const request = await axios({
        baseURL: `${
          import.meta.env.VITE_BASE_URL
        }/product?search=${query}&${filters}`,
        method: "GET",
      });

      const adaptedData = adaptProductsFromAPI(request.data.data);
      const paginatedData: PaginatedData<Product[]> = {
        data: adaptedData,
        pagination: request.data.pagination,
      };
      return paginatedData;
    } catch (error: any | AxiosError) {
      throw new Error("ROMPIDO");
    }
  }
}

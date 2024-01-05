import axios, { AxiosError } from "axios";
import { adaptProductsFromAPI } from "../adapters/Product.adapter";
import { PaginatedData, Product } from "../interfaces";
import { Recipe } from "../interfaces/Recipe.interface";
import {
  adaptRecipeFromAPI,
  adaptRecipesFromAPI,
} from "../adapters/Recipe.adapter";

export default class RecipeService {
  async getAllRecipes() {
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}/recipe`,
        method: "GET",
      });

      const adaptedData = adaptRecipesFromAPI(request.data.data);
      const paginatedData: PaginatedData<Recipe[]> = {
        data: adaptedData,
        pagination: request.data.pagination,
      };
      return paginatedData;
    } catch (error: any | AxiosError) {
      throw new Error("ROMPIDO");
    }
  }
  async getRecipeById(id: string) {
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}/recipe/${id}`,
        method: "GET",
      });

      const adaptedData = adaptRecipeFromAPI(request.data);

      return adaptedData;
    } catch (error: any | AxiosError) {
      throw new Error("ROMPIDO");
    }
  }
}

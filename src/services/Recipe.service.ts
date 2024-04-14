import axios, { AxiosError } from "axios";
import { PaginatedData, Product } from "../interfaces";
import { AddRecipeForm, Recipe } from "../interfaces/Recipe.interface";
import {
  adaptRecipeDetailsFromAPI,
  adaptRecipeFromAPI,
  adaptRecipesFromAPI,
} from "../adapters/Recipe.adapter";

export default class RecipeService {
  async getAllRecipes(page?:number|null,limit?:number|null) {
    if(!page){
      page = 1
    }
    if(!limit){
      limit = 5
    }
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}/recipe?offset=${page}&limit=${limit}`,
        method: "GET",
      });
      const adaptedData = adaptRecipesFromAPI(request?.data?.data);
      const paginatedData: PaginatedData<Recipe[]> = {
        data: adaptedData,
        pagination: request?.data?.pagination,
      };
      console.log("PAGINATION" , request?.data?.pagination)
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

      const adaptedData = adaptRecipeDetailsFromAPI(request.data);

      return adaptedData;
    } catch (error: any | AxiosError) {
      throw new Error("ROMPIDO");
    }
  }
  async createRecipe(data: AddRecipeForm) {
    try {
      const request = await axios({
        baseURL: `${import.meta.env.VITE_BASE_URL}/recipe`,
        method: "POST",
        data: data,
      });

      return "SUCCESS";
    } catch (error: any | AxiosError) {
      throw new Error("ROMPIDO");
    }
  }
}

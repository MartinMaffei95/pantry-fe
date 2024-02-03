import { Product } from "./Product.interface";
import { ProductFromAPI } from ".";

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredientWithReplacement[];
  steps: any[];
  result: RecipeResult;
}

export interface RecipeIngredient {
  product: RecipeProduct;
  measurement: RecipeMeasurementFromAPI;
}

export interface RecipeIngredientWithReplacement extends RecipeIngredient {
  replace_by: RecipeIngredient[];
}
export interface RecipeMeasurement {
  meassurement: string;
  quantity: number;
}

export interface RecipeResult {
  product: RecipeProduct;
  yield: RecipeMeasurement;
  portion: RecipePortion;
}

export interface RecipeProduct {
  id: string;
  name: string;
  type: string;
  resultOf?: Recipe | undefined;
}

export interface RecipePortion extends RecipeMeasurement {
  weight: number;
}

// ##  FROM API>

export interface RecipeFromAPI {
  _id: string;
  name: string;
  ingredients: RecipeIngredientWithReplacementFromAPI[];
  steps: any[];
  result: RecipeResultFromAPI;
  __v: number;
}

export interface RecipeIngredientFromAPI {
  product: RecipeProductFromAPI;
  measurement: RecipeMeasurementFromAPI;
}

export interface RecipeIngredientWithReplacementFromAPI
  extends RecipeIngredientFromAPI {
  replace_by: RecipeIngredientFromAPI[];
}

export interface RecipeProductFromAPI {
  _id: string;
  name: string;
  type: string;
  __v: number;
  resultOf?: RecipeFromAPI | undefined;
}

export interface RecipeMeasurementFromAPI {
  meassurement: string;
  quantity: number;
}

export interface RecipeResultFromAPI {
  product: RecipeProductFromAPI;
  yield: RecipeMeasurementFromAPI;
  portion: RecipePortionFromAPI;
}

export interface RecipePortionFromAPI extends RecipeMeasurementFromAPI {
  weight: number;
}

// ##  NEW RECIPE FORM

export interface AddRecipeForm {
  name: string;
  ingredients: {
    product: string;
    measurement: RecipeMeasurement;
  }[];
  steps: string[];
  result: {
    product: string;
    yield: RecipeMeasurement;
    portion: RecipePortion;
  };
}

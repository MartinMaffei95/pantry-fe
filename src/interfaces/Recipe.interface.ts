//  RECIPE USED IN APP
export interface Recipe {
  id: number;
  name: string;
  steps: any[];
  result: Result;
  ingredients: RecipeIngredient[];
}

export interface Result {
  id: number;
  result_measurement: string;
  result_weight: number;
  portions_measurement: string;
  portions_quantity: number;
  portions_weight: number;
}

export interface RecipeIngredient {
  id: number;
  measurement_type: string;
  measurement_quantity: number;
}

// RECIPE DETAILS USED IN APP

export interface RecipeDetails {
  id: number;
  name: string;
  ingredients: RecipeIngredient[];
  result: Result;
}

export interface RecipeIngredient {
  id: number;
  measurement_type: string;
  measurement_quantity: number;
  product: Product;
  resultOf?: RecipeDetails;
}

export interface Product {
  id: number;
  name: string;
  type: string;
}

// RECIPES FROM API
export interface RecipeFromApi {
  id: number;
  name: string;
  steps: any[];
  result: ResultFromApi;
  ingredients: RecipeIngredientFromApi[];
}

export interface ResultFromApi {
  id: number;
  result_measurement: string;
  result_weight: number;
  portions_measurement: string;
  portions_quantity: number;
  portions_weight: number;
}

export interface RecipeIngredientFromApi {
  id: number;
  measurement_type: string;
  measurement_quantity: number;
}

// RECIPE DETAILS  FROM API

export interface RecipeDetailsFromApi {
  id: number;
  name: string;
  ingredients: RecipeIngredientFromApi[];
  result: ResultFromApi;
}

export interface RecipeIngredientFromApi {
  id: number;
  measurement_type: string;
  measurement_quantity: number;
  product: Product;
  resultOf?: RecipeDetailsFromApi;
}

export interface ProductFromApi {
  id: number;
  name: string;
  type: string;
}

// ##  NEW RECIPE FORM

export type StepForm = Pick<StepRecipeForApi,"title" | "text" | "order">

export interface StepRecipeForApi {
  title: string;
  text: string;
  order: number;
}

export interface AddRecipeForm {
  name: string;
  ingredients: {
    product: number;
    measurement: RecipeMeasurement;
  }[];
  steps: StepForm[];
  result: {
    product: string;
    yield: RecipeMeasurement;
    portion: RecipePortion;
  };
}

export interface RecipeMeasurement {
  measurement: string;
  quantity: number;
}

export interface RecipePortion extends RecipeMeasurement {
  weight: number;
}

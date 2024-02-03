import {
  RecipeIngredient,
  Recipe,
  RecipeFromAPI,
  RecipeIngredientFromAPI,
  RecipeIngredientWithReplacement,
  RecipeIngredientWithReplacementFromAPI,
  RecipeProduct,
  RecipeProductFromAPI,
  RecipeResult,
  RecipeResultFromAPI,
} from "../interfaces";

export const adaptRecipesFromAPI = (recipes: RecipeFromAPI[]): Recipe[] => {
  let adaptedRecipes: Recipe[] = [];

  recipes.forEach((recipe) => {
    const adaptedRecipe = adaptRecipeFromAPI(recipe);
    adaptedRecipes.push(adaptedRecipe);
  });

  return adaptedRecipes;
};

export const adaptRecipeFromAPI = (recipe: RecipeFromAPI): Recipe => {
  if (typeof recipe === "string") return recipe;
  const adaptedRecipe: Recipe = {
    id: recipe?._id,
    name: recipe?.name,
    ingredients: adaptIngredientsWithReplacementFromAPI(recipe?.ingredients),
    steps: recipe?.steps,
    result: adaptResultFromAPI(recipe?.result),
  };
  return adaptedRecipe;
};

const adaptIngredientsWithReplacementFromAPI = (
  ingredients: RecipeIngredientWithReplacementFromAPI[]
): RecipeIngredientWithReplacement[] => {
  let adaptedIngredients: RecipeIngredientWithReplacement[] = [];
  ingredients.forEach((ingredient) => {
    const adaptedIngredient: RecipeIngredientWithReplacement = {
      product: adaptProductFromAPI(ingredient.product),
      measurement: ingredient.measurement,
      replace_by: adaptIngredientsFromAPI(ingredient.replace_by),
    };
    adaptedIngredients.push(adaptedIngredient);
  });
  return adaptedIngredients;
};

const adaptIngredientsFromAPI = (
  ingredients: RecipeIngredientFromAPI[]
): RecipeIngredient[] => {
  let adaptedIngredients: RecipeIngredient[] = [];
  ingredients.forEach((ingredient) => {
    const adaptedIngredient: RecipeIngredient = {
      product: adaptProductFromAPI(ingredient?.product),
      measurement: ingredient?.measurement,
    };
    adaptedIngredients.push(adaptedIngredient);
  });
  return adaptedIngredients;
};

const adaptResultFromAPI = (result: RecipeResultFromAPI): RecipeResult => {
  const adaptedResult: RecipeResult = {
    product: adaptProductFromAPI(result?.product),
    yield: result?.yield,
    portion: result.portion,
  };
  return adaptedResult;
};

const adaptProductFromAPI = (result: RecipeProductFromAPI): RecipeProduct => {
  const adaptedProduct: RecipeProduct = {
    id: result?._id,
    name: result?.name,
    type: result?.type,
    resultOf: result?.resultOf
      ? adaptRecipeFromAPI(result?.resultOf)
      : undefined,
  };
  return adaptedProduct;
};

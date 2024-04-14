import {
  Recipe,
  RecipeDetails,
  RecipeDetailsFromApi,
  RecipeFromApi,
  RecipeIngredient,
  RecipeIngredientFromApi,
} from "../interfaces";

export const adaptRecipesFromAPI = (recipes: RecipeFromApi[]): Recipe[] => {
  console.log(recipes)
  let adaptedRecipes: Recipe[] = [];

  recipes.forEach((recipe) => {
    const adaptedRecipe = adaptRecipeFromAPI(recipe);
    adaptedRecipes.push(adaptedRecipe);
  });

  return adaptedRecipes;
};

export const adaptRecipeFromAPI = (recipe: RecipeFromApi): Recipe => {
  console.log(recipe)

  const adaptedRecipe: Recipe = {
    id: recipe?.id,
    name: recipe?.name,
    steps: recipe?.steps,
    result: recipe.result,
    ingredients:recipe.ingredients
    
  };
  return adaptedRecipe;
};

// RECIPES DETAILS

export const adaptRecipeDetailsFromAPI = (recipe: RecipeDetailsFromApi): RecipeDetails => {
  console.log(recipe)

  const adaptedRecipe: RecipeDetails = {
    id: recipe?.id,
    name: recipe?.name,
    ingredients: recipe.ingredients,
    result:recipe.result
    
  };
  return adaptedRecipe;
};


export const adaptSingleRecipeDetails =(recipeIngredientsFromApi:RecipeIngredientFromApi):RecipeIngredient=>{

  const adaptedIngredients:RecipeIngredient ={
    id: recipeIngredientsFromApi.id,
    measurement_type: recipeIngredientsFromApi.measurement_type,
    measurement_quantity: recipeIngredientsFromApi.measurement_quantity,
    product: recipeIngredientsFromApi.product,
    resultOf:recipeIngredientsFromApi?.resultOf ? recipeIngredientsFromApi?.resultOf  : undefined
  }
  return adaptedIngredients
}

export const adaptRecipeDetails =(recipeIngredientsFromApi:RecipeIngredientFromApi[]):RecipeIngredient[]=>{
  let adaptedrecipes:RecipeIngredient[] =[]

  recipeIngredientsFromApi?.forEach(
    recipeIngredient =>{
        const adaptedIngredientRecipe:RecipeIngredient =adaptSingleRecipeDetails(recipeIngredient)
        adaptedrecipes.push(adaptedIngredientRecipe)
    }
  )

  return adaptedrecipes
}

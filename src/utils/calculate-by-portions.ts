export const calculateByPortions = (
  ingrediendWight: number | undefined,
  portionsByRecipe: number | undefined,
  wantedPortions: number | undefined
): number => {
      console.log(
        "[ingrediendWight]",    ingrediendWight,
        "[portionsByRecipe]",portionsByRecipe,
        "[wantedPortions]",wantedPortions,
      )
  try {
    if (!ingrediendWight || !portionsByRecipe || !wantedPortions) return 0;
    const necxPort = ingrediendWight / portionsByRecipe;
    const res = necxPort * wantedPortions;
    return res;
  } catch (e) {
    return 0;
  }
};


// (Peso de la porcion / el total del peso de la receta) * la cantidad de productos que busque
export const calculateFromRecipe = (
  ingrediendWight: number | undefined, // (Peso de la porcion 
  recipeTotalResult: number | undefined,
  wantedPortions: number | undefined,
): number => {
    
  try {
    if (!ingrediendWight || !recipeTotalResult || !wantedPortions ) return 0;
    const necxPort = ingrediendWight / wantedPortions ;
    //
    const res = necxPort * recipeTotalResult;
    return res;
  } catch (e) {
    return 0;
  }
};

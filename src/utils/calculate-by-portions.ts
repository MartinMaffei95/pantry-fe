export const calculateByPortions = (
  ingrediendWight: number | undefined,
  portionsByRecipe: number | undefined,
  wantedPortions: number | undefined
): number => {
  try {
    if (!ingrediendWight || !portionsByRecipe || !wantedPortions) return 0;
    const necxPort = ingrediendWight / portionsByRecipe;
    const res = necxPort * wantedPortions;
    return res;
  } catch (e) {
    return 0;
  }
};

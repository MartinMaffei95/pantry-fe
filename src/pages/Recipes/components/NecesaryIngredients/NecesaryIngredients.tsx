import { FC } from "react";
import { RecipeIngredient } from "../../../../interfaces";
import {
  calculateByPortions,
} from "../../../../utils/calculate-by-portions";
import Title from "../../../../components/Generics/Title/Title";
import { getBasicProducts } from "../../../../utils/get-basic-products";
import { IngredientsList } from "./IngredientsList";
import { IngredientItem } from "./IngredientItem";

type Props = {
  ingredients: RecipeIngredient[];
  valuesToCalculate?: {
    portionsByRecipe: number | undefined;
    wantedPortions: number | undefined;
    totalWeightOfRecipe: number | undefined;
  };
  parentValue?: number;
};
const NecesaryIngredients: FC<Props> = ({ ingredients, valuesToCalculate }) => {
  getBasicProducts(ingredients);
  return (
    <div>
      <Title as="h3"> Necesario:</Title>

      <div>
        <ul className="">
        {ingredients.map((ingredient) => (
          <div>
                {/* <li className="flex border-b-2 justify-between px-2 ">
                <span>{ingredient.product.name}</span>
                <span className="flex gap-2">
                  {valuesToCalculate
                    ? 
                      calculateByPortions(
                        ingredient?.measurement_quantity,
                        valuesToCalculate?.portionsByRecipe,
                        valuesToCalculate?.wantedPortions
                      )
                    : ingredient?.measurement_quantity}
                  <span>{ingredient?.measurement_type}.</span>
                  
                </span>
              </li> */}
            
              <IngredientItem
                  className="flex border-b-2 justify-between px-2 "
                  name={ingredient.product.name}
                  value=  {valuesToCalculate
                    ? 
                      calculateByPortions(
                        ingredient?.measurement_quantity,
                        valuesToCalculate?.portionsByRecipe,
                        valuesToCalculate?.wantedPortions
                      )
                    : ingredient?.measurement_quantity}
                  measurement_type={ingredient.measurement_type}
                />
            <ul>
              {/* {ingredient?.product ? ( */}
                <IngredientsList
                  ingredients={ingredient?.resultOf?.ingredients || []}
                  valuesToCalculate={valuesToCalculate}
                  parentValue={
                    valuesToCalculate?
                    calculateByPortions(
                    ingredient?.measurement_quantity,
                    valuesToCalculate?.portionsByRecipe,
                    valuesToCalculate?.wantedPortions
                  )
                :
                ingredient?.measurement_quantity
              }
                  parentTotalResultWeight={
                    ingredient?.resultOf?.result.result_weight || 0
                  }
                />
              {/* : null} */}
            </ul>
          </div>
        ))}
            </ul>

      </div>
    </div>
  );
};

export default NecesaryIngredients;



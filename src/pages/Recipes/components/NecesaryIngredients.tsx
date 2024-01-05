import { FC } from "react";
import { RecipeIngredient } from "../../../interfaces";
import { calculateByPortions } from "../../../utils/calculate-by-portions";
import Title from "../../../components/Generics/Title/Title";

type Props = {
  ingredients: RecipeIngredient[];
  valuesToCalculate?: {
    portionsByRecipe: number | undefined;
    wantedPortions: number | undefined;
  };
};
const NecesaryIngredients: FC<Props> = ({ ingredients, valuesToCalculate }) => {
  return (
    <div>
      <Title as="h3"> Necesario:</Title>

      <div>
        {ingredients.map((ingredient) => (
          <div>
            <ul className="">
              <li className="flex border-b-2 justify-between px-2 ">
                <span>{ingredient.product.name}</span>
                <span className="flex gap-2">
                  {valuesToCalculate
                    ? ingredient.measurement.quantity &&
                      calculateByPortions(
                        ingredient?.measurement?.quantity,
                        valuesToCalculate.portionsByRecipe,
                        valuesToCalculate.wantedPortions
                      )
                    : ingredient.measurement.quantity}
                  <span>{ingredient.measurement.meassurement}.</span>
                </span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NecesaryIngredients;

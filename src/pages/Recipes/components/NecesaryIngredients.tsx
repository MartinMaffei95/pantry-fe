import { FC } from "react";
import { RecipeIngredient } from "../../../interfaces";
import { calculateByPortions } from "../../../utils/calculate-by-portions";
import Title from "../../../components/Generics/Title/Title";
import { getBasicProducts } from "../../../utils/get-basic-products";

type Props = {
  ingredients: RecipeIngredient[];
  valuesToCalculate?: {
    portionsByRecipe: number | undefined;
    wantedPortions: number | undefined;
  };
};
const NecesaryIngredients: FC<Props> = ({ ingredients, valuesToCalculate }) => {
  getBasicProducts(ingredients);
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
            <ul>
              {ingredient?.product ? (
                <IngredientsList
                  ingredients={ingredient?.product?.resultOf?.ingredients || []}
                  valuesToCalculate={valuesToCalculate}
                />
              ) : // <li className="flex justify-between px-4 last:border-b-2 ">
              //   <span>{deepIngr.product.name}</span>
              //   <span className="flex gap-2">
              //     {valuesToCalculate
              //       ? deepIngr.measurement.quantity &&
              //         calculateByPortions(
              //           deepIngr?.measurement?.quantity,
              //           valuesToCalculate.portionsByRecipe,
              //           valuesToCalculate.wantedPortions
              //         )
              //       : deepIngr.measurement.quantity}
              //     <span>{deepIngr.measurement.meassurement}.</span>
              //   </span>
              // </li>
              null}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NecesaryIngredients;

const IngredientsList: FC<Props> = ({ ingredients, valuesToCalculate }) => {
  return (
    <>
      {ingredients.map((deepIngr) => (
        <li className="flex justify-between px-4 last:border-b-2 ">
          <span>{deepIngr.product.name}</span>
          <span className="flex gap-2">
            {valuesToCalculate
              ? deepIngr.measurement.quantity &&
                calculateByPortions(
                  deepIngr?.measurement?.quantity,
                  valuesToCalculate.portionsByRecipe,
                  valuesToCalculate.wantedPortions
                )
              : deepIngr.measurement.quantity}
            <span>{deepIngr.measurement.meassurement}.</span>
          </span>
        </li>
      ))}
    </>
  );
};

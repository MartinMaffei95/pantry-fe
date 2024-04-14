import { FC, useState } from "react";
import { RecipeIngredient } from "../../../../interfaces";
import { IngredientItem } from "./IngredientItem";

type Props = {
    ingredients: RecipeIngredient[];
    valuesToCalculate?: {
      portionsByRecipe: number | undefined;
      wantedPortions: number | undefined;
      totalWeightOfRecipe: number | undefined;
    };
    parentValue: number;
    parentTotalResultWeight:number
  };
export const IngredientsList: FC<Props> = ({
    ingredients,
    parentValue,
    parentTotalResultWeight,
  }) => {
    return (
      <>
        {ingredients.map((deepIngr) => {
          const [deepListOpen, setDeepListOpen] = useState<boolean>(false);
  
          if (deepIngr?.resultOf) {
            return (
              <>
                <IngredientItem
                  name={deepIngr.product.name}
                  value={
                    (deepIngr?.measurement_quantity / parentTotalResultWeight) *
                    parentValue 
                  }
                  measurement_type={deepIngr.measurement_type}
                  clickAction={()=>setDeepListOpen(!deepListOpen)}
                />
                <ul
              
                  className={`px-2 rounded-md overflow-hidden duration-400 transition-max-height   ${deepListOpen ? "max-h-96 " :"max-h-0"}`}
                >
                  {deepIngr?.resultOf
                    ? deepIngr?.resultOf?.ingredients?.map(
                        (resultOfIngredient) => (
                          <>
                            {resultOfIngredient.resultOf ? (
                              <li>SI</li>
                            ) : (
                              <IngredientItem
                                name={resultOfIngredient.product.name}
                                value={
                                  (resultOfIngredient?.measurement_quantity /
                                    parentTotalResultWeight) *
                                  parentValue
                                }
                                measurement_type={
                                  resultOfIngredient.measurement_type
                                }
                              />
                            )}
                          </>
                        )
                      )
                    : null}
                </ul>
              </>
            );
          } else {
            return (
              <>
                <IngredientItem
                  name={deepIngr.product.name}
                  value={
                    (deepIngr?.measurement_quantity / parentTotalResultWeight) *
                    parentValue
                  }
                  measurement_type={deepIngr.measurement_type}
                />
              </>
            );
          }
        })}
      </>
    );
  };
  
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import RecipeService from "../../services/Recipe.service";
import LoadingWrapper from "../../components/Loader/LoadingWrapper";
import Paper from "../../components/Generics/Paper/Paper";
import NecesaryIngredients from "./components/NecesaryIngredients";
import { calculateByPortions } from "../../utils/calculate-by-portions";
import Title from "../../components/Generics/Title/Title";
import { FaCalculator } from "react-icons/fa";

type Props = {};
const RecipeDetailsView: FC<Props> = ({}) => {
  const { id } = useParams();
  const recipeService = new RecipeService();

  const { status, response, executeRequest } = useApiRequest((id: string) =>
    recipeService.getRecipeById(id)
  );

  const [portions, setPortions] = useState(0);

  useEffect(() => {
    if (id) {
      executeRequest(id);
      setPortions(response.data?.result?.portion?.quantity || 0);
    }
  }, []);

  return (
    <div>
      <Title>{response.data?.name}</Title>

      <LoadingWrapper
        status={status}
        exequteRequest={() => id && executeRequest(id)}
      >
        <>
          <Paper>
            <NecesaryIngredients
              ingredients={response.data?.ingredients || []}
            />
          </Paper>
          <Paper>
            <Title as="h3">Resultado</Title>

            <div>{response.data?.result?.product?.name}</div>
            <div className="flex gap-4">
              Peso final:
              <div>
                {response.data?.result?.yield.quantity}
                {response.data?.result?.yield.meassurement}
              </div>
            </div>
            <div className="flex gap-4">
              Rinde:
              <div>
                {response.data?.result?.portion.quantity} Porciones x
                {response.data?.result?.portion.weight}
                {response.data?.result?.portion.meassurement}
              </div>
            </div>
          </Paper>
          <Title as="h3" className="flex gap-2 items-center p-2">
            <FaCalculator />
            Calculador de recetas
          </Title>
          <Paper>
            <div className=" border border-orange-400 p-2 rounded-md flex items-center justify-between">
              Porciones a producir:
              <input
                className="border-b-2 border-orange-400 text-end w-16 px-2"
                onChange={(e) =>
                  setPortions(e.target.value ? +e.target.value : 0)
                }
                value={portions}
                type="number"
              />
            </div>
            <NecesaryIngredients
              ingredients={response.data?.ingredients || []}
              valuesToCalculate={{
                portionsByRecipe: response.data?.result?.portion?.quantity,
                wantedPortions: portions,
              }}
            />
            <div className="border-t-2 border-neutral-500  flex justify-between mt-1 px-2 font-semibold">
              Peso final:
              <div className="flex gap-2">
                <span>
                  {response.data?.result?.yield.quantity &&
                    calculateByPortions(
                      response.data?.result?.yield.quantity,
                      response.data?.result?.portion?.quantity,
                      portions
                    )}
                </span>
                <span>{response.data?.result?.yield.meassurement}.</span>
              </div>
            </div>
          </Paper>
        </>
      </LoadingWrapper>
    </div>
  );
};

export default RecipeDetailsView;

import { FC, useEffect } from "react";
import ProductService from "../../services/Product.service";
import { useApiRequest } from "../../hooks/useApiRequest";
import Paper from "../../components/Generics/Paper/Paper";
import LoadingWrapper from "../../components/Loader/LoadingWrapper";
import RecipeService from "../../services/Recipe.service";
import { FaReceipt } from "react-icons/fa";
import RecipeCard from "../../components/Cards/RecipeCard";
type Props = {};
const RecipesView: FC<Props> = ({}) => {
  const recipeService = new RecipeService();

  const { status, response, executeRequest } = useApiRequest(() =>
    recipeService.getAllRecipes()
  );

  useEffect(() => {
    executeRequest();
  }, []);
  return (
    <>
      <Paper>
        <LoadingWrapper status={status} exequteRequest={executeRequest}>
          {response?.data?.data?.map((p) => (
            <RecipeCard
              id={p.id}
              ingredients={p.ingredients}
              name={p.name}
              key={p.id}
            />
          ))}
        </LoadingWrapper>
      </Paper>
    </>
  );
};

export default RecipesView;

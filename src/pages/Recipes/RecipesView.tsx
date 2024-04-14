import { FC, useEffect } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import Paper from "../../components/Generics/Paper/Paper";
import LoadingWrapper from "../../components/Loader/LoadingWrapper";
import RecipeService from "../../services/Recipe.service";
import RecipeCard from "../../components/Cards/RecipeCard";
import ListPagination from "../../components/List/ListPagination";
type Props = {};
const RecipesView: FC<Props> = ({}) => {
  const recipeService = new RecipeService();

  const { status, response, executeRequest } = useApiRequest((page?:number|null) =>
    recipeService.getAllRecipes(page)
  );

  useEffect(() => {
    executeRequest();
    console.log("[response]",response)
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
              {response?.data?.pagination ?
              // <div className="bg-neutral-100 w-full p-4 flex items-center ">
              //   <div onClick={()=>executeRequest(response?.data?.pagination?.prevPage)} className="p-2">
              //     <FaChevronLeft />
              //   </div>
              //   <input  className="!w-10 !text-black text-right !pr-1 !m-0 shadow-md border-b border-b-black bg-transparent outline-none" type="number" placeholder={`${response.data.pagination.page}`} />
              //   /
              //   {response.data.pagination.totalPages}
              //   <div onClick={()=>executeRequest(response?.data?.pagination?.nextPage)} className="p-2">
              //     <FaChevronRight />
              //   </div>
              // </div>
              <ListPagination 
                  nextPageFx={()=>executeRequest(response?.data?.pagination?.nextPage)}
                  prevPageFx={()=>executeRequest(response?.data?.pagination?.prevPage)}
                 pagination={response.data.pagination}
              />
              :
              null 
          }
        </LoadingWrapper>
      </Paper>
    </>
  );
};

export default RecipesView;

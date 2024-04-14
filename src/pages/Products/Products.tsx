import { FC, useEffect } from "react";
import ProductService from "../../services/Product.service";
import { useApiRequest } from "../../hooks/useApiRequest";
import Paper from "../../components/Generics/Paper/Paper";
import LoadingWrapper from "../../components/Loader/LoadingWrapper";
import ProductCard from "../../components/Cards/ProductCard";
import ListPagination from "../../components/List/ListPagination";

type Props = {};
const Products: FC<Props> = ({}) => {
  const productsService = new ProductService();

  const { status, response, executeRequest } = useApiRequest((page?:number|null) =>
    productsService.getAllProducts(page)
  );

  useEffect(() => {
    executeRequest(1);
  }, []);
  return (
    <>
      <Paper>
        <LoadingWrapper status={status} exequteRequest={executeRequest}>
       
          {response?.data?.data?.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
           
              {response?.data?.pagination ?
        
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

export default Products;

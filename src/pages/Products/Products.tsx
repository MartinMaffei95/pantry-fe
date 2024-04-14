import { FC, useEffect } from "react";
import ProductService from "../../services/Product.service";
import { useApiRequest } from "../../hooks/useApiRequest";
import Paper from "../../components/Generics/Paper/Paper";
import LoadingWrapper from "../../components/Loader/LoadingWrapper";
import ProductCard from "../../components/Cards/ProductCard";
import { FaChevronCircleLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Input } from "@chakra-ui/react";
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

export default Products;

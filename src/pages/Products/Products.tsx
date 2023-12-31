import { FC, useEffect } from "react";
import ProductService from "../../services/Product.service";
import { useApiRequest } from "../../hooks/useApiRequest";
import Paper from "../../components/Generics/Paper/Paper";
import LoadingWrapper from "../../components/Loader/LoadingWrapper";
import ProductCard from "../../components/Cards/ProductCard";

type Props = {};
const Products: FC<Props> = ({}) => {
  const productsService = new ProductService();

  const { status, response, executeRequest } = useApiRequest(() =>
    productsService.getAllProducts()
  );

  useEffect(() => {
    executeRequest();
  }, []);
  return (
    <>
      <Paper>
        <LoadingWrapper status={status} exequteRequest={executeRequest}>
          {response?.data?.data?.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </LoadingWrapper>
      </Paper>
    </>
  );
};

export default Products;

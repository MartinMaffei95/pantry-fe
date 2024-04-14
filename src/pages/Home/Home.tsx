import { FC, useEffect } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import ProductService from "../../services/Product.service";

type Props = {};
const Home: FC<Props> = ({}) => {
  const productsService = new ProductService();

  const { executeRequest } = useApiRequest(() =>
    productsService.getAllProducts()
  );

  useEffect(() => {
    executeRequest();
  }, []);
  return <div className="bg-neutral-50"></div>;
};

export default Home;

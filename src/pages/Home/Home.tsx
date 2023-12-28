import { FC, useEffect } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import ProductService from "../../services/Product.service";

type Props = {};
const Home: FC<Props> = ({}) => {
  const productsService = new ProductService();

  const { status, response, executeRequest } = useApiRequest(() =>
    productsService.getAllProducts()
  );

  useEffect(() => {
    executeRequest();
  }, []);
  return (
    <div className="bg-neutral-50">
      {status}
      {response?.data?.map((p) => (
        <p>{p?._id}</p>
      ))}
    </div>
  );
};

export default Home;

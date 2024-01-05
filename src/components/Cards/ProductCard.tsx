import { FC } from "react";
import { Link } from "react-router-dom";
import { LuBanana } from "react-icons/lu";
import { Product } from "../../interfaces";
import ProductTypeBadge from "../Generics/Bages/ProductTypeBadge";
type Props = { product: Product };
const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="flex gap-2 items-center justify-start shadow-md p-2 bg-neutral-50 my-2"
    >
      <LuBanana />
      <div className="flex justify-between w-full items-center ">
        <p key={product.id}>{product.name}</p>

        <ProductTypeBadge type={product.type} />
      </div>
    </Link>
  );
};

export default ProductCard;

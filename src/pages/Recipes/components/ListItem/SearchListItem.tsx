import { FC } from "react";
import { Product } from "../../../../interfaces";
import ProductTypeBadge from "../../../../components/Generics/Bages/ProductTypeBadge";

export type SearchListItemProductProps = {
  res: Product;
  selectResult: <Product>(res: Product) => void;
};
const SearchListItemProduct: FC<SearchListItemProductProps> = ({
  res,
  selectResult,
}) => {
  return (
    <li
      onClick={() => selectResult(res)}
      className="flex justify-between items-center hover:bg-orange-300 p-2 cursor-pointer duration-150"
    >
      {res.name}
      <ProductTypeBadge type={res.type} />
    </li>
  );
};

export default SearchListItemProduct;

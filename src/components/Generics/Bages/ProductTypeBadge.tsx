import { productTypeConfig } from "../../../config/product-types.config";

import { FC } from "react";
import { ProductType } from "../../../interfaces";
import { Badge } from "@chakra-ui/react";

type Props = {
  type: ProductType;
};
const ProductTypeBadge: FC<Props> = ({ type }) => {
  return (
    <Badge colorScheme={productTypeConfig[type].colorScheme}>
      {productTypeConfig[type].label}
    </Badge>
  );
};

export default ProductTypeBadge;

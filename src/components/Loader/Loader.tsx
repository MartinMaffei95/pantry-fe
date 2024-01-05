import { FC } from "react";
import { Bars } from "react-loader-spinner";
type Props = {};
const Loader: FC<Props> = () => {
  return (
    <Bars
      height="80"
      width="80"
      color="#c05621"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;

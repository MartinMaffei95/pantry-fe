import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}
const PageView: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default PageView;

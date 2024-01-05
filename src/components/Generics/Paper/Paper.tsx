import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends PropsWithChildren {
  className?: string;
}
const Paper: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={twMerge("bg-white rounded-md shadow-md p-2 mb-4", className)}
    >
      {children}
    </div>
  );
};

export default Paper;

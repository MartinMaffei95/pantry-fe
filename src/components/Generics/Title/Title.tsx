import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type TitleTags = "h1" | "h2" | "h3" | "h4";
interface Props extends PropsWithChildren, HTMLAttributes<HTMLOrSVGElement> {
  as?: TitleTags;
}
const Title: FC<Props> = ({ as: Tag = "h1", children, ...props }) => {
  const titleClassNameConfig: { [element in TitleTags]: string } = {
    h1: "text-2xl mb-4",
    h2: "",
    h3: "",
    h4: "",
  };

  return (
    <Tag
      className={twMerge(
        "text-lg font-bold tracking-wide ",
        titleClassNameConfig[Tag]
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Title;

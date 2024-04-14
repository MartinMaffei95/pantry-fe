import { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name: string;
  value: number;
  measurement_type: string;
  clickAction?: () => void | undefined;
  className?:string

};

export const IngredientItem: FC<Props> = ({
  name,
  value,
  measurement_type,
  clickAction,
  className
}) => {
  return (
    <li
      onClick={() => {
        clickAction ? clickAction() : null;
      }}
      className={twMerge("flex justify-between px-4 last:border-b-2 ",className)}
    >
      <span
        className={twMerge("", clickAction ? "underline font-medium" : null)}
      >
        {name}
      </span>
      <span className="flex gap-2">
        {value % 1 !== 0 ? value.toFixed(2) : value}
        <span>{measurement_type}.</span>
      </span>
    </li>
  );
};

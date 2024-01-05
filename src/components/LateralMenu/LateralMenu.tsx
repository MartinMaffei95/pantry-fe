import { FC } from "react";
import { Link, redirect } from "react-router-dom";

type Props = {
  onClose: any;
};
const LateralMenu: FC<Props> = ({ onClose }) => {
  return (
    <ul className="font-medium  [&>ul]:flex [&>ul]:flex-col [&>ul]:pl-2">
      <ul>
        <li>Productos</li>
        <Link onClick={onClose} to="/products">
          Ver todos
        </Link>
        <Link onClick={onClose} to="/products/new">
          Crear
        </Link>
      </ul>
      <span className="h-[1px] w-full bg-neutral-400 flex" />
      <ul>
        <li>Recetas</li>
        <Link onClick={onClose} to="/recipes">
          Ver todas
        </Link>
        <Link onClick={onClose} to="/recipes/new">
          Agregar
        </Link>
      </ul>
    </ul>
  );
};

export default LateralMenu;

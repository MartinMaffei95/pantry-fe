import { FC } from "react";
import { FaReceipt } from "react-icons/fa";
import { RecipeIngredient } from "../../interfaces";
import { Link } from "react-router-dom";

type Props = { id: string; name: string; ingredients: RecipeIngredient[] };
const RecipeCard: FC<Props> = ({ id, name, ingredients }) => {
  return (
    <Link
      to={`/recipes/${id}`}
      className="flex gap-2 items-center justify-start shadow-md p-2 bg-neutral-50 my-2"
    >
      <FaReceipt />
      <div>
        <p key={id}>
          {name} - Ingredientes: {ingredients?.length}
        </p>
      </div>
    </Link>
  );
};

export default RecipeCard;

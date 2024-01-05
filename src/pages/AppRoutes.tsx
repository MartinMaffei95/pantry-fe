import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/LayOuts/Layout";
import Home from "./Home/Home";
import Products from "./Products/Products";
import RecipesView from "./Recipes/RecipesView";
import RecipeDetailsView from "./Recipes/RecipeDetailsView";
import AddProduct from "./Products/AddProduct";
import AddRecipe from "./Recipes/AddRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/products",
        children: [
          {
            path: "",

            element: <Products />,
          },
          {
            path: ":id",
            element: <Products />,
          },
          {
            path: "new",
            element: <AddProduct />,
          },
        ],
      },

      {
        path: "/recipes",
        children: [
          {
            path: "",
            element: <RecipesView />,
          },
          {
            path: ":id",
            element: <RecipeDetailsView />,
          },
          {
            path: "new",
            element: <AddRecipe />,
          },
        ],
      },
    ],
  },
]);

export default router;

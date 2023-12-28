import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/LayOuts/Layout";
import Home from "./Home/Home";

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
    ],
  },
]);

export default router;

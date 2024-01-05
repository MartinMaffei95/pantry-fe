import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./pages/AppRoutes.tsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider style={{ zIndex: 20000 }}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

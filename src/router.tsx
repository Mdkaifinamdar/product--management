import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProductListPage from "./pages/ProductListPage";
import ProductFormPage from "./pages/ProductFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductListPage />,
      },
      {
        path: "/add",
        element: <ProductFormPage />,
      },
      {
        path: "/edit/:id",
        element: <ProductFormPage />,
      },
    ],
  },
]);

export default router;

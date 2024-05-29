import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./page/HomePage";
import CartPage from "./page/CartPage";
import CheckoutPage, { action as checkoutAction } from "./page/CheckoutPage";
import DetailPage from "./page/DetailPage/DetailPage";
import LoginPage, { action as signInAction } from "./page/LoginPage";
import RegisterPage, { action as signUpAction } from "./page/RegisterPage";
import ShopPage from "./page/ShopPage";
import Information from "./page/Information";
import History from "./page/History";
import OrderDetail from "./page/OrderDetail";
import ErrorPage from "./page/ErrorPage/ErrorPage";
import ProtectedRoute from "./page/ProtectRoute";

import logo from "./logo.svg";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,

    id: "product-sample",
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "shop",
        element: <ProtectedRoute element={<ShopPage></ShopPage>} />,
      },
      {
        path: "detail/:productId",
        element: <ProtectedRoute element={<DetailPage></DetailPage>} />,
      },
      {
        path: "cart",
        element: <ProtectedRoute element={<CartPage></CartPage>} />,
      },
      {
        path: "checkout",
        element: <ProtectedRoute element={<CheckoutPage></CheckoutPage>} />,
        action: checkoutAction,
      },
      { path: "login", element: <LoginPage></LoginPage>, action: signInAction },
      {
        path: "register",
        element: <RegisterPage></RegisterPage>,
        action: signUpAction,
      },
      {
        path: "information",
        element: <ProtectedRoute element={<Information></Information>} />,
      },
      {
        path: "history",
        element: <ProtectedRoute element={<History></History>} />,
      },
      {
        path: "order/:orderId",
        element: <ProtectedRoute element={<OrderDetail></OrderDetail>} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

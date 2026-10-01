import { createBrowserRouter } from "react-router";
import { Root } from "../layout/Root";
import { Home } from "../pages/Home";

import { MyProducts } from "../pages/MyProducts";
import { MyBids } from "../pages/MyBids";
import { RootSecond } from "../layout/RootSecond";
import { CreateProduct } from "../pages/CreateProduct";
import { AuthLayout } from "../layout/AuthLayout";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ViewDetails } from "../pages/ViewDetails";
import { Cart2 } from "../pages/Cart2";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import axiosInstance from "../axios/axiosInstance";
import { AllBids } from "../pages/AllBids";
import { UpdateBid } from "../pages/UpdateBid";
import { ProductList } from "../pages/ProductList";
// import { Cart } from "../pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        loader: () => axiosInstance.get("/"),
        Component: Home,
      },
      {
        path: "productLists",
        element: (
          <PrivateRoute>
            <ProductList></ProductList>
          </PrivateRoute>
        ),
      },
      {
        path: "viewDetails/:id",
        element: (
          <PrivateRoute>
            <ViewDetails></ViewDetails>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "cart",
      //   element: <Cart></Cart>,
      // },
      {
        path: "cart2",
        element: <Cart2></Cart2>,
        loader: () => axiosInstance.get("/"),
      },
      {
        path: "myProducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "allBids",
        element: <AllBids></AllBids>,
      },
      {
        path: "myBids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "bid/:bidId",
        loader: ({ params }) => axiosInstance.get(`/bid/${params.bidId}`),
        element: (
          <PrivateRoute>
            <UpdateBid></UpdateBid>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    Component: RootSecond,
    children: [
      {
        path: "createProduct",
        element: (
          <PrivateRoute>
            <CreateProduct></CreateProduct>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);

export default router;

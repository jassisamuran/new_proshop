import { Container } from "react-bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./screens/Cart";
import Homescreens from "./screens/Homescreens";
import LoginScreen from "./screens/LoginScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreens from "./screens/PaymentScreens";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import Productscreens from "./screens/Productscreens";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreens from "./screens/ShippingScreens";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homescreens />,
  },
  {
    path: "/product/:id",
    element: <Productscreens />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "/cart/:id/:qty?",
    element: <Cart />,
  },
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <RegisterScreen /> },
  { path: "/profile", element: <ProfileScreen /> },
  { path: "/shipping", element: <ShippingScreens /> },
  { path: "/payment", element: <PaymentScreens /> },
  {
    path: "/placeorder",
    element: <PlaceOrderScreen />,
  },

  {
    path: "/orders/:id",
    element: <OrderScreen />,
  },
  { path: "/admin/userlist", element: <UserListScreen /> },
  { path: "/user/:id/edit", element: <UserEditScreen /> },
  { path: "/admin/productlist", element: <ProductListScreen /> },
  {
    path: "/admin/product/:id/edit",
    element: <ProductEditScreen />,
  },
  {
    path: "/admin/orderlist",
    element: <OrderListScreen />,
  },
  {
    path: "/search/:keyword",
    element: <Homescreens />,
  },
]);

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <RouterProvider router={router} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;


import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Container} from 'react-bootstrap'
import Footer from './components/Footer';
import Header from './components/Header';
import Homescreens from './screens/Homescreens';
import Productscreens from './screens/Productscreens';
import Cart from './screens/Cart';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreens from './screens/ShippingScreens';
import PaymentScreens from './screens/PaymentScreens';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Homescreens/>
  },{
    path:"/product/:id",
    element:<Productscreens/>
    },
    {
      path:"cart",
      element:<Cart/>
    },
    {
      path:"/cart/:id/:qty?",
    element:<Cart/>    },
    {path:"/login",
     element:<LoginScreen/>},
     {path:'/register',
    element:<RegisterScreen/>},
    {path:"/profile",
    element:<ProfileScreen/>},
    {path:"/shipping",
     element:<ShippingScreens/>},
     {path:"/payment",
      element:<PaymentScreens/>},
      {
        path:"/placeorder",
        element:<PlaceOrderScreen/>
      },
      
      {
        path:"/orders/:id",
        element:<OrderScreen/>
      },
      {path:'/admin/userlist',
      element:<UserListScreen/>},
      {path:'/user/:id/edit',
       element:<UserEditScreen/>},
       {path:'/admin/productlist',
       element:<ProductListScreen/>},
       {
        path:'/admin/product/:id/edit',
        element:<ProductEditScreen/>
       },
       {
        path:'/admin/orderlist',
        element:<OrderListScreen/>
       },
       {
        path:'/search/:keyword',
        element:<Homescreens/>
       }
]);

function App() {
  return < >
  
  <Header/>
  <main className='py-3'>
    <Container>
    <RouterProvider router={router} />
    </Container> 
 </main>
  <Footer/>
  
  </>

}

export default App;

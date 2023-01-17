import  React, {useEffect } from 'react';
import './App.css';
import { Header } from './components/layout/Header/Header';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WebFont from 'webfontloader';
import { Footer } from './components/layout/Footer/Footer';
import { Home } from './components/Home/Home';
import { ProductDetails } from './components/Products/ProductDetails';
import { Products } from './components/Products/Products';
import { Search } from './components/Products/Search';
import ScrollToTop from './components/ScrollToTop';
import { LoginSignUp } from './components/User/LoginSignUp';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserDetails } from './actions/userActions';
import { UserInfo } from './components/layout/Header/UserInfo';
import { UserAccount } from './components/User/UserAccount';
import { ProtectedRoute } from './components/Routes/ProtectedRoute';
import { UpdateProfile } from './components/User/UpdateProfile';
import { UpdatePassword } from './components/User/UpdatePassword';
import { ForgotPassword } from './components/User/ForgotPassword';
import { ResetPassword } from './components/User/ResetPassword';
import { Cart } from './components/cart/Cart';
import { Shipping } from './components/cart/Shipping';
import { ConfirmOrder } from './components/cart/ConfirmOrder';
// import axios from 'axios';
import { Payments } from './components/cart/Payments';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { OrderSuccess } from './components/cart/OrderSuccess';
import { MyOrders } from './components/order/MyOrders';
import { OrderInfo } from './components/order/OrderInfo';

function App() {
  // async function getStripeApi(){
  //   const {key} = await axios.get("/api/payments/stripeapi");
  //   setStripeApi(key.stripeAPIKey) ;
  // }
  const {isAuthenticated, user, loading}=useSelector(state=>state.user);

  // const [stripeApi, setStripeApi] = useState("");
  const stripeApiKey="pk_test_51MQ0cGSJI45UgsmwOytPN1vCRRZcY6t3D9ItrYfv9rFqNJ5KUG2v1sRhEjGpoyrCjufR1Vhx20hPPSfE8r0t3uDN00i5gPqBQA";
  

  const dispatch=useDispatch();
  useEffect(() => {
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans", "Chilanka", "Bad Script", "Poppins"]
      }
    });
    // getStripeApi();

    dispatch(loadUserDetails());

  }, [dispatch])
  
  return (
    <div>
    <Router>
      <ScrollToTop/>
    {isAuthenticated && <UserInfo user={user}/>}  
    <Header/>
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/allproducts/:id' element={<ProductDetails/>}/>
    <Route exact path='/plants' element={<Products/>}/>
    <Route path='/plants/:keyword' element={<Products/>}/>
    <Route exact path='/search' element={<Search/>}/>
    <Route exact path="/login" element={<LoginSignUp/>}/>
    <Route exact path="/useraccount" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><UserAccount/></ProtectedRoute>}/>
    <Route exact path="/updateprofile" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><UpdateProfile/></ProtectedRoute>}/>
    <Route exact path="/updatepassword" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><UpdatePassword/></ProtectedRoute>}/>
    <Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
    <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
    <Route exact path="/cart" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><Cart/></ProtectedRoute>}/>
    <Route exact path="/shipping" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><Shipping/></ProtectedRoute>}/>
    <Route exact path="/order/confirm" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><ConfirmOrder/></ProtectedRoute>}/>
    {stripeApiKey && (
      <Route path="/order/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payments />
                </Elements>
              }
            ></Route>
          )}
    <Route exact path="/payment/success" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><OrderSuccess/></ProtectedRoute>}/>
    <Route exact path="/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><MyOrders/></ProtectedRoute>}/>
    <Route exact path="/order/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}><OrderInfo/></ProtectedRoute>}/>
   

    </Routes>
    <Footer/>
    </Router>
    </div>
  );
}

export default App;

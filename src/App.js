import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, setCart } from './redux/actions/userAction';
import LogoutModel from './Components/LogoutModel';
import axios from 'axios';
import Loading from './Components/Loading';

function App() {
  const dispatch = useDispatch();
  useEffect (() => {
    const userCart = localStorage.getItem("cart");
    if (!userCart) {
      localStorage.setItem("cart", JSON.stringify([]));
    }else{
      const userCart = JSON.parse(localStorage.getItem("cart"));
      dispatch(setCart(userCart));
    }
  }
  , [])

 const userDetails = async() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      console.log("no token");
    }else{
      const response = await axios.get(
        'https://fakse-store-api.herokuapp.com/api/v1/auth/profile',
        {headers: {
            'Authorization': `Bearer ${token}`
        }
        }

    )
    console.log("Getting User Details",response.data);
    dispatch(addUser(response.data));
    }
  }
  useEffect(() => {
    userDetails()
  }, [])
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product-details/:data" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <LogoutModel/>
    </>
  );
}

export default App;

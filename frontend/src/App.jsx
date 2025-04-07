import React, { useEffect, useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './components/home/HomePage'
import NotFoundPage from './components/ui/NotFoundPage'
import ProductPage from './components/product/ProductPage'
import api from './api'
import CartItem from './components/cart/CartItem'
import CartPage from './components/cart/CartPage'
import CheckoutPage from './components/checkout/CheckoutPage'
import LoginPage from './components/user/LoginPage'
import ProtectedRoute from './components/ui/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import UserProfilePage from './components/user/UserProfilePage'
import PaymentStatusPage from './components/payment/PaymentStatusPage'

const App = () => {
  const [numcartitems,setNumbercartitems] =useState(0);
  const cart_code=localStorage.getItem("cart_code")

  useEffect(function(){
    if(cart_code){
      api.get(`get_cart_stat?cart_code=${cart_code}`)
      .then(res => {
        console.log(res.data)
        setNumbercartitems(res.data.num_of_items)
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  },[])
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout numcartitems={numcartitems} />}>
      <Route index element={<HomePage />}  />
      <Route path='products/:slug' element={<ProductPage setNumbercartitems={setNumbercartitems} />} />
      <Route  path='cart' element={<CartPage setNumbercartitems={setNumbercartitems}/>}/>
      <Route path='checkout' element={<ProtectedRoute ><CheckoutPage /></ProtectedRoute>} />
      <Route path='login' element={<LoginPage />} />
      <Route path='profile' element={<UserProfilePage />} />
      <Route path='*' element={<NotFoundPage />} />
      <Route path='payment-status' element={<PaymentStatusPage  setNumbercartitems={setNumbercartitems}/>} />
        </Route>
        </Routes>
        </BrowserRouter>
        </AuthProvider>
  )
}

export default App

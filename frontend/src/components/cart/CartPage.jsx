import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import api from '../../api'
import Spinner from '../ui/Spinner'

const CartPage = ({setNumbercartitems}) => {
   const cart_code=localStorage.getItem("cart_code")
   const [cartitems,setCartitems]=useState([])
   const [cartTotal,setCarttotal]=useState(0.00)
   const [loading,setLoading]=useState(false)
   const tax=4.00
  useEffect(function(){
          setLoading(true)
          api.get(`get_cart?cart_code=${cart_code}`)
          .then(res => { 
            console.log(res.data) 
            setLoading(false)
            setCartitems(res.data.items)
            setCarttotal(res.data.sum_total)
            setNumbercartitems={setNumbercartitems}

          })
        .catch(err =>{
          console.log(err.message)
          setLoading(false)
        })
  },[])
  if (loading){
    return <Spinner loading={loading} />
  }
  if(cartitems.length <1){
    return(<div className="alert alert-primary my-5" role="alert">
     You haven't Added any items to Cart
    </div>)
  }
  return (
    <div className='container my-3 py-3' style={{
        height:'80vh',overflow:"scroll"
    }}>
        <h5 className='mb-4'>Shopping Cart</h5>
        <div className="row">
            <div className="col-md-8">
              {cartitems.map(item =>  < CartItem key={item.id} item={item} setCarttotal={setCarttotal}  cartitems={cartitems} setNumbercartitems={setNumbercartitems} setCartitems={setCartitems} /> )}
               
               
            </div>
            < CartSummary cartTotal={cartTotal} tax={tax} />
        </div>
    </div>
  )
}

export default CartPage
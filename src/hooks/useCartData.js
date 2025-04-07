import { useEffect,useState } from "react"
import api from "../api"

function useCartData(){
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
          
 
           })
         .catch(err =>{
           console.log(err.message)
           setLoading(false)
         })
   },[cart_code])
   return {cartTotal,cartitems,setCartitems,setCarttotal,loading,tax}

}
export default useCartData
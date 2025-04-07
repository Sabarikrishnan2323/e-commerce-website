import React, { useState } from 'react'
import api, { BASE_URL } from '../../api'
import { toast } from 'react-toastify'

const CartItem = ({item,setCarttotal,cartitems,setNumbercartitems,setCartitems}) => {

  const [quantity,setQuantity]=useState(item.quantity)
  const [loading,setLoading]=useState(false)
  const itemdata={quantity:quantity,item_id:item.id}
  const itemid={item_id:item.id}

  function deletecartitem(){
    const confirmdelete=window.confirm("Are you want to remove this item")
    if(confirmdelete){
      api.post("delete_cartitem/",itemid).then(res => {console.log(res.data) 
        toast.success("cartitem removed successfully")
        setCartitems(cartitems.filter(cartitem => cartitem.id != item.id))
        setCarttotal(cartitems.filter((cartitem) => cartitem.id != item.id ).reduce((acc,curr) => acc+ curr.total,0))
        setNumbercartitems(cartitems.filter((cartitem)=> cartitem.id != item.id).reduce((acc,curr)=> acc+ curr.quantity,0))})
      .catch(err => {
        console.log(err.message)
      })
    }
  }
  function updatecartitem(){
    setLoading(true)
    api.patch("update_quantity/",itemdata)
    .then(res => {
      console.log(res.data)
      setLoading(false)
      toast.success("Cartitem added successfully!!!")
      setCarttotal(cartitems.map((cartitem) => cartitem.id === item.id ? res.data.data :cartitem ).reduce((acc,curr) => acc+ curr.total,0))
      setNumbercartitems(cartitems.map((cartitem)=> cartitem.id === item.id ? res.data.data : cartitem).reduce((acc,curr)=> acc+ curr.quantity,0))
    })
    .catch(err => {
      console.log(err.message)
      setLoading(false)
    })
  }
  return (
    <div className='col-md-12'>
        <div className="cart-item d-flex align-items-center nb-3 p-3"
        style={{backgroundColor:'#f8f9fa',borderRadius:'5px'}}>
            <img src={`${BASE_URL}${item.product.image}`} alt="product image" className='img-fluid'
            style={{width:'80px',height:"80px",objectFit:'cover',borderRadius:'5px'}} />
            <div className="ms-3 flex-grow-1">
                <h5 className='mb-1'>{item.product.name}</h5>
                <p className='mb-0 text-muted'>{`$${item.product.price}`}</p>
            </div>
            <div className='d-flex align-items-center'>
                <input type="number" className='form-control me-3' min='1' value={quantity}  onChange={(e) => setQuantity(e.target.value)} style={{width:"70px"}} />
                <button className='btn mx-2 btn-sm' onClick={updatecartitem} disabled={loading} style={{backgroundColor:'#4b3bcb',color:'white'}}>{loading ? "Updating":"Update"}</button>
                <button className='btn btn-danger btn-sm' onClick={deletecartitem}>Remove</button>
            </div>
        </div>
    </div>
  )
}

export default CartItem
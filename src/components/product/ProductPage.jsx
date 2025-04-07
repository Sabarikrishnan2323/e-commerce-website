import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductPagePlaceHolder from './ProductPagePlaceHolder'
import RelatedProducts from './RelatedProducts'
import { BASE_URL } from '../../api'
import api from '../../api'
import { toast } from 'react-toastify'

const ProductPage = ({setNumbercartitems}) => {
    const {slug} =useParams()
    const [product,setProduct] =useState({})
    const [similarProducts,setSimilarProducts] =useState([])
    const [loading,setLoading]=useState(false)
    const [incart,setIncart]=useState(false)
    const cart_code=localStorage.getItem("cart_code")

    useEffect(function(){
        if(product.id){
        api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
        .then(res => {
            console.log(res.data)
            setIncart(res.data.product_in_cart)

        })
        .catch(err => {
            console.log(err.message)
        }) }
    },[cart_code,product.id])

    const newItem={cart_code:cart_code,product_id:product.id}
    function add_item(){
        api.post("add_item/",newItem)
        .then(res => {
            console.log(res.data)
            setIncart(true)
            toast.success("Product Added to Cart")
            setNumbercartitems(curr => curr +1)
        })
        .catch(err =>{
            console.log(err.message)
        })
    }

    useEffect(function(){
        setLoading(true)
        api.get(`product_detail/${slug}`)
        .then(res => {console.log(res.data)
            setProduct(res.data)
            setSimilarProducts(res.data.similar_products)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err.message)
        })
    },[slug])
    if(loading){
        return  <ProductPagePlaceHolder />
    }
  return (
    <div>
       
        <section className='py-3'>
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img src={`${BASE_URL}${product.image}`} alt="...." className='card-img-top mb-5 mb-md-0' />

                    </div>
                    <div className="col-md-6">
                        <div className="small mb-1">SKU: BST-498</div>
                        <h1 className='display-5 fw-bolder'>{product.name}</h1>
                        <div className="fs-5 mb-5">
                            <span>{`$${product.price}`}</span>
                        </div>
                        <p className='lead'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus corrupti laborum saepe sunt architecto consectetur eveniet animi id accusamus repudiandae in libero dolorem perspiciatis quisquam alias autem, beatae error labore nulla officia explicabo quae tempore eaque? Illum, accusantium. Eius autem, fugit et dolores exercitationem dignissimos maxime nobis sed provident. Consectetur!

                        </p>
                        <div className="d-flex">
                            <button type='button' onClick={add_item}  disabled={incart} className='btn btn-outline-dark flex-shrink-0'>
                                <i className='me-1 bi-cart-fill'></i>
                                {incart ? "Product added to Cart" : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <RelatedProducts  products={similarProducts} />
    </div>
  )
}

export default ProductPage
import React, { useContext, useEffect, useState } from 'react'
import Style from './Orders.module.css'
import Loading from '../Loading/Loading'
import { OrderContext } from '../../Context/OrderContext'

export default function Orders() {

let {getUserOrders} = useContext(OrderContext);
let [userOrder,setUserOrder] = useState(null);
let [loading ,setLoading] = useState(false)

  async function getOrders(){
    let userId = localStorage.getItem("userId");
    console.log(userId);
    setLoading(true);
    let res = await getUserOrders(userId);
    setUserOrder(res?.data);
    console.log(res.data);
    setLoading(false);
  } 
  useEffect(()=>{
    getOrders();
  },[])
  return <>
  
  {loading ? <Loading/> : <div className='row   py-3 px-2 '>
    {userOrder?.map((ele,index)=><div key={index} >
    {ele.cartItems.map((product)=><div key={product._id} className='row  p-2 align-items-center'>
      <div className="col-md-1">
      <img src={product.product.imageCover} alt={product.product.title} className='w-100' />
      </div>
      <div className="col-md-11">
    <div className='d-flex align-items-center justify-content-between'>
        <div>
        <h4 className="h6">{product.product.brand.name.split(" ").slice(0,2).join(" ")}</h4>
        <h4 className="h6">{product.product.category.name.split(" ").slice(0,2).join(" ")}</h4>
        </div>
        <div>
        <h4 className="h6 text-main">Price: {product.price}</h4>
        <h4 className="h6">Count: {product.count}</h4>
        </div>
      </div>
      </div>
      </div>)}
      <div className="col-md-12 bg-main-light p-3">
      <h4 className="h6 fw-bolder text-center">Total Order Price: <span className='text-main'> {ele.totalOrderPrice}</span></h4>
      </div>
     

   </div>)}
  </div>}
    </>
  
}

import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import Loading from '../Loading/Loading';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
export default function Cart() {
  let { getUserLoggedCart , removeCartItem,updateProductQuantity,setCartCount,err,setErr,clearCart} = useContext(CartContext);
  const [cartDetails,setCartDetails] = useState(null);
 
async function getCart(){
let {data} = await getUserLoggedCart();
setErr('');
setCartDetails(data);

}
async function removeCartItemFunc(id) {
  let {data} = await removeCartItem(id);
  setCartDetails(data);
  // console.log(data);
  setCartCount(data.numOfCartItems)
}
async function updateProductQuantityFunc(id,count) {
  let {data} = await updateProductQuantity(id,count);
  setCartDetails(data);
}
async function removeCartFunc(){
  let {data} = await clearCart();
  if (data.message === "success") {
    setErr("cart is empty")
    setCartDetails(null);
    setCartCount(0);
    
  }
  console.log(data);
}

useEffect(()=>{
  getCart();
},[])

  return (
  <>
  <Helmet>
    <title>Cart</title>
   </Helmet>
   {err?<div className="alert alert-danger p-2">Your cart is empty</div>: cartDetails ?   <div className=" bg-main-light py-3 px-2">
  <h2 className="text-main fw-bolder">Shop Cart</h2>
  <h4 className="h6 text-main mb-3">
    Total Cart Items: {cartDetails.numOfCartItems}
  </h4>
  <h4 className="h6 text-main mb-3">
    Total Cart Price: {cartDetails.data.totalCartPrice}
  </h4>
  {cartDetails.data.products.map((product) => (
    <div key={product.product.id} className="row border-bottom p-2 align-items-center">
      <div className="col-md-1">
        <img
          src={product.product.imageCover}
          className="w-100"
          alt={product.title}
        />
      </div>
      <div className="col-md-11">
        <div className="d-flex justify-content-between align-items-center">
          <div>
             <h4 className="h6">{product.product.title.split(" ").slice(0,3).join(" ")}</h4>
             <h4 className="h6 text-main">Price: {product.price} EGP</h4>
             <button onClick={()=>removeCartItemFunc(product.product.id)} className="btn"><i className="fas fa-trash-can font-sm text-danger"></i> Remove</button>
          </div>
          <div>
            <button onClick={()=>updateProductQuantityFunc(product.product.id,product.count + 1)} className="btn btn-sm  btn-outline-success">+</button>
            <span className="mx-3">{product.count}</span>
            <button onClick={()=>updateProductQuantityFunc(product.product.id,product.count - 1)}  className="btn btn-sm  btn-outline-success">-</button>
          </div>
        </div>
      </div>
    </div>
  
  ))}
 <div className="d-flex justify-content-center">
  <div>
  <Link to={`/address`} className="btn btn-sm m-3 bg-main text-white px-4">Pay Online</Link>
  <button onClick={()=>removeCartFunc()} className="btn btn-sm m-3 bg-main text-white px-4 ">Clear all</button>
  </div>
 </div>
</div> : <Loading/>}
  
  </>
  );
}

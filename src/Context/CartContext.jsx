import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {

  const [cartCount,setCartCount] = useState(0);
  const [cartId,setCartId] = useState(null);
  const [err, setErr] = useState('');

  let userToken = localStorage.getItem("userToken");
  let headers = {
    token: userToken
  }

  function addToCart(productId) {
   return  axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: productId
      },
      {
        headers: headers
      }
    ).then((response)=> response)
    .catch((err)=> err);
  }
  // getCart
  function getUserLoggedCart(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers: {
          token: userToken,
        },
      }).then(res=>{
        // console.log(res);
        setCartCount(res.data.numOfCartItems);
        setCartId(res.data.data._id);
        return res;
      }).catch(err=> {
        console.log(err.response.data.message);
        setErr(err.response.data.message)
        return err;
      })
  }
  function removeCartItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: headers
    })
    .then((response)=> response)
    .catch((err)=> err);

  }
  function updateProductQuantity(productId ,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count}, {headers})
    .then((response)=> response)
    .catch((err)=> err);
  }
  function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
    .then((response)=> response)
    .catch((err)=> err);
  }
  // checkout session api
  function onlinePayment(idCart,url,values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${idCart}?url=${url}`,{shippingAddress: values},{headers})
    .then((res)=> res) 
    .catch((err)=> err)
  }

  useEffect(()=>{
    getUserLoggedCart();
    console.log("say cart");
  },[])
  return (
    <CartContext.Provider value={{ addToCart ,getUserLoggedCart,removeCartItem,updateProductQuantity,cartCount,setCartCount,onlinePayment,cartId,setCartId,err,setErr,clearCart}}>
      {props.children}
    </CartContext.Provider>
  );
}

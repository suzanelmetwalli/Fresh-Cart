import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let WishlistContext = createContext();

export default function WishlistContextProvider(props){
    const [wishListCount,setWishListCount] = useState(0);
    
    let userToken = localStorage.getItem("userToken");
    let headers = {
        token: userToken
      }
    

function addToWishlist(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId
    },{
        headers
    })
    .then((res)=> res)
    .catch((err)=>err)
}
 
function getLoggedUserWishlist(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
    .then((res)=> {
        // console.log("wishlist res", res.data.count);
        setWishListCount(res.data.count);
        return res
    })
    .catch((err)=>err)
}
function removeToWishlist(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
    .then((res)=> res)
    .catch((err)=>err)
}

useEffect(()=>{
    getLoggedUserWishlist();
    console.log("say wish");
  },[])


    return <WishlistContext.Provider value={{addToWishlist,getLoggedUserWishlist,removeToWishlist,wishListCount,setWishListCount}}>
        {props.children}
    </WishlistContext.Provider>
}

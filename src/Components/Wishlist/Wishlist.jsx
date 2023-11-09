import React, { useContext, useEffect, useState } from "react";
import Style from "./Wishlist.module.css";
import { useQuery } from "react-query";
import { WishlistContext } from "../../Context/WishlistContext";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  let { getLoggedUserWishlist,removeToWishlist,setWishListCount } = useContext(WishlistContext);
  const [listDetails,setlistDetails] = useState(null);
  const { addToCart, setCartCount } = useContext(CartContext);

  async function getWishList(){
    let {data} = await getLoggedUserWishlist();
    console.log(data?.data);
    setlistDetails(data.data);
    
    }

  async function getRemoveToWishlistFunc(productId,ele){
    let {data} = await removeToWishlist(productId);
    // console.log(data,"ff");
    if(data.status ==="success") {
      toast.success(data.message);
      ele.classList.replace("fas","fa-regular");
      setWishListCount(data.data.length);
      // set listDetails (but api not reply with array of wishlist ) so  ===
      getWishList();
    }else {
      toast.error(data.message);
    }
  }
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    console.log(response);
    if (response?.data.status === "success") {
      toast.success(response.data.message);
      setCartCount(response.data.numOfCartItems);
    } else {
      toast.error(response.data.message);
    }
  }
  useEffect(()=>{
    getWishList();
  },[])
  
  return (
    <>
       <Helmet>
    <title>Wishlist page</title>
   </Helmet>
      {!listDetails ? (
        <Loading />
      ) : (
        <div className="bg-main-light py-3 px-2">
        <h2 className="fw-bolder py-4">My Wish List:</h2>
        {listDetails?.map((product)=><div key={product._id} className="row border-bottom p-2 align-items-center">
        <div className="col-md-1">
        <img
          src={product.imageCover}
          className="w-100"
          alt={product.title}
        />
      </div>
      <div className="col-md-11">
      <div className="d-flex justify-content-between align-items-center">
        <div>
           <h4 className="h6">{product.title.split(" ").slice(0,3).join(" ")}</h4>
           <h4 className="h6 text-main">Price: {product.price} EGP</h4>
           <button onClick={(e)=>getRemoveToWishlistFunc(product._id,e.target)} className="btn"><i className="fas fa-trash-can font-sm text-danger"></i> Remove</button>
        </div>
        <div>
          <button onClick={()=>addProductToCart(product._id)} className="btn btn-sm  btn-outline-success">+ add to cart</button>
          
        </div>
      </div>
    </div>
          
          
          </div>)}
         
        </div>
      )}
    </>
  );
}

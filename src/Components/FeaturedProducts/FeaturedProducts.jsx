import React, { useEffect, useState, useContext } from "react";
import Style from "./FeaturedProducts.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { WishlistContext } from "../../Context/WishlistContext";
export default function FeaturedProducts() {
  const { addToCart, setCartCount } = useContext(CartContext);
  let {addToWishlist,setWishListCount} = useContext(WishlistContext);
  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isLoading, isError, isFetching, refetch } = useQuery(
    "FeaturedProducts",
    getFeaturedProducts,
    {
      cacheTime: 3000,
      refetchInterval: 5000,
      // enabled: false
    }
  );
  // call addToCartFun in Func
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    // console.log(response);
    if (response?.data.status === "success") {
      toast.success(response.data.message);
      setCartCount(response.data.numOfCartItems);
    } else {
      toast.error(response.data.message);
    }
  }
  // **********************************************
 async function getaddToWishlistFunc(productId,ele) {
  let {data} = await addToWishlist(productId)
  // console.log(data.data.length,"hh");
  if (data?.status ==="success") {
    toast.success(data.message);
        ele.classList.replace("fa-regular","fas");
        setWishListCount(data.data.length);

  }else{
    toast.error(data.message);
  }
 }


  //   const [products, setProducts] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);

  //  async function getFeaturedProducts(){
  //     setIsLoading(true);
  //     let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  //     setProducts(data.data);
  //     setIsLoading(false);
  //   }
  //   useEffect(()=>{
  //     getFeaturedProducts();
  //   },[])
  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          <div className="row gy-4">
            {data?.data.data.map((product) => (
              <div key={product._id} className="col-md-2">
                <div className="product py-3 px-2 position-relative">
                 <button onClick={(e)=>{
                  getaddToWishlistFunc(product._id,e.target);
                 }} className="btn position-absolute top-0 end-0" to="#">
                    <i className="fa-regular fa-heart text-main"></i>
                   </button>
                  <Link to={`/productDetails/${product._id}`}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100"
                    />
                    <span className="text-main font-sm fw-bolder">
                      {product.category.name}
                    </span>
                    <h3 className="h6">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between mt-2">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>{" "}
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProductToCart(product._id)}
                    className="btn bg-main text-white w-100 btn-sm mt-2"
                  >
                    add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

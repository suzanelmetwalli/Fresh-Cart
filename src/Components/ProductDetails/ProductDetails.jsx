import React, { useContext } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  const { addToCart, setCartCount } = useContext(CartContext);
  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let params = useParams();

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data, isLoading, isError } = useQuery("productDetails", () =>
    getProductDetails(params.id)
  );
  console.log(data?.data.data);

  // call addToCartFun in Func
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    // console.log(response);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      setCartCount(response.data.numOfCartItems);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <>
      <Helmet>
        <title>Details page</title>
      </Helmet>
      <div className="row align-items-center">
        <div className="col-md-4">
          <Slider {...settings}>
            {data?.data.data
              ? data?.data.data.images.map((image) => (
                  <img
                    key={data?.data.data.id}
                    src={image}
                    alt={data?.data.data.title}
                  />
                ))
              : ""}
          </Slider>
        </div>
        <div className="col-md-8">
          <h2 className="h5 fw-bolder">{data?.data.data.title}</h2>
          <p>{data?.data.data.description}</p>
          <h6>{data?.data.data.category.name}</h6>
          <div className="d-flex justify-content-between">
            <h6>{data?.data.data.price} EGP</h6>
            <span>
              <i className="fas fa-star rating-color"></i>{" "}
              {data?.data.data.ratingsAverage}
            </span>
          </div>
          <button
            onClick={() => addProductToCart(data?.data.data.id)}
            className="btn btn-sm text-white bg-main w-100 mt-2"
          >
            + add to cart
          </button>
        </div>
      </div>
    </>
  );
}

import React from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery("Categories", getCategories);

  return (
    <>
    <Helmet>
    <title>Category page</title>
   </Helmet>
      {data?.data.data ? (
        <div className="row gy-3">
          {data?.data.data.map((category) => (
            <div key={category._id} className="col-md-3">
              <Link to={`/categoryDetails/${category._id}`}>
                <div className="card">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-100"
                    height={200}
                  />
                  <h3 className="h6 p-3 text-center text-main">
                    {category.name}{" "} 
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
       <Loading/>
      )}
    </>
  );
}

import React from "react";
import Style from "./CategoryDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";
export default function CategoryDetails() {
  let params = useParams();
  // console.log(params);
  function getCategoryDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }
  let { data } = useQuery("CategoryDetails", () =>
    getCategoryDetails(params.id)
  );
  console.log(data?.data.data);
  return (
    <>
      <Helmet>
        <title>Category Details page</title>
      </Helmet>
      {data?.data.data ? (
        <div className="row align-items-center bg-main-light">
          <div className="col-md-4">
            <img
              src={data?.data.data.image}
              alt={data?.data.data.name}
              className="w-100 py-3"
            />
          </div>
          <div className="col-md-8">
            <h3 className="h5 fw-bolder">{data?.data.data.name}</h3>
            <h3 className="h5">Sub Categories:</h3>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

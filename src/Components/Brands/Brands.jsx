import React from 'react'
import Style from './Brands.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';
export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data } = useQuery("Categories", getBrands);
  console.log(data?.data.data);
  return <>
  <Helmet>
    <title>Brands page</title>
   </Helmet>
      {data?.data.data ? <div className='row gy-3'>
      {data?.data.data.map((brand)=> <div key={brand._id} className='col-md-3'>
      <Link to={`/brandDetails/${brand._id}`}>
      <div className="card">
      <img src={brand.image} alt={brand.name} className='w-100' />
      <h3 className='h5 p-3 text-main'> {brand.name} </h3>
      </div>
      </Link>
        </div>)}
      </div> : <Loading/>}
    </>
  
}

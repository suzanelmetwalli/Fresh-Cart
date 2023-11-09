import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from 'react-slick';
export default function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    
  };
  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
   }
   let {data} = useQuery("CategorySlider" ,getCategories)
  //  console.log(data?.data.data);


  return <div className='container d-md-block d-none my-3'>
        <h3 className='my-3'>Shop Popular Categories</h3>
          <Slider {...settings} className='my-4' >
          {data?.data.data? data?.data.data.map((category)=> <div key={category._id}  >
            <img height={200} src={category.image} alt={category.name} className='w-100'></img>
            <h6 className='mt-2'>{category.name}</h6>
            </div>) : ''}
          </Slider>

    
     
    </div>
  
}

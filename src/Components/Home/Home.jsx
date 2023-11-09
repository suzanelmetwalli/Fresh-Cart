import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';




export default function Home() {

  return <>
    <Helmet>
    <title>Fresh Cart</title>
   </Helmet>
        <MainSlider/>
        <CategorySlider/>
       <h1 className="py-3">Featured Products</h1>
      <FeaturedProducts/>
    </>
  
}

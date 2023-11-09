import React from 'react';
import Slide1 from '../../assets/images/slider-image-1.jpeg';
import Slide2 from '../../assets/images/slider-image-2.jpeg';
import Slide3 from '../../assets/images/slider-image-3.jpeg';
import Blog1 from '../../assets/images/grocery-banner.png';
import Blog2 from '../../assets/images/grocery-banner-2.jpeg';
import Slider from "react-slick";
import Style from './MainSlider.module.css'
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return <>
    <div className="row gx-0 d-md-flex d-none">
      <div className="col-md-9">
        <Slider {...settings}>
        <img src={Slide1} className='w-100' alt="slide1" height={400} />
        <img src={Slide2} className='w-100' alt="slide2" height={400}  />
        <img src={Slide3} className='w-100' alt="slide3" height={400} />
        </Slider>
      </div>
      <div className="col-md-3">
      <img src={Blog1} className='w-100' alt="blog1" height={200}  />
      <img src={Blog2} className='w-100' alt="blog2" height={200} />
      </div>
    </div>

  
  </>


  
  
}

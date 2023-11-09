import React from 'react'
import img from '../../assets/images/notfound.jpg'
import Style from './NotFound.module.css'
export default function NotFound() {
  return <>
     <div className="container w-25 py-5">
     <img src={img} alt="error image" className='w-100' /></div>
    </>
  
}

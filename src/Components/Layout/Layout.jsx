import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Offline, Online } from "react-detect-offline";
import { Outlet } from 'react-router-dom'


export default function Layout() {

  return <>
      <Navbar/>
      <div className="container pt-5 my-5 min-vh-100 ">
        <Outlet />
      </div>
        <Offline>
          <div className="network">
          <i className='fas fa-wifi'></i>
           Only shown offline (surprise!)
          </div>
        </Offline>
      <Footer/>
    </>
  
}

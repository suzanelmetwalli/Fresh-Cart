import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
export default function Loading() {
  return <>
  <div className="d-flex justify-content-center align-items-center min-vh-100">
  <BallTriangle            
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperClass={{}}
    wrapperStyle=""
    visible={true}
  />
</div>
    </>
  
}

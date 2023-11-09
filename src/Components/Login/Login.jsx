import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, json, useNavigate } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
import { UserContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'
import jwtDecode from "jwt-decode";

export default function Login() {


 let navigate = useNavigate()
const [error, setError] = useState(null);
const [isLoading, setisLoading] = useState(false);
let {setuserToken,setuserData,userData,setUserId} = useContext(UserContext);

  async function submitLogin(values){
    setisLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((err)=>{
      setisLoading(false);
      setError(err.response.data.message);
    })
    if (data.message === "success" ) {
      setisLoading(false);
      localStorage.setItem("userToken",data.token);
      setuserToken(data.token);
      localStorage.setItem("userData",JSON.stringify(data.user));
      setuserData(JSON.parse(localStorage.getItem("userData")));
      let decoded = jwtDecode(localStorage.getItem("userToken"));
     localStorage.setItem("userId",decoded.id)
      // to home
        navigate("/")
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: submitLogin
  })

  return <>
  <Helmet>
    <title>Login page</title>
   </Helmet>
    <div className="container py-4 w-75 mx-auto">
     {error?<div className="alert alert-danger p-2">{error}</div>: ''}
      <h3>Login Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">email:</label>
        <input type="email" id="email"  className='form-control mb-3' name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger p-2">{formik.errors.email}</div>: '' }
        <label htmlFor="password">password:</label>
        <input type="password" id="password"  className='form-control mb-3'  name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger p-2">{formik.errors.password}</div>: '' }
        <div className='d-flex justify-content-between align-items-center mt-5'>
        <Link to={'/forgetpassword'} className='fw-bolder'>Forget your Password ?</Link>
        {isLoading?
          <button className='btn bg-main text-white'>
          <Audio
          height="20"
          width="70"
          color="white"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
       </button>
       :<button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white'>Login</button>}
        </div>
      </form>
    </div>
    </>
  
}

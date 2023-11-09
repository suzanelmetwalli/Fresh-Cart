import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
export default function Register() {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(6, 'Name must be at least 6 characters'),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('rePassword is required'),
    phone: Yup.string().matches(/^(\+(?=2))?2?01(?![3-4])[0-5]{1}[0-9]{8}$/, 'Invalid phone number').required('Phone number is required'),
  })

   async function submitRegister(values){
    console.log(values);
    setisLoading(true);
    // console.log("you have registered");
    let response =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .catch((err)=>{
        setisLoading(false);
        console.log(err);
        // console.log(err.response.data.message);
        setError(err.response.data.message);
      }
    )
    // console.log(response.data);
    if (response.data.message === "success") {
        setisLoading(false)
        navigate("/login");
    }
   
  }

  let formik = useFormik({
    initialValues: {
      name:'',
      email:'',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: validationSchema,
    // or validationSchema,
    onSubmit: submitRegister

  })
  return <>
  <Helmet>
    <title>Register page</title>
   </Helmet>
      <div className="container py-4 w-75 mx-auto">
       {error?<div className="alert alert-danger p-2"> {error}</div>: ''}
        <h3>Register Now</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">name:</label>
          <input type="text" id="name" className='form-control mb-3' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-2 ">{formik.errors.name}</div>: ''}
          <label htmlFor="email">email:</label>
          <input type="email" id="email"  className='form-control mb-3' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 ">{formik.errors.email}</div>: ''}
          <label htmlFor="password">password:</label>
          <input type="password" id="password"  className='form-control mb-3' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 ">{formik.errors.password}</div>: ''}
          <label htmlFor="rePassword">rePassword:</label>
          <input type="password" id="rePassword"  className='form-control mb-3' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-2 ">{formik.errors.rePassword}</div>: ''}
          <label htmlFor="phone">phone:</label>
          <input type="tel" id="phone"  className='form-control mb-3' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2 ">{formik.errors.phone}</div>: ''}
          {isLoading?
            <button className='btn bg-main text-white ms-auto d-block'>
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
          :<button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white ms-auto d-block'>Register</button> }
          
        </form>
      </div>
    </>
  
}

import React, { useContext, useState } from 'react'
import Style from './Address.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
import { Audio } from 'react-loader-spinner';
export default function Address() {
  const [isLoading, setisLoading] = useState(false);
  let {onlinePayment,cartId} = useContext(CartContext);
  console.log(cartId);

  async function submitAddressForm(values){
    setisLoading(true);
    let {data} = await onlinePayment(cartId,'http://localhost:5173',values);
    setisLoading(false);
    window.location.href = data.session.url
  }
  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: submitAddressForm
  })
  return <>
     <div className="row">
      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>
        <label htmlFor="details">Details :</label>
        <input type="text" id='details' className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <label htmlFor="phone">Phone :</label>
        <input type="tel" id= "phone" className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <label htmlFor="city">City :</label>
        <input type="text" id='city' className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {isLoading?
          <button className='btn bg-main text-white w-25 text-center'>
          <Audio
          height="20"
          width="70"
          color="white"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
       </button>:<button type='submit' className='btn btn-sm bg-main text-white w-25'>Pay Now</button>}
      </form>
     </div>
    </>
  
}

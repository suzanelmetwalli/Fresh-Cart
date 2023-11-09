import React, { useContext } from 'react'
import Style from './Profile.module.css'
import { Helmet } from 'react-helmet';
import { UserContext } from '../../Context/UserContext';

export default function Profile() {

  let {userData} = useContext(UserContext);
  return <>
  <Helmet>
    <title>Profile</title>
   </Helmet>
    <h1>Hello : {userData?.name}</h1>
    <h1>Your Email : {userData?.email}</h1>
    </>
  
}

import axios from "axios";
import { createContext, useState } from "react";


export let OrderContext = createContext();

export default function OrderContextProvider(props){

function getUserOrders(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    .then((res)=> res)
    .catch((err)=>err)
}


    return <OrderContext.Provider value={{getUserOrders}}>
        {props.children}
    </OrderContext.Provider>
}

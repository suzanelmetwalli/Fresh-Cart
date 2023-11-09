import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Cart from "./Components/Cart/Cart" 
import Orders from "./Components/Orders/Orders" 
import Address from "./Components/Address/Address"
import Home from "./Components/Home/Home"
import Categories from "./Components/Categories/Categories"
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails"
import Brands from "./Components/Brands/Brands"
import BrandDetails from "./Components/BrandDetails/BrandDetails"
import Products from "./Components/Products/Products"
import ProductDetails from "./Components/ProductDetails/ProductDetails"
import Login from "./Components/Login/Login"
import Wishlist from "./Components/Wishlist/Wishlist"
import Register from "./Components/Register/Register"
import NotFound from "./Components/NotFound/NotFound"
import { useContext, useEffect } from "react"
import { UserContext } from "./Context/UserContext"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import { Toaster } from 'react-hot-toast';
import Profile from "./Components/Profile/Profile"
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword"
import VerifyPassword from "./Components/VerifyPassword/VerifyPassword"
import ResetPassword from "./Components/ResetPassword/ResetPassword"


function App() {
  let {setuserToken,setuserData} = useContext(UserContext);


  // handle refresh
  useEffect(()=>{
    if(localStorage.getItem("userToken") !== null) {
      setuserToken(localStorage.getItem("userToken"));
    }
    if(localStorage.getItem("userData") !== null) {
      setuserData(JSON.parse(localStorage.getItem("userData")));
    }
  },[])

  let routers = createBrowserRouter([
    {path:"/" , element: <Layout/>, children: [
      { index: true , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path:"cart" , element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
      {path:"address" , element: <ProtectedRoute> <Address/> </ProtectedRoute>},
      {path:"allorders" , element: <ProtectedRoute> <Orders/> </ProtectedRoute>},
      {path:"categories" , element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
      {path: "categoryDetails/:id" , element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
      {path:"brands" , element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
      {path: "brandDetails/:id" , element:<ProtectedRoute><BrandDetails/></ProtectedRoute>},
      {path:"profile" , element: <ProtectedRoute> <Profile/> </ProtectedRoute>},
      {path:"wishlist" , element: <ProtectedRoute> <Wishlist/> </ProtectedRoute>},
      {path:"products" , element: <ProtectedRoute> <Products/> </ProtectedRoute>},
      {path:"productDetails/:id" , element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
      {path:"login" , element: <Login/>},
      {path:"register" , element: <Register/>},
      {path:"forgetpassword" , element: <ForgetPassword/>},
      {path:"verifypassword" , element: <VerifyPassword/>},
      {path:"ResetPassword" , element: <ResetPassword/>},
      {path:"*" , element: <NotFound/>},
    ]}
  ])

  return <>
 
    <RouterProvider router={routers}>
    </RouterProvider>
    <Toaster/>

  
  </>
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import UserContextProvider from './Context/UserContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import CartContextProvider from './Context/CartContext.jsx'
import OrderContextProvider from './Context/OrderContext.jsx';
import WishlistContextProvider from './Context/WishlistContext.jsx';

let queryClient = new QueryClient;

ReactDOM.createRoot(document.getElementById('root')).render(
<QueryClientProvider client={queryClient}>
<WishlistContextProvider>
    <OrderContextProvider>
    <CartContextProvider>
    <UserContextProvider>
    <App />
    </UserContextProvider>
    </CartContextProvider>
    </OrderContextProvider>
    </WishlistContextProvider>
</QueryClientProvider>

    
)

import React, { useContext } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import Style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
export default function Navbar() {
  let navigate = useNavigate();
  let { userToken ,setuserToken} = useContext(UserContext);
  let { wishListCount} = useContext(WishlistContext);

  let {cartCount} = useContext(CartContext);
  function logout(){
    localStorage.removeItem("userToken");
    setuserToken(null);
    navigate("/login");

  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top py-3">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <img src={logo} alt="logo image" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              {userToken ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="brands">
                      Brands
                    </Link>
                  </li>
                  {" "}
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
           {userToken?  <li className="nav-item">
                <Link className="nav-link position-relative" to="wishlist">
                  <i className="fas fa-heart text-success"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {wishListCount}
                  <span className="visually-hidden">unread messages</span>
                </span>
                </Link>
              </li>: ''}
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <i className="fab fa-facebook"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <i className="fab fa-linkedin"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <i className="fab fa-tiktok"></i>
                </Link>
              </li>
              {userToken ? <>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="cart">
                     <i className="fa-solid fa-cart-shopping"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        {cartCount}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                   
                  </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="profile">
              <i className="fa-solid fa-user"></i>
              </Link>
            </li>
              <li className="nav-item">
              <span onClick={()=>{logout()}}  className="nav-link cursor-pointer">Logout</span>
            </li>
                </>
               
              : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

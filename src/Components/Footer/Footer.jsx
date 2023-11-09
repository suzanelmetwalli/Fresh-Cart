import React from "react";
import Style from "./Footer.module.css";
export default function Footer() {
  return (
    <div className="bg-main-light ">
      <div className="container py-4">
        <h3>Get The FreshCart App</h3>
        <p>
          we will send you a link, open it in your phone to download the app
        </p>
        <div className="row gy-3">
          <div className="col-md-10">
            <input
              type="email"
              placeholder="Email.."
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <button className="btn bg-main text-white w-100">
              Share App Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Style from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
export default function ForgetPassword() {
  let [loading, setLoading] = useState(false);
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter Invalid Email"),
  });

  let navigate = useNavigate();
  function forgetpassword(values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((res) => res)
      .catch((err) => err);
  }
  async function submitForm(values) {
    let { data } = await forgetpassword(values);
    console.log(data);
    if (data.statusMsg === "success") {
      toast.success(data.message);
      navigate("/verifypassword");
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });
  return (
    <>
      <Helmet>
        <title>Forget Password page</title>
      </Helmet>
      <h3 className="fw-bolder mb-4">
        Please Enter Email to Send Verification Code
      </h3>
      <form onSubmit={formik.handleSubmit}>
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger p-2">{formik.errors.email}</div>
        ) : (
          ""
        )}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className="btn btn-sm bg-main text-white w-25 mt-2 fw-bolder"
        >
          Send
        </button>
      </form>
    </>
  );
}

import React from "react";
import Style from "./ResetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ResetPassword() {
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  async function resetPassword(values) {
    return await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
  async function submitForm(values) {
    let { data } = await resetPassword(values);
    console.log(data);
    if(data.token) {
        navigate('/login');
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });
  return (
    <>
      <Helmet>
        <title>Reset Password page</title>
      </Helmet>
      <h3>Reset Password Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          className="form-control mb-3"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger p-2">{formik.errors.email}</div>
        ) : (
          ""
        )}
        <label htmlFor="newPassword">password:</label>
        <input
          type="password"
          id="newPassword"
          className="form-control mb-3"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <div className="alert alert-danger p-2">{formik.errors.newPassword}</div>
        ) : (
          ""
        )}
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className="btn bg-main text-white"
        >
          Reset Password
        </button>
      </form>
    </>
  );
}

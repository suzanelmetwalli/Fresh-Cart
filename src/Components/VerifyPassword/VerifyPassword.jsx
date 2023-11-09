import React, { useState } from "react";
import Style from "./VerifyPassword.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
export default function VerifyPassword() {
  const [error, setError] = useState("");
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    resetCode: Yup.string().required("Code is required")
    // .matches(/^[0-9]+$/,"Must be numbers only")
  });

  function verifypassword(values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((res) => res)
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        return err;
      });
  }
  async function submitForm(values) {
    let { data } = await verifypassword(values);
    console.log(data);
    if (data.status === "Success") {
      navigate("/resetpassword");
    }
  }
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });
  return (
    <>
      <Helmet>
        <title>Verify Password page</title>
      </Helmet>
      <h3 className="fw-bolder mb-4">please enter your verification code</h3>
      {error ? <div className="alert alert-danger p-2">{error}</div> : ""}
      <form onSubmit={formik.handleSubmit}>
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <div className="alert alert-danger p-2">
            {formik.errors.resetCode}
          </div>
        ) : (
          ""
        )}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingInput">Code</label>
        </div>
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className="btn btn-sm bg-main text-white w-25 mt-2 fw-bolder"
        >
          Verify
        </button>
      </form>
    </>
  );
}

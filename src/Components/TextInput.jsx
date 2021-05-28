import React from "react";
import { ErrorMessage, useField } from "formik";
import Checked from "./icons/Checked";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="cart-input-form-block">
      <div className="cart-input-label-group">
        <label className="form-label" htmlFor={field.name}>
          {label}
        </label>

        <input
          // onBlur={handleBlur}
          // onChange={handleChange}
          // value={values.firstName}
          className={`form-control-input ${
            meta.touched && meta.error && "is-invalid"
          } ${meta.touched && !meta.error && "valid"}`}
          {...props}
          {...field}
          autoComplete="off"
        />
      </div>
      <ErrorMessage component="div" name={field.name} className="form-error" />
      {meta.touched && !meta.error && <Checked />}
    </div>
  );
};

export default TextInput;

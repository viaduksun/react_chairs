import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import EmptyCart from "../Components/icons/EmptyCart";
import {
  cartDecrement,
  cartIncrement,
  cartModalRemoveOpen,
  checkout,
} from "../store/cart/actions";
import TextInput from "../Components/TextInput";

const Cart = () => {
  // ===REDUX================================

  const dispatch = useDispatch();
  const cartFromRedux = useSelector((state) => state.cart.cart);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  // console.log("cartFromRedux", cartFromRedux);
  // =================================================================

  const orderArr = cartFromRedux.map((item) => {
    let tempItem = {};
    tempItem[item.name] = item.count;
    return tempItem;
  });

  const orderObj = orderArr.reduce(function (result, current) {
    return Object.assign(result, current);
  }, {});
  orderObj.totalCount = totalCount;
  orderObj.totalPrice = totalPrice;

  const handleSubmitForm = (values, { setSubmitting }) => {
    const { firstName, lastName, age, address, email, phone } = values;
    // const isPasswordMatch = newPassword === confirmPassword;
    const isFormValid =
      firstName && lastName && age && address && email && phone;

    if (isFormValid) {
      setSubmitting(true);

      setTimeout(() => {
        setSubmitting(false);
        const form = {
          firstName: values.firstName,
          lastName: values.lastName,
          age: values.age,
          address: values.address,
          phone: values.phone,
        };

        dispatch(checkout(form, orderObj));
      }, 2000);
    }
  };

  const CartProducts = cartFromRedux.map((product) => (
    <div className="cartPage-item" key={product.id}>
      <div className="cartPage-img">
        <img src={product.image} alt="product" />
      </div>
      <div className="cartPage-item-content">
        <div className="cartPage-item-description title">{product.name}</div>
        <div className="cartPage-item-description">Color: {product.color}</div>
        <div className="cartPage-item-description">
          Article: {product.article}
        </div>
        <div className="cartPage-item-price">Price: {product.price}</div>
      </div>
      <div className="cartPage-btn-block">
        <h2 className="cartPage-counter-title">Products in cart</h2>
        <div className="cartPage-counter-block">
          <button
            className="cartPage-btn decrement"
            onClick={() => dispatch(cartDecrement(product.id))}
          >
            -
          </button>
          <span className="cartPage-productCount">{product.count}</span>
          <button
            className="cartPage-btn increment"
            onClick={() => dispatch(cartIncrement(product.id))}
          >
            +
          </button>
        </div>
        <button
          className="cartPage-btn-delete"
          onClick={() => {
            dispatch(cartModalRemoveOpen(product));
          }}
        >
          Delete from cart
        </button>
      </div>
    </div>
  ));

  const validate = Yup.object({
    firstName: Yup.string()
      .max(10, "Must be 10 characters or less")
      .required("First name is required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Last name is required"),
    age: Yup.number()
      .max(99, "Must be 2 characters or less")
      .required("Age is required"),
    address: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Address is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Phone is required"),
  });

  return (
    <div className="cart-body">
      {cartFromRedux.length === 0 ? (
        <div className="empty-cart">
          Your cart is empty
          <EmptyCart />
        </div>
      ) : (
        <>
          <div className="cart-body-title">Products in cart</div>
          <div className="cart-products-field">{CartProducts}</div>
          <div className="cart-body-totalBlock">
            <div className="cart-body-totalBlock-data">
              <span className="total-title">Total price:</span>
              <span className="total-amount">{totalPrice}</span>
            </div>
            <div className="cart-body-totalBlock-data">
              <span className="total-title">Total count:</span>
              <span className="total-amount">{totalCount}</span>
            </div>
          </div>
          <div className="cart-body-form">
            <h2 className="cart-form-header">
              Please, fill the form to confirm your order
            </h2>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                age: "",
                address: "",
                email: "",
                phone: "",
              }}
              onSubmit={handleSubmitForm}
              validationSchema={validate}
            >
              {(formik) => {
                return (
                  <Form className="cart-form">
                    <div className="cart-inputs-area">
                      <TextInput
                        label="First name"
                        name="firstName"
                        type="text"
                      />
                      <TextInput
                        label="Last name"
                        name="lastName"
                        type="text"
                      />
                      <TextInput label="Age" name="age" type="number" />
                      <TextInput label="Address" name="address" type="text" />
                      <TextInput label="Email" name="email" type="email" />
                      <TextInput label="Phone" name="phone" type="text" />
                      {/* <div className="cart-input-form-block">
                        
                        <div className="cart-input-label-group">
                          <label className="form-label" htmlFor="firstName">
                            Your first name
                          </label>
                          <input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            className={`form-control-input ${
                              touched.firstName && !errors.firstName && `valid`
                            }`}
                            name="firstName"
                            id="firstName"
                            type="text"
                          />
                        </div>
                        {touched.firstName && errors.firstName && (
                          <div className="form-error">{errors.firstName}</div>
                        )}
                        {touched.firstName && !errors.firstName && <Checked />}
                      </div>
                      <div className="cart-input-form-block">
                        <div className="cart-input-label-group">
                          <label className="form-label" htmlFor="secondName">
                            Your second name
                          </label>
                          <input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.secondName}
                            className={`form-control-input ${
                              touched.secondName &&
                              !errors.secondName &&
                              `valid`
                            }`}
                            name="secondName"
                            id="secondName"
                            type="text"
                          />
                        </div>
                        {touched.secondName && errors.secondName && (
                          <div className="form-error">{errors.secondName}</div>
                        )}
                        {touched.secondName && !errors.secondName && (
                          <Checked />
                        )}
                      </div>

                      <div className="cart-input-form-block">
                        <div className="cart-input-label-group">
                          <label className="form-label" htmlFor="age">
                            Your age
                          </label>
                          <input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.age}
                            className={`form-control-input ${
                              touched.age && !errors.age && `valid`
                            }`}
                            name="age"
                            id="age"
                            type="text"
                          />
                        </div>
                        {touched.age && errors.age && (
                          <div className="form-error">{errors.age}</div>
                        )}
                        {touched.age && !errors.age && <Checked />}
                      </div>

                      <div className="cart-input-form-block">
                        <div className="cart-input-label-group">
                          <label className="form-label" htmlFor="address">
                            Delivery address
                          </label>
                          <input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.address}
                            className={`form-control-input ${
                              touched.address && !errors.address && `valid`
                            }`}
                            name="address"
                            id="address"
                            type="text"
                          />
                        </div>
                        {touched.address && errors.address && (
                          <div className="form-error">{errors.address}</div>
                        )}
                        {touched.address && !errors.address && <Checked />}
                      </div>

                      <div className="cart-input-form-block">
                        <div className="cart-input-label-group">
                          <label className="form-label" htmlFor="phone">
                            Your cell phone number
                          </label>
                          <input
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phone}
                            className={`form-control-input ${
                              touched.phone && !errors.phone && `valid`
                            }`}
                            name="phone"
                            id="phone"
                            type="text"
                          />
                        </div>
                        {touched.phone && errors.phone && (
                          <div className="form-error">{errors.phone}</div>
                        )}
                        {touched.phone && !errors.phone && <Checked />}
                      </div> */}
                    </div>
                    {/* {errors.generalForm && (
                      <div className="form-error">{errors.generalForm}</div>
                    )} */}
                    <div className="form-btn-group">
                      <button
                        type="submit"
                        className="btn cart-body-order"
                        // disabled={isSubmitting}
                      >
                        Checkout
                      </button>
                      <button
                        type="reset"
                        className="btn cart-body-order reset"
                      >
                        Reset
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};
// {
//   values,
//   errors,
//   touched,
//   isSubmitting,
//   handleChange,
//   handleBlur,
//   handleSubmit,
// }
export default Cart;

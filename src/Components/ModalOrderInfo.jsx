import React from "react";
import PropTypes from "prop-types";
import { modalOrderInfoClose } from "../store/cart/actions";
import { useDispatch, useSelector } from "react-redux";

const ModalOrderInfo = ({ closeButton, text, actions }) => {
  const userInfo = useSelector((state) => state.cart.userInfo);
  const orderInfo = useSelector((state) => state.cart.orderInfo);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="modal-cover"
        onClick={(event) => {
          if (event.target.classList.contains("modal-cover")) {
            event.target.classList.add("modal-cover-hide");
            dispatch(modalOrderInfoClose());
          }
        }}
      ></div>
      <div className="modal-body">
        <div className="modal-header">
          {closeButton && (
            <div
              className="modal-close"
              onClick={() => dispatch(modalOrderInfoClose())}
            ></div>
          )}
          <p>Order # 3444388</p>
        </div>
        <div className="modal-text">
          <p className="order-main-text">
            {userInfo.firstName}, thank you for your order!
          </p>
          <p className="order-comments">Checkout your order data: </p>
          <div className="order-data-item">
            <p className="order-data-key">First name:</p>
            <p className="order-data-value">{userInfo.firstName}</p>
          </div>
          <div className="order-data-item">
            <p className="order-data-key">Second name:</p>
            <p className="order-data-value">{userInfo.lastName}</p>
          </div>
          <div className="order-data-item">
            <p className="order-data-key">Age:</p>
            <p className="order-data-value">{userInfo.age}</p>
          </div>
          <div className="order-data-item">
            <p className="order-data-key">Address:</p>
            <p className="order-data-value">{userInfo.address}</p>
          </div>
          <div className="order-data-item">
            <p className="order-data-key">Phone:</p>
            <p className="order-data-value">{userInfo.phone}</p>
          </div>
          <div className="order-data-item">
            <p className="order-data-key">Total items:</p>
            <p className="order-data-value">{orderInfo.totalCount}</p>
          </div>
          <div className="order-data-item">
            <p className="order-data-key">Total to pay:</p>
            <p className="order-data-value">{orderInfo.totalPrice}</p>
          </div>
        </div>
        <div className="modal-actions">{actions}</div>
      </div>
    </>
  );
};
ModalOrderInfo.propTypes = {
  closeButton: PropTypes.bool,
  onModalClose: PropTypes.func,
  actions: PropTypes.node.isRequired,
};

export default ModalOrderInfo;

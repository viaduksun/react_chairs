import React from "react";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../Components/icons/EmptyCart";
import {
  cartDecrement,
  cartIncrement,
  cartModalRemoveOpen,
} from "../store/cart/actions";

const Cart = () => {
  // ===REDUX================================

  const dispatch = useDispatch();
  const cartFromRedux = useSelector((state) => state.cart.cart);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  // console.log("cartFromRedux", cartFromRedux);
  // =================================================================

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
          <div className="cart-body-footer">
            <div className="cart-body-totalBlock Price">
              <span className="total-title">Total price:</span>
              <span className="total-amount">{totalPrice}</span>
            </div>
            <div className="cart-body-totalBlock count">
              <span className="total-title">Total count:</span>
              <span className="total-amount">{totalCount}</span>
            </div>
            <button className="btn cart-body-order">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;

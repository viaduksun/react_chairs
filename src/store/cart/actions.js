import * as type from "./types";

export const initialCart = (productsFromLocal) => ({
  type: "INITIAL_CART",
  payload: productsFromLocal,
});
export const addToCartAction = (product) => ({
  type: type.SET_CART,
  payload: { product: product },
});
export const openModaladdToCartAction = (product) => ({
  type: type.MODAL_SET_CART,
  payload: { product: product },
});
export const closeModaladdToCartAction = () => ({
  type: type.MODAL_SET_CART_CLOSE,
});
export const setTotalProductCount = (count) => ({
  type: type.SET_TOTAL_COUNT,
  payload: count,
});
export const setTotalProductPrice = (price) => ({
  type: type.SET_TOTAL_PRICE,
  payload: price,
});
export const cartIncrement = (id) => ({
  type: type.CART_INCREMENT,
  payload: { id: id },
});
export const cartDecrement = (id) => ({
  type: type.CART_DECREMENT,
  payload: { id: id },
});
export const cartModalRemoveOpen = (product) => ({
  type: type.CART_MODAL_REMOVE_OPEN,
  payload: { product: product },
});
export const cartModalRemoveClose = () => ({
  type: type.CART_MODAL_REMOVE_CLOSE,
});
export const cartProductRemove = (product) => ({
  type: type.CART_PRODUCT_REMOVE,
  payload: { product: product },
});

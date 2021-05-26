import {
  SET_CART,
  INITIAL_CART,
  MODAL_SET_CART,
  MODAL_SET_CART_CLOSE,
  SET_TOTAL_COUNT,
  SET_TOTAL_PRICE,
  CART_INCREMENT,
  CART_DECREMENT,
  CART_MODAL_REMOVE_OPEN,
  CART_PRODUCT_REMOVE,
  CART_MODAL_REMOVE_CLOSE,
  CART_CLEAR,
  MODAL_ORDER_INFO,
  MODAL_ORDER_INFO_CLOSE,
  USER_INFO,
  ORDER_INFO,
} from "./types";

const initialState = {
  cart: [],
  addToCartModalisOpened: false,
  cartModalRemoveOpen: false,
  modalOrderInfo: false,
  clickedProduct: {},
  totalCount: null,
  totalPrice: null,
  userInfo: {},
  orderInfo: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_CART:
      return { ...state, cart: action.payload };
    case SET_CART:
      const cartProduct = action.payload.product;
      // Adding a new key for initial OBJ = count: 1
      cartProduct.count = 1;

      let newCartArr = [];
      let cartMatches = state.cart.find((item) => item.id === cartProduct.id);
      if (cartMatches) {
        newCartArr = state.cart.map((item) => {
          if (item.id === cartProduct.id) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
      } else {
        newCartArr = [cartProduct, ...state.cart];
      }

      return {
        ...state,
        cart: newCartArr,
        addToCartModalisOpened: false,
        clickedProduct: cartProduct,
      };
    case MODAL_SET_CART:
      return {
        ...state,
        addToCartModalisOpened: true,
        clickedProduct: action.payload.product,
      };
    case MODAL_SET_CART_CLOSE:
      return { ...state, addToCartModalisOpened: false };
    case SET_TOTAL_COUNT:
      return { ...state, totalCount: action.payload };
    case SET_TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };
    case CART_INCREMENT:
      const newCartContent = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      return { ...state, cart: newCartContent };

    case CART_DECREMENT:
      const newCartContentAfterDecrement = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
      return { ...state, cart: newCartContentAfterDecrement };
    case CART_MODAL_REMOVE_OPEN:
      return {
        ...state,
        cartModalRemoveOpen: true,
        clickedProduct: action.payload.product,
      };
    case CART_MODAL_REMOVE_CLOSE:
      return { ...state, cartModalRemoveOpen: false };

    case CART_PRODUCT_REMOVE:
      const newCartProducts = state.cart.filter(
        (product) => product.id !== action.payload.product.id
      );
      return { ...state, cart: newCartProducts, cartModalRemoveOpen: false };
    case CART_CLEAR:
      return { ...state, cart: [] };
    case USER_INFO:
      return { ...state, userInfo: action.payload.userInfo };
    case ORDER_INFO:
      return { ...state, orderInfo: action.payload.orderInfo };
    case MODAL_ORDER_INFO:
      return { ...state, modalOrderInfo: true };
    case MODAL_ORDER_INFO_CLOSE:
      return { ...state, modalOrderInfo: false };
    default:
      return state;
  }
};
export default rootReducer;

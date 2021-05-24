import { LOADING_PRODUCTS, SAVE_PRODUCTS } from "./types";

const initialState = {
  isLoading: false,
  products: [],
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return { ...state, isLoading: action.payload };
    case SAVE_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
export default generalReducer;

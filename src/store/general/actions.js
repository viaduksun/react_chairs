import * as type from "./types";
import getProducts from "../../api/getProducts";

export const loadProducts = () => (dispatch) => {
  dispatch({ type: type.LOADING_PRODUCTS, payload: true });
  getProducts().then((result) => {
    dispatch({ type: type.SAVE_PRODUCTS, payload: result });
    dispatch({ type: type.LOADING_PRODUCTS, payload: false });
  });
};

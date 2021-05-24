import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import generalReducer from "./general/generalReducer";
import cartReducer from "./cart/cartReducer";
import favoritesReduser from "./favorites/favoritesReducer";

import thunk from "redux-thunk";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

const rootReducer = combineReducers({
  general: generalReducer,
  favorites: favoritesReduser,
  cart: cartReducer,
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), devTools)
);

export default store;

import * as type from "./types";

export const initialFavorites = (favoritesFromLocal) => ({
  type: type.INITIAL_FAVORITES,
  payload: favoritesFromLocal,
});

export const handleFavorites = (product) => ({
  type: type.SET_FAVORITES,
  payload: product,
});

import { SET_FAVORITES, INITIAL_FAVORITES } from "./types";

const initialState = [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_FAVORITES:
      return action.payload;
    case SET_FAVORITES:
      const newFavorite = action.payload;
      if (state.length === 0) {
        return [newFavorite];
      } else {
        const existFavorite = state.find(
          (favItem) => favItem.id === newFavorite.id
        );
        if (existFavorite) {
          const newFavoritesArr = state.filter(
            (item) => item.id !== newFavorite.id
          );
          return newFavoritesArr;
        } else {
          return [newFavorite, ...state];
        }
      }

    default:
      return state;
  }
};
export default favoritesReducer;

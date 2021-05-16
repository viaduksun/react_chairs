import React from "react";
import ProductCard from "../Components/ProductCard";

const Favorites = ({ addToCart, addFavorite, favoritesContent }) => {
  const FavoritesList = favoritesContent.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        addToCart={addToCart}
        addFavorite={addFavorite}
        favoritesContent={favoritesContent}
      />
    );
  });

  return (
    <>
      <div className="container">
        <div className="main-body">
          <div className="main-body-text">Your favorite products</div>
          <div className="products-field">{FavoritesList}</div>
        </div>
      </div>
    </>
  );
};
export default Favorites;

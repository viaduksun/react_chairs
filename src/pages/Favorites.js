import React from "react";
import { useSelector } from "react-redux";
import Star from "../Components/icons/Star";
import ProductCard from "../Components/ProductCard";

const Favorites = () => {
  const favoritesContent = useSelector((state) => state.favorites);
  const FavoritesList = favoritesContent.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  return (
    <>
      <div className="container">
        {favoritesContent.length ? (
          <div className="main-body">
            <div className="main-body-text">Your favorite products</div>
            <div className="products-field">{FavoritesList}</div>
          </div>
        ) : (
          <div className="empty-favorites">
            <h2>You have no favorites...</h2>
            <div className="empty-favorites-icon">{<Star />}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default Favorites;

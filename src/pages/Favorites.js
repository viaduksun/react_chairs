import React from "react";

const Favorites = ({ removeFavorite, favoritesContent }) => {
  console.log("favoritesContent", favoritesContent);

  const favoriteProducts = favoritesContent.map((product) => (
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
        <button
          className="cartPage-btn-delete"
          onClick={() => {
            removeFavorite(product.id);
          }}
        >
          Delete from favorites
        </button>
      </div>
    </div>
  ));

  return (
    <div className="cart-body">
      {favoritesContent.length === 0 ? (
        <div className="empty-cart">No favorite items</div>
      ) : (
        <>
          <div className="cart-body-title">Favorite products</div>
          <div className="cart-products-field">{favoriteProducts}</div>
        </>
      )}
    </div>
  );
};
export default Favorites;

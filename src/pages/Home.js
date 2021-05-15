import React from "react";

// import MainBody from "../Components/MainBody";
// import Products from "../Components/Products";
import ProductCard from "../Components/ProductCard";

const Home = ({ products, addToCart, addFavorite, favoritesContent }) => {
  const ProductList = products.map((product) => {
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
          <div className="main-body-text">Our best products</div>
          <div className="products-field">
            {ProductList}
            {/* <Products productList={products} addToCart={addToCart} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

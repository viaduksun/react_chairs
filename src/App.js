import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import getProducts from "./api/getProducts";
import Header from "./Components/Header";
import HeaderImage from "./Components/HeaderImage";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import CartModal from "./Components/CartModal";
import Modal from "./Components/Modal";
import Footer from "./Components/Footer";
import Contacts from "./pages/Contacts";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cartContent, setCartContent] = useState([]);
  const [favoritesContent, setFavoritesContent] = useState([]);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [modalRemoveFromCart, setmodalRemoveFromCart] = useState({
    isShown: false,
  });
  const [modalRemoveFromFavorites, setmodalRemoveFromFavorites] = useState({
    isShown: false,
  });
  const [addToCartModal, setaddToCartModal] = useState({
    productId: "",
    isShown: false,
  });

  const [totalCount, setTotalCount] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  // =======USE-EFFECT-GENERAL============================
  useEffect(() => {
    getProducts().then((productsArr) => {
      setProducts(productsArr);
    });
    window.addEventListener("scroll", handleScroll);
    const favoritesFromLocal = localStorage.getItem("favorites");
    const cartFromLocal = localStorage.getItem("cart");
    // console.log("cartFromLocal", cartFromLocal);
    if (favoritesFromLocal) {
      setFavoritesContent(JSON.parse(favoritesFromLocal));
    }
    if (cartFromLocal) {
      setCartContent(JSON.parse(cartFromLocal));
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // ======USE-EFFECT-favorites================================
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesContent));
  }, [favoritesContent]);
  // =======USE-EFFECT-cart===================================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartContent));
    // ===TOTAL COUNT====
    let totalCount = 0;
    cartContent.forEach((item) => {
      totalCount += item.count;
    });
    setTotalCount(totalCount);
    // ===TOTAL PRICE===
    let totalPrice = 0;
    cartContent.forEach((item) => {
      totalPrice += item.price * item.count;
    });
    setTotalPrice(totalPrice);
  }, [cartContent]);
  // =================================================================
  const handleScroll = () => {
    if (window.scrollY > 500) {
      setHeaderFixed(true);
    } else if (window.scrollY < 500) {
      setHeaderFixed(false);
    }
  };
  // =======ADD TO CART (inside modal)====================================
  const handleAddToCart = () => {
    //get id from modal 'Add to cart'
    const inCartId = addToCartModal.productId;
    // initial cart product OBJ
    let cartProduct = products.find((product) => product.id === inCartId);
    // Adding a new key for initial OBJ = count: 1
    cartProduct.count = 1;

    let newCartArr = [];
    // check matches in cart to avoide dublication of products
    let cartMatches = cartContent.find((item) => item.id === inCartId);
    if (cartMatches) {
      newCartArr = cartContent.map((item) => {
        if (item.id === inCartId) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    } else {
      newCartArr = [cartProduct, ...cartContent];
    }
    // console.log("NEW CART", newCartArr);

    setCartContent(newCartArr);
    setaddToCartModal({ productId: "", isShown: false });
  };
  // =====CART increment ===================================
  const handleCartIncrement = (id) => {
    const newCartContent = cartContent.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setCartContent(newCartContent);
  };
  // =====CART decrement ===================================
  const handleCartDecrement = (id) => {
    const newCartContent = cartContent.map((item) => {
      if (item.id === id && item.count >= 2) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setCartContent(newCartContent);
  };

  // ======REMOVE FROM CART ====================================
  const removeProductFromCart = (id) => {
    const newCartContent = cartContent.filter((product) => product.id !== id);
    setCartContent(newCartContent);
    handleModalClose();
  };
  // ======REMOVE FROM FAVORITES ====================================
  const removeProductFromFavorites = (id) => {
    console.log("ID to remove FUNC", id);
    const newFavoritesContent = [];
    favoritesContent.forEach((item) => {
      if (item.id !== id) {
        newFavoritesContent.push(item);
      }
    });
    setFavoritesContent(newFavoritesContent);
    handleModalClose();
  };
  // =====OPENNING MODAL ADD TO CART =================================
  const handleAddToCartModal = (productId) => {
    setaddToCartModal({ productId, isShown: true });
  };
  // =====HIDE MODAL ===========??? (state ?)======================================
  // const hideModal = () => {
  //   const modal = document.querySelector(".modal-body");
  //   const modalCover = document.querySelector(".modal-cover");
  //   modal.classList.add("modal-hide");
  //   modalCover.classList.add("modal-cover-hide");
  // };
  // =====CLOSE MODAL ADD TO CART =============================
  const handleAddToCartModalclose = () => {
    // hideModal();
    setaddToCartModal({ productId: "", isShown: false });
  };
  // =======OPEN MODAL (removeFromCar) ==================================
  const handleModalOpen = (id) => {
    setmodalRemoveFromCart({ id, isShown: true });
  };
  // =======OPEN MODAL (remove From Favorites) ==================================
  const handleModalRemoveFavoriteOpen = (id) => {
    console.log("REMOVE favor ID", id);
    setmodalRemoveFromFavorites({ id, isShown: true });
  };
  // ======CLOSE MODAL (removeFromCart) =================================
  const handleModalClose = () => {
    setmodalRemoveFromCart({ isShown: false });
    setmodalRemoveFromFavorites({ isShown: false });
  };
  // =====ADD TO FAVORITE =================================================
  const handleFavorite = (id) => {
    // const idStr = id.toString();
    const favoriteObject = products.find((product) => product.id === id);
    console.log("favoriteObject", favoriteObject);
    console.log("favoritesContent", favoritesContent);

    const favorMath = favoritesContent.find((favorite) => favorite.id === id);
    if (favorMath) {
      const newFavorites = favoritesContent.filter((item) => item.id !== id);
      setFavoritesContent(newFavorites);
    } else {
      setFavoritesContent([favoriteObject, ...favoritesContent]);
    }
    console.log("FAVORITES", favoritesContent);
  };
  // ====PRODUCT AFTER CLICK (for add to cart modal) ============================
  let cartProduct = {};
  if (addToCartModal.isShown) {
    cartProduct = products.find(
      (item) => item.id === +addToCartModal.productId
    );
  }

  // ======BTN SET (ADD TO CART MODAL)  ==============================
  const addToCartModalBtns = (
    <div className="modal-btn-block">
      <button className="btn btn-modal" onClick={handleAddToCart}>
        Add to card
      </button>
      <button className="btn btn-modal" onClick={handleAddToCartModalclose}>
        Cancel
      </button>
    </div>
  );
  // ======BTN SET (RemoveFromCart)  ==============================
  const removeFromCartModalBtns = (
    <div className="modal-btn-block">
      <button
        className="btn btn-modal"
        onClick={() => removeProductFromCart(modalRemoveFromCart.id)}
      >
        Ok
      </button>
      <button className="btn btn-modal" onClick={handleModalClose}>
        Cancel
      </button>
    </div>
  );
  // ======BTN SET (Remove From Favorites)  ==============================
  const removeFromFavoritesModalBtns = (
    <div className="modal-btn-block">
      <button
        className="btn btn-modal"
        onClick={() => removeProductFromFavorites(modalRemoveFromFavorites.id)}
      >
        Ok
      </button>
      <button className="btn btn-modal" onClick={handleModalClose}>
        Cancel
      </button>
    </div>
  );
  // =================================================================
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/">
          <HeaderImage />
        </Route>
      </Switch>
      <Header
        products={products}
        removeProduct={removeProductFromCart}
        headerFixed={headerFixed}
        cartContent={cartContent}
        cartCounter={totalCount}
      />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home
              products={products}
              addToCart={handleAddToCartModal}
              addFavorite={handleFavorite}
              favoritesContent={favoritesContent}
            />
          </Route>
          <Route exact path="/cart">
            <Cart
              products={products}
              removeProduct={handleModalOpen}
              cartContent={cartContent}
              totalCount={totalCount}
              totalPrice={totalPrice}
              increment={handleCartIncrement}
              decrement={handleCartDecrement}
            />
          </Route>
          <Route exact path="/favorites">
            <Favorites
              products={products}
              removeFavorite={handleModalRemoveFavoriteOpen}
              favoritesContent={favoritesContent}
            />
          </Route>
          <Route exact path="/contacts">
            <Contacts />
          </Route>
        </Switch>
      </div>
      <Footer />
      {addToCartModal.isShown && (
        <CartModal
          header="Please, confirm adding to cart this product"
          closeButton={true}
          product={cartProduct}
          actions={addToCartModalBtns}
          onModalClose={handleAddToCartModalclose}
        />
      )}
      {modalRemoveFromCart.isShown && (
        <Modal
          header="Please, confirm deleting from cart"
          closeButton={true}
          actions={removeFromCartModalBtns}
          onModalClose={handleModalClose}
        />
      )}
      {modalRemoveFromFavorites.isShown && (
        <Modal
          header="Please, confirm deleting from favorites"
          closeButton={true}
          actions={removeFromFavoritesModalBtns}
          onModalClose={handleModalClose}
        />
      )}
    </div>
  );
};
export default App;

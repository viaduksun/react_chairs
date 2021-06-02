import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "./store/general/actions";
import {
  addToCartAction,
  closeModaladdToCartAction,
  setTotalProductCount,
  setTotalProductPrice,
  cartModalRemoveClose,
  cartProductRemove,
  modalOrderInfoClose,
  initialCart,
} from "./store/cart/actions";
import Header from "./Components/Header";
import HeaderTop from "./Components/HeaderTop";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import CartModal from "./Components/CartModal";
import Modal from "./Components/Modal";
import ModalOrderInfo from "./Components/ModalOrderInfo";
import Footer from "./Components/Footer";
import Contacts from "./pages/Contacts";
import { initialFavorites } from "./store/favorites/actions";
import Button from "./Components/Button";

const App = () => {
  const [headerFixed, setHeaderFixed] = useState(false);

  // ====== REDUX =========================================
  const dispatch = useDispatch();
  const productsFromRedux = useSelector((state) => state.general.products);
  const favoritesFromRedux = useSelector((state) => state.favorites);
  const cartFromRedux = useSelector((state) => state.cart.cart);
  const clickedProductIdFromRedux = useSelector(
    (state) => state.cart.clickedProduct
  );
  const addToCartModalIsOpened = useSelector(
    (state) => state.cart.addToCartModalisOpened
  );
  const cartModalRemoveOpen = useSelector(
    (state) => state.cart.cartModalRemoveOpen
  );
  const cartModalOrderInfo = useSelector((state) => state.cart.modalOrderInfo);
  // =======USE-EFFECT-GENERAL============================
  useEffect(() => {
    // =====Loading products and setting to redux store =================================
    dispatch(loadProducts());

    window.addEventListener("scroll", handleScroll);
    const favoritesFromLocal = localStorage.getItem("favorites");
    const cartFromLocal = localStorage.getItem("cart");
    if (favoritesFromLocal) {
      dispatch(initialFavorites(JSON.parse(favoritesFromLocal)));
    }
    if (cartFromLocal) {
      dispatch(initialCart(JSON.parse(cartFromLocal)));
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);
  // ======USE-EFFECT-favorites================================
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesFromRedux));
  }, [favoritesFromRedux]);
  // =======USE-EFFECT-cart===================================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartFromRedux));
    // ===TOTAL COUNT====
    let totalCount = 0;
    cartFromRedux.forEach((item) => {
      totalCount += item.count;
    });
    dispatch(setTotalProductCount(totalCount));
    // ===TOTAL PRICE===
    let totalPrice = 0;
    cartFromRedux.forEach((item) => {
      totalPrice += item.price * item.count;
    });
    dispatch(setTotalProductPrice(totalPrice));
  }, [cartFromRedux, dispatch]);
  // =================================================================
  const handleScroll = () => {
    if (window.scrollY > 500) {
      setHeaderFixed(true);
    } else if (window.scrollY < 500) {
      setHeaderFixed(false);
    }
  };
  // ======BTN SET (ADD TO CART MODAL)  ==============================
  const addToCartModalBtns = (
    <div className="modal-btn-block">
      <Button
        addClass="btn-modal"
        onClick={() => dispatch(addToCartAction(clickedProductIdFromRedux))}
        text="Add to card"
      />
      <Button
        addClass="btn-modal"
        onClick={() => dispatch(closeModaladdToCartAction())}
        text="Cancel"
      />
    </div>
  );
  // ======BTN SET (RemoveFromCart)  ==============================
  const removeFromCartModalBtns = (
    <div className="modal-btn-block">
      <Button
        addClass="btn-modal"
        onClick={() => dispatch(cartProductRemove(clickedProductIdFromRedux))}
        text="Delete"
      />
      <Button
        addClass="btn-modal"
        onClick={() => dispatch(cartModalRemoveClose())}
        text="Cancel"
      />
    </div>
  );
  // ======BTN SET (cartModalOrderInfoBtns)  ==============================
  const cartModalOrderInfoBtns = (
    <div className="modal-btn-block">
      <Button
        addClass="btn-modal"
        onClick={() => dispatch(modalOrderInfoClose())}
        text="Ok"
      />
    </div>
  );

  return (
    <div className="wrapper">
      <Switch>
        {/* <Route exact path={location.pathname}> */}
        <Route exact path="/">
          <HeaderTop />
        </Route>
      </Switch>
      <Header products={productsFromRedux} headerFixed={headerFixed} />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home products={productsFromRedux} />
          </Route>
          <Route exact path="/cart">
            <Cart products={productsFromRedux} removeProduct={null} />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/contacts">
            <Contacts />
          </Route>
        </Switch>
      </div>
      <Footer />
      {addToCartModalIsOpened && (
        <CartModal
          header="Please, confirm adding to cart this product"
          closeButton={true}
          actions={addToCartModalBtns}
        />
      )}
      {cartModalRemoveOpen && (
        <Modal
          header="Cart editing"
          text="Please, confirm deleting this product from cart"
          closeButton={true}
          actions={removeFromCartModalBtns}
        />
      )}
      {cartModalOrderInfo && (
        <ModalOrderInfo closeButton={true} actions={cartModalOrderInfoBtns} />
      )}
    </div>
  );
};
export default App;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "../scss/header.scss";
import CartContent from "./CartContent";

const Header = ({cartContent, removeProduct, headerFixed }) => {

  const [cartIsShown, setcartIsShown] = useState(false)
  
  const handleCartIsShown = () => {
    setcartIsShown(!cartIsShown);    
  }
// =====REDUX ==============================
const inCartCounter = useSelector(state => state.cart.totalCount);
const inFavoritesCounter = useSelector(state => state.favorites.length);
    
    return (
      <div className={headerFixed ? "header-menu fixed" : "header-menu"}>
        <div className="container menu-container">
          <div className="header-menu_links">
        <NavLink  exact to="/" className="header-menu_link" activeClassName="selected">Home</NavLink>
        <NavLink  to="/cart" className="header-menu_link" activeClassName="selected">Cart</NavLink>
        <NavLink  to="/favorites" className="header-menu_link favorites-link" activeClassName="selected"><div className="header-favorites-counter">{inFavoritesCounter}</div>Favorites</NavLink>
        <NavLink  to="/contacts" className="header-menu_link" activeClassName="selected">Contacts</NavLink>
        </div>
        <div className="header-menu-cart" onClick={handleCartIsShown}>
          <img src="./img/cart.png" alt="cart"/>
          <div className="header-cart-counter">{inCartCounter}</div>
        </div>
          { cartIsShown && <CartContent cartContent={cartContent} removeProduct={removeProduct} onCartIsShown={handleCartIsShown}/> }
        </div>        
      </div>
      
    )  
}

export default Header

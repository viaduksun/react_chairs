import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../scss/header.scss";
import CartContent from "./CartContent";
import PropTypes from 'prop-types';

const Header = ({products, cartContent, removeProduct, headerFixed, cartCounter}) => {

  const [cartIsShown, setcartIsShown] = useState(false)
  
  const handleCartIsShown = () => {
    setcartIsShown(!cartIsShown);    
  }

    
    return (
      <div className={headerFixed ? "header-menu fixed" : "header-menu"}>
        <div className="container menu-container">
          <div className="header-menu_links">
        <NavLink  exact to="/" className="header-menu_link" activeClassName="selected">Home</NavLink>
        <NavLink  to="/cart" className="header-menu_link" activeClassName="selected">Cart</NavLink>
        <NavLink  to="/favorites" className="header-menu_link" activeClassName="selected">Favorites</NavLink>
        <NavLink  to="/contacts" className="header-menu_link" activeClassName="selected">Contacts</NavLink>
        </div>
        <div className="header-menu-cart" onClick={handleCartIsShown}>
          <img src="./img/cart.png" alt="cart"/>
          <div className="header-cart-counter">{cartCounter}</div>
        </div>
          { cartIsShown && <CartContent cartContent={cartContent} removeProduct={removeProduct} onCartIsShown={handleCartIsShown}/> }
        </div>        
      </div>
      
    )  
}
Header.propTypes = {
  products: PropTypes.array.isRequired,  
  removeProduct: PropTypes.func,  
}
// Header.propTypes.defaultProps = {
//   products: [],    
// }


export default Header

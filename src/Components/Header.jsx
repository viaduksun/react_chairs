import React, { Component } from 'react';
import "../scss/header.scss";
import CartContent from "./CartContent";
import PropTypes from 'prop-types';

export class Header extends Component {
  state={
    cartIsShown: false,
  };
  handleCartIsShown = () =>{
    this.setState({cartIsShown: !this.state.cartIsShown});    
  }
  render() {
    const {products, removeProduct, headerFixed} = this.props;
    const {cartIsShown} = this.state;
    let cartCounter = 0;
    let cartArr = [];
    let cartContent = [];
    if (localStorage.getItem('inCart')) {
      cartArr = localStorage.getItem('inCart').split(',');
      cartCounter = cartArr.length;     
    }
    cartArr.forEach(itemID => {
      let cartItem = products.find(product => product.id === +itemID);
      cartContent.push(cartItem);
    })    
    return (
      <div className={headerFixed ? "header-menu fixed" : "header-menu"}>
        <div className="container menu-container">
          <div className="header-menu_links">
        <a href="/" className="header-menu_link">Home</a>
        <a href="/" className="header-menu_link">Products</a>
        <a href="/" className="header-menu_link">About</a>
        <a href="/" className="header-menu_link">Contacts</a>
        </div>
        <div className="header-menu-cart" onClick={this.handleCartIsShown}>
          <img src="./img/cart.png" alt="cart"/>
          <div className="header-cart-counter">{cartCounter}</div>
        </div>
          { cartIsShown && <CartContent cartContent={cartContent} removeProduct={removeProduct}/> }
        </div>        
      </div>
      
    )
  }
}
Header.propTypes = {
  products: PropTypes.array.isRequired,  
  removeProduct: PropTypes.func,  
}
// Header.propTypes.defaultProps = {
//   products: [],    
// }


export default Header

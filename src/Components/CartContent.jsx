import React, { Component } from 'react';
import PropTypes from "prop-types";

export class CartContent extends Component {
  state ={
    cartContent: localStorage.getItem("inCart"),
  }
  render() {
    const {cartContent, removeProduct} = this.props;    
    return (
      <div className="cart-content">
        {cartContent.length === 0 ?
         <div className="cart-item-empty">No items have been added</div> :
         cartContent.map((product)=>(
          <div className="cart-item" key={product.id}>
          <div className="cart-item-img">
            <img src={product.image} alt="cart-item"/>
          </div>
          <div className="cart-item-text">{product.name}</div>
          <div className="cart-item-remove" onClick={()=>removeProduct(product.id)}></div>
        </div>
        ))}  
      </div>
    )
  }
}
CartContent.propTypes = {
  cartContent: PropTypes.array.isRequired,  
  removeProduct: PropTypes.func,  
}
// CartContent.propTypes.defaultProps = {
//   cartContent: [],  
//   removeProduct: ()=>{},
// }
export default CartContent

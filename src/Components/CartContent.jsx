import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

const CartContent = ({ removeProduct, cartContent, onCartIsShown}) => {

  const [cartIds, setCartIds] = useState([]);

  useEffect(() => {
    setCartIds(localStorage.getItem("inCart"))
  }, [cartIds]);
      
    return (
      <div className="cart-content">        
        {cartContent.length === 0 ?
         <div className="cart-item-empty">No items have been added</div> :
         <>
         {cartContent.map((product)=>(
           
          <div className="cart-item" key={product.id}>
          <div className="cart-item-img">
            <img src={product.image} alt="cart-item"/>
          </div>
          <div className="cart-item-text">{product.name}</div>
          <div className="cart-item-count">({product.count})</div>
          <div className="cart-item-remove" onClick={()=>removeProduct(product.id)}></div>
        </div>
        ))} 
          <div className="cart-header-btn-wrapper">
              <Link to="/cart" className="btn btn-to-order" onClick={()=>onCartIsShown()}>Go to cart</Link>
          </div>       
        </>
        
        }  
      </div>
    )  
}
CartContent.propTypes = {
  cartContent: PropTypes.array.isRequired,  
  removeProduct: PropTypes.func,  
}

export default CartContent

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartProductRemove } from '../store/cart/actions';

const CartContent = ({ onCartIsShown}) => {
  
  const cartFromRedux = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
      
    return (
      <div className="cart-content">        
        {cartFromRedux.length === 0 ?
         <div className="cart-item-empty">No items have been added</div> :
         <>
         {cartFromRedux.map((product)=>(
           
          <div className="cart-item" key={product.id}>
          <div className="cart-item-img">
            <img src={product.image} alt="cart-item"/>
          </div>
          <div className="cart-item-text">{product.name}</div>
          <div className="cart-item-count">({product.count})</div>
          <div className="cart-item-remove" onClick={()=>dispatch(cartProductRemove(product))}></div>
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

export default CartContent

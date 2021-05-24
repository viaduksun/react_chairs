import React from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { openModaladdToCartAction } from '../store/cart/actions';
import { handleFavorites } from '../store/favorites/actions';
import CartIcon from './icons/CartIcon';

const ProductCard = ({ product }) => {  
 
const inCartContent = useSelector(state => state.cart.cart)
const inFavoriteContent = useSelector(state => state.favorites)
  const isInCart = inCartContent.some(item => item.id === product.id);
  const isInFavorite = inFavoriteContent.some(item => item.id === product.id);
  const dispatch = useDispatch();

  const handleIsFavorite = (product) => {    
    dispatch(handleFavorites(product));    
  }  

    return (
      <div key={product.id} className="product-card">
          <div className="card-header">
            <div className="card-header-icon">{<CartIcon fill={isInCart ? "#9ed681" : "#f0f0f0"} />}</div>
            <img src={product.image} alt={product.name}/>
          </div>
          <div className="card-body">
            <div className="card-text">
              <p className="card-name">{product.name}</p>
              <div className="card-data">
                <div className="card-data-name">Article</div>
                <div className="card-data-value">{product.article}</div>
              </div>
              <div className="card-data">
                <div className="card-data-name">Color</div>
                <div className="card-data-value">{product.color}</div>
              </div>
              <div className="card-data">
                <div className="card-data-name">Price</div>
                <div className="card-data-value">{product.price}</div>
              </div>
            </div>
            <div className="card-options">              
              <div onClick={()=> handleIsFavorite(product)}  className="card-options-favorites">
                {isInFavorite ? 
                <img className="card-options-star" src="./img/star-selected.png" alt="product-star"/> 
                : 
                <img className="card-options-star" src="./img/star.png" alt="product-star"/>
                }   
                </div>              
              <button className="btn btn-add-to-card" onClick={()=> dispatch(openModaladdToCartAction(product))}>Add to card</button>
            </div>
          </div>                
      </div>
    )  
}
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,  
}
export default ProductCard

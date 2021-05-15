import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const ProductCard = ({ product, addToCart, addFavorite, favoritesContent }) => {

  const [isFavorite, setIsFavorite] = useState(false);
  
 useEffect(() => { 
  favoritesContent.forEach(item => {
    if(item.id === product.id) {
      setIsFavorite(true);
    }
  })
    // if(favoritesContent.includes(product.id.toString())) {
    //   setIsFavorite(true);
    // } 
 }, [product.id]);

  
  
  const handleIsFavorite = (id) => {
    setIsFavorite(!isFavorite);
    addFavorite(id);

    // const idStr = id.toString();    
    // if(!localStorage.getItem('isFavoriteArrId')) {
    //   localStorage.setItem('isFavoriteArrId', idStr);
    // } else {
    //   const localStorArr = localStorage.getItem('isFavoriteArrId').split(',');
    //   if(!localStorArr.includes(idStr)) {
    //     localStorArr.push(idStr);
    //     localStorage.setItem('isFavoriteArrId', localStorArr);
    //     // console.log(localStorArr);
    //   } else {
    //     const newLocalStorArr = localStorArr.filter(item => item !== idStr);
    //     localStorage.setItem('isFavoriteArrId', newLocalStorArr); 
    //   }  
    // }  
  }  

    return (
      <div key={product.id} className="product-card">
          <div className="card-header">
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
              <div onClick={()=> handleIsFavorite(product.id)}  className="card-options-favorites">
                {isFavorite ? 
                <img className="card-options-star" src="./img/star-selected.png" alt="product"/> 
                : 
                <img className="card-options-star" src="./img/star.png" alt="product"/>
                }                
                <p>Add to favorites</p>
                </div>
              <button className="btn btn-add-to-card" onClick={()=> addToCart(product.id)}>Add to card</button>
            </div>
          </div>                
      </div>
    )  
}
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func,  
}
// ProductCard.propTypes.defaultProps = {  
//   addToCart: ()=>{},
// }

export default ProductCard

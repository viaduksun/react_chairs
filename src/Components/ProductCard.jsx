import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ProductCard extends Component {
  state = {
    isFavorite: false,
  }
  componentDidMount(){
    const { product }=this.props
    // console.log("DID MOUNT");
    if(localStorage.getItem('isFavoriteArrId')) {
      const isFavorites = localStorage.getItem('isFavoriteArrId').split(',');
      if(isFavorites.includes(product.id.toString())) {
      this.setState({ isFavorite: true });
      }
    }
  }
  componentDidUpdate() {
    // console.log("DID update");
  }
  handleIsFavorite = (id) => {
    this.setState({ isFavorite: !this.state.isFavorite})

    const idStr = id.toString();    
    if(!localStorage.getItem('isFavoriteArrId')) {
      localStorage.setItem('isFavoriteArrId', idStr);
    } else {
      const localStorArr = localStorage.getItem('isFavoriteArrId').split(',');
      if(!localStorArr.includes(idStr)) {
        localStorArr.push(idStr);
        localStorage.setItem('isFavoriteArrId', localStorArr);
        // console.log(localStorArr);
      } else {
        const newLocalStorArr = localStorArr.filter(item => item !== idStr);
        localStorage.setItem('isFavoriteArrId', newLocalStorArr); 
      }  
    }  
  }  
  render() {
    const { product, addToCart }= this.props;

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
              <div onClick={()=> this.handleIsFavorite(product.id)}  className="card-options-favorites">
                {this.state.isFavorite ? 
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
}
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func,  
}
// ProductCard.propTypes.defaultProps = {  
//   addToCart: ()=>{},
// }

export default ProductCard

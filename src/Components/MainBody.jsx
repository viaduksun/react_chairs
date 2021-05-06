import React, { Component } from 'react';
import Products from './Products';
import PropTypes from 'prop-types';

export class MainBody extends Component {
  render() {
    const {productList, addToCart} = this.props;
    return (
      <div className="main-body">
        <div className="main-body-text">Our best products</div>
        <div className="products-field">
          <Products productList={productList} addToCart={addToCart}/>
        </div>
        
      </div>
    )
  }
}
MainBody.propTypes = {
  productList: PropTypes.array,  
  addToCart: PropTypes.func.isRequired,  
}
// MainBody.propTypes.defaultProps = {
//   productList: [],  
//   // addToCart: ()=>{},
// }
export default MainBody

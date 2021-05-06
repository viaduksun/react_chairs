import React, { Component } from 'react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

export class Products extends Component {  
  
  render() {    
    const {productList, addToCart } = this.props;        
    return ( 
      <> 
      {productList.map((product)=>(        
        <ProductCard key={product.id} product={product} addToCart={addToCart}/>
      ))}
      </>
    )
  }
}
Products.propTypes = {
  productList: PropTypes.array.isRequired,
  addToCart: PropTypes.func,  
}
// Products.propTypes.defaultProps = {  
//   addToCart: ()=>{},
// }
export default Products

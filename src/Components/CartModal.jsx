import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CartModal extends Component {  
  render() {
    const {header, closeButton, actions, onModalClose, product } = this.props;
    return (
        <>
          <div className="modal-cover" onClick={(event)=>{
              if (event.target.classList.contains('modal-cover')) {
                event.target.classList.add('modal-cover-hide')
                onModalClose()                
              }  
          }}>          
        </div>         
        <div className="modal-body">        
            <div className="modal-header">
              {closeButton && <div className="modal-close"
                  onClick={onModalClose}  
              ></div>}          
              <p>{header}</p>
            </div>
            <div className="modal-content">
              <div className="modal-image">
                <img src={product.image} alt="product"/>
              </div>
              <div className="modal-data">
                <div className="modal-product-name">{product.name}</div>
                <div className="modal-data-item">
                  <div className="modal-data-name">Article</div>
                  <div className="modal-data-value">{product.article}</div>
                </div>
                <div className="modal-data-item">
                  <div className="modal-data-name">Color</div>
                  <div className="modal-data-value">{product.color}</div>
                </div>
                <div className="modal-data-item">
                  <div className="modal-data-name price">Price</div>
                  <div className="modal-data-value price">{product.price}</div>
                </div>
              </div>              
            </div>          
            <div className="modal-actions">{actions}</div>
        </div> 
      </>
    )
  }
}
CartModal.propTypes = {
  header: PropTypes.string.isRequired,
  closeButton: PropTypes.bool,
  onModalClose: PropTypes.func,
  product: PropTypes.object.isRequired,
  actions: PropTypes.node.isRequired,
}
// CartModal.propTypes.defaultProps = {
//   header: "Modal window",
  // closeButton: true,
  // onModalClose: ()=>{},
// }
export default CartModal

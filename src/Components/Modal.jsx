import React from 'react';
import PropTypes from 'prop-types';
import { cartModalRemoveClose } from '../store/cart/actions';
import { useDispatch, useSelector } from 'react-redux';

const Modal = ({header, closeButton, text, actions }) => {
  const targetProduct = useSelector((state) => state.cart.clickedProduct);  
 const dispatch = useDispatch()
    return (
        <>
          <div className="modal-cover" onClick={(event)=>{
              if (event.target.classList.contains('modal-cover')) {
                event.target.classList.add('modal-cover-hide')
                dispatch(cartModalRemoveClose())               
              }  
          }}>          
        </div>         
        <div className="modal-body">        
            <div className="modal-header">
              {closeButton && <div className="modal-close"
                  onClick={() => dispatch(cartModalRemoveClose()) }  
              ></div>}          
              <p>{targetProduct.name}</p>
            </div>
          <div className="modal-text">{text}</div>
          <div className="modal-actions">{actions}</div>
        </div> 
      </>
    )  
}
Modal.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
  closeButton: PropTypes.bool,
  onModalClose: PropTypes.func,  
  actions: PropTypes.node.isRequired,
}

export default Modal

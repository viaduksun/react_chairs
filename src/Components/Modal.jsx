import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({header, closeButton, text, actions, onModalClose }) => {  

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

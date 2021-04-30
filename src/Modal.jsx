import React, { Component } from 'react';
import "./scss/modal.scss";

export class Modal extends Component {  
  render() {
    const {header, closeButton, text, actions, onModalClose } = this.props;
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
}

export default Modal

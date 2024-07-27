import React, { useEffect } from 'react';
import './Modal.css';
import { ReactComponent as ClosedIcon } from '../assets/images/ui/danger.svg';
import { Button } from 'reactstrap';

const Modal = ({ children, onClose, title, height, width, scale }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ height, width, scale }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
        <h4></h4>
          <h2>{title}</h2>
          <ClosedIcon className='img-closed' onClick={onClose} width={30}/>
        </div>
        <div className="modal-content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

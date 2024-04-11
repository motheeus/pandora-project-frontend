import React from 'react'
import "../styles/Modal.css"
import { IoCloseSharp } from "react-icons/io5";

const Modal = ({isOpen, onClose, children, height, width}) => {
  return (isOpen && (
    <div className="modal-overlay">
        <div className="modal-wrapper" style={{height: height, width: width}}>
            <div className="modal-content">
                <div className="modal-header">
                    <IoCloseSharp  onClick={onClose}/>
                </div>
                <div className="modal-children">
                    {children}
                </div>
            </div>
        </div>
    </div>
  ))
}

export default Modal
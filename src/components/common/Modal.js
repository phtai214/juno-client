//hiển thị các popup trong ứng dụng.

import React from 'react';

const Modal = ({ title, children, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;

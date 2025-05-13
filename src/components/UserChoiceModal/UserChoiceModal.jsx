// UserChoiceModal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './UserChoiceModal.css';

const UserChoiceModal = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="employer">
          <h3>Employer</h3>
          {/* Add content or link to employer login */}
        </div>
        <div className="serviceProvider">
          <h3>Service Provider</h3>
          {/* Add content or link to provider login */}
        </div>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>,
    document.body
  );
};

export default UserChoiceModal;

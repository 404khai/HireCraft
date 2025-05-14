// UserChoiceModal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './UserChoiceModal.css';
import employer from '../../assets/freelancer.jpg'
import painter from '../../assets/showcaseSkills.jpg'

const UserChoiceModal = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="employer">
          <p>Hire a Pro</p>
          <img src={employer} alt="" />
          <p>Hire the services of master craftsmen and artisans within minutes</p>
        </div>
        <div className="serviceProvider">
          <p>Get jobs from around the world</p>
          <img src={painter} alt="" />
          <p>Showcase your services and increase your reach while getting paid for it!</p>
        </div>
        {/* <button className="close-button" onClick={onClose}>×</button> */}
      </div>
    </div>,
    document.body
  );
};

export default UserChoiceModal;

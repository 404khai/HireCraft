// UserChoiceModal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './UserChoiceModal.css';
import provider from '../../assets/provider.gif'
import employer from '../../assets/employer.gif'

const UserChoiceModal = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="employer">
          <h3>Register as Client</h3>
          <Link to={{ pathname: "/ClientSignUp", state: { role: "ROLE_CLIENT" } }}>
            <img src={employer} alt="" />
          </Link>
          <p>Hire the services of master craftsmen and artisans within minutes</p>
        </div>
        <div className="modalLine"></div>
        <div className="serviceProvider">
          <h3>Register as Service Provider</h3>
          <Link to={{ pathname: "/ServiceProviderSignUp", state: { role: "ROLE_PROVIDER" } }}>
            <img src={provider} alt="" />
          </Link>
          <p>Showcase your services and increase your reach while getting paid for it!</p>
        </div>
        {/* <button className="close-button" onClick={onClose}>×</button> */}
      </div>
    </div>,
    document.body
  );
};

export default UserChoiceModal;

// import React from 'react'
import { HiWrenchScrewdriver } from "react-icons/hi2";
import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import UserChoiceModal from "../UserChoiceModal/UserChoiceModal";
// import Contact from '../Contact/Contact';

const Navbar = () => {
    // alert(activeTab)
    // console.log("Active Tab:", activeTab);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
        document.body.classList.add('modal-open');
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
        document.body.classList.remove('modal-open');
    };
  return (
    <div className='navbar'>
        <Link to="/Home" className="navLogoLink">
            <div className="navLogo">
                <i><HiWrenchScrewdriver/></i>
                <p>hire<span className="navLogoSpan">craft</span></p>
            </div>
        </Link>
        

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <Link to='/Services'>Services</Link>
            <Link to=''>About Us</Link>
            <Link to=''>How It Works</Link>
            <Link to=''>FAQ's</Link>

            <div className="navOpenLoginBtn">
                <button onClick={handleOpenModal} className='logIn'>
                    <Link to=''>Sign Up</Link>  
                </button> 
            </div>

            <div className="navOpenLoginBtn">
                <button className='logIn'>
                    <Link to='/Login'>Login</Link>  
                </button> 
            </div>
        </nav>

        <div className="navBtn">
          <button onClick={handleOpenModal} className='logIn'>
            <Link to=''>Sign Up</Link>  
          </button> 

          <button className='logIn'>
            <Link to='/Login'>Login</Link>  
          </button>
        </div>

        {showModal && (
            <UserChoiceModal onClose={handleCloseModal}/>
        )}

        <div className="navBarToggle">
            <input type="checkbox" id="checkbox" checked={isMenuOpen} onChange={toggleMenu} />
            <label htmlFor="checkbox" className="navToggle">
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
            </label>
        </div>
    </div>
  )
}


export default Navbar;


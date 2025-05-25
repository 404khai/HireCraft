// import React from 'react'
import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import hirecraftLogo from '../../assets/hirecraftLogo.png'
import OIF from '../../assets/OIF.jpeg'
import UserChoiceModal from "../UserChoiceModal/UserChoiceModal";
import { IoIosUnlock } from "react-icons/io";
import { PiPlusCircleFill } from "react-icons/pi";
// import { HiWrenchScrewdriver } from "react-icons/hi2";
// import Contact from '../Contact/Contact';

const Navbar = () => {

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            const homeTxt = document.querySelector('.homeTxt');

            if (window.scrollY > homeTxt.offsetTop + homeTxt.offsetHeight) {
            navbar.classList.add('scrolled');
            } else {
            navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


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
                <img src={hirecraftLogo} alt="" className="hirecraftLogo"/>
                <p>hire<span className="navLogoSpan">craft</span></p>
                {/* <i><HiWrenchScrewdriver/></i>
                <p>hire<span className="navLogoSpan">craft</span></p> */}
            </div>
        </Link>
        

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <Link to='/Services'>Browse Services</Link>
            <Link to=''>FAQ's</Link>
            <Link to=''>Contact Us</Link>

            <div className="navOpenLoginBtn">
                <button onClick={handleOpenModal} className='navSignUp'>
                    <Link to=''>Sign Up</Link>  
                </button> 
            </div>

            <div className="navOpenLoginBtn">
                <Link to='/Login' className="loginLink">
                    <button className='logIn'>
                        Login
                    </button> 
                </Link>  
            </div>
        </nav>

        <div className="navBtn">
            <Link to="" onClick={handleOpenModal}><i><PiPlusCircleFill /></i> Register</Link>
            <Link to='/Login'><i><IoIosUnlock/></i> Login</Link>
            {/* <img src={OIF} alt="" className='navUserImg'/> */}
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


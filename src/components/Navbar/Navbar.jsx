// import React from 'react'
import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import hirecraftLogo from '../../../public/favicon2.png'
import OIF from '../../assets/OIF.jpeg'
import UserChoiceModal from "../UserChoiceModal/UserChoiceModal";
import { IoIosUnlock } from "react-icons/io";
import { PiPlusCircleFill } from "react-icons/pi";
import { useLocation } from 'react-router-dom';

// import { HiWrenchScrewdriver } from "react-icons/hi2";
// import Contact from '../Contact/Contact';

const Navbar = () => {

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const navbar = document.querySelector('.navbar');

    //         if (window.scrollY > 30) {
    //         navbar.classList.add('scrolled');
    //         } else {
    //         navbar.classList.remove('scrolled');
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add scroll listener only on homepage
        if (location.pathname === '/Home' || location.pathname === '/') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        } else {
            // Other pages: force scrolled appearance
            setIsScrolled(true);
        }
    }, [location.pathname]);

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
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>

        <Link to="/Home" className="navLogoLink">
            <div className="navLogo">
                {/* <img src={hirecraftLogo} alt="" className="hirecraftLogo"/> */}
                <p>hire<span className="navLogoSpan">craft</span></p>
                {/* <i><HiWrenchScrewdriver/></i>
                <p>hire<span className="navLogoSpan">craft</span></p> */}
            </div>
        </Link>
        

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <Link to='/Services'>Browse Services</Link>
            <Link to=''>How It Works</Link>
            <Link to='/FAQS'>FAQ's</Link>
            <Link to='/ContactUs'>Contact Us</Link>

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


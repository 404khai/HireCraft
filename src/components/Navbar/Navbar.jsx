// import React from 'react'
import { HiWrenchScrewdriver } from "react-icons/hi2";
import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
// import Contact from '../Contact/Contact';

const Navbar = () => {
    // alert(activeTab)
    // console.log("Active Tab:", activeTab);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

  return (
    <div className='navbar'>
        <div className="navLogo">
            <i><HiWrenchScrewdriver/></i>
            <p>hirecraft</p>
        </div>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <Link to=''>Services</Link>
            <Link to=''>About Us</Link>
            <Link to=''>How It Works</Link>
            <Link to=''>FAQ's</Link>
        </nav>

        <div className="navBtn">
          <button className='logIn'>
            <Link to=''>Login</Link>  
          </button>
          {/* <button className='logIn'>
            <Link to='/DashBoard'>Sign Up</Link>  
          </button> */}
        </div>

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


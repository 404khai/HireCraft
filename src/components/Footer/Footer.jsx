import './Footer.css'
import { Link } from 'react-router-dom'
import React from 'react'
import { HiWrenchScrewdriver } from 'react-icons/hi2'
import { FaDiscord, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footerTop">
            <div className="footerTopBox" id='footerTopBox1'>
                <Link to="/Home" className="navLogoLink">
                    <div className="navLogo">
                        <i><HiWrenchScrewdriver/></i>
                        <p>hire<span className="navLogoSpan">craft</span></p>
                    </div>
                </Link>

                <p>Connect with extraordinary painters, plumbers and more, fast and easy</p>

                <div className="socials">
                    <i><FaDiscord /></i>
                    <i><FaXTwitter /></i>
                    <i><FaLinkedinIn /></i>
                </div>
            </div>
            <div className="footerTopBox">
                <p className='footerTopBoxHeadTxt'>Quick Links</p>
                <Link to="/Home">Home</Link>
                <Link to="/Servies">Explore Services</Link>
                <Link to="">About Us</Link>
                <Link to="">Pricing</Link>
            </div>
            <div className="footerTopBox">
                <p className='footerTopBoxHeadTxt'>Resources</p>
                <Link to="">Blog</Link>
                <Link to="/Servies">How it Works</Link>
                <Link to="">FAQ's</Link>
                <Link to="">Pricing</Link>
            </div>
            <div className="footerTopBox">
                <p className='footerTopBoxHeadTxt'>Get In Touch</p>
                <p><i style={{color: "#788cff"}}><PiPhoneCallFill /></i> support@hirecraft.com</p>
                <button className='contactUs'>
                    <Link to=''>Contact Us</Link>  
                </button>
            </div>

        </div>

        <div className="footerBottom">
            <p>&copy; 2025 <span className='footerSpan'>HireCraft</span>, All Rights Reserved</p>

            <div className="footerBottomLinks">
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>Cookie Policy</p>
            </div>
        </div>
    </div>
  )
}

export default Footer
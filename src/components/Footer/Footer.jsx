import './Footer.css'
import { Link } from 'react-router-dom'
import React from 'react'
import { HiWrenchScrewdriver } from 'react-icons/hi2'
import { FaDiscord, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import hirecraftLogo from '../../assets/hirecraftLogo.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footerTop">
            <div className="footerTopBox" id='footerTopBox1'>
                <Link to="/Home" className='footerLogoLink'>
                    <div className="footerLogo">
                        {/* <img src={hirecraftLogo} alt="" className="hirecraftLogoFooter"/> */}
                        <p style={{color: "white"}}>hire<span className="footerLogoSpan">craft</span></p>
                    </div>
                </Link>

                <p style={{color: "#909090"}}>Connect with extraordinary painters, plumbers and more, fast and easy</p>

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
                <p style={{color: "#909090"}}><i style={{color: "#35D07D"}}><PiPhoneCallFill /></i> support@hirecraft.com</p>
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
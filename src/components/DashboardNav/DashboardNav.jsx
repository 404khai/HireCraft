import './DashboardNav.css'
// import profilePic from '../../assets/pacman.jpg'
import profilePic from '../../assets/userPic.png'
import { IoExitOutline, IoHomeOutline } from "react-icons/io5"
import { PiBellRinging, PiMailbox } from "react-icons/pi"
import { LuBellRing } from "react-icons/lu";
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect, useContext } from 'react'
import { FaRegUser } from 'react-icons/fa6'
import { AuthContext } from '../../context/AuthContext';

const DashboardNav = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const dropdownRef = useRef(null)

  const { user, logout } = useContext(AuthContext);
  const displayProfilePic = user && user.profilePictureUrl ;
  // const displayProfilePic = user && user.profilePictureUrl ? user.profilePictureUrl : defaultProfilePic;
  const toggleDropdown = () => {
    setIsDropdownVisible(prev => !prev)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className='dashboardNav'>
      <Link to="/Home" className="dashboardLogoLink">
        <div className="dashboardLogo">
          <p>hire<span className="navLogoSpan">craft</span></p>
        </div>
      </Link>

      <div className='dashboardNavControls'>
        <Link to="/Home">
          <i className='notifications'><IoHomeOutline /></i>
        </Link>
        {/* <i className='notifications'><PiMailbox /></i> */}
        <i className='notifications'><PiBellRinging /></i>
        <div className='profileWrapper' onClick={toggleDropdown}>
          <img src={displayProfilePic} alt="Profile" className='profilePic' />
          {/* <button className='online'></button> */}
          {isDropdownVisible && (
            <div className="profileDropdown" ref={dropdownRef}>
              <Link to="/ProviderProfile"><i><FaRegUser /></i>My Profile</Link>
              <Link to="/Home"><i><IoHomeOutline /></i>Back to Home</Link>
              <Link to="" onClick={logout}><i><IoExitOutline /></i>Log Out</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardNav

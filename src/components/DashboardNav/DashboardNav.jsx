// import './DashboardNav.css'
// // import profilePic from '../../assets/pacman.jpg'
// import profilePic from '../../assets/userPic.png'
// import { IoExitOutline, IoHomeOutline } from "react-icons/io5"
// import { PiBellRinging, PiMailbox } from "react-icons/pi"
// import { LuBellRing } from "react-icons/lu";
// import { Link } from 'react-router-dom'
// import React, { useState, useRef, useEffect, useContext } from 'react'
// import { FaRegUser } from 'react-icons/fa6'
// import { AuthContext } from '../../context/AuthContext';
// import Avatar from '../Avatar';

// const DashboardNav = () => {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false)
//   const dropdownRef = useRef(null)

//   const { user, logout } = useContext(AuthContext);
//   const displayProfilePic = user && user.profilePictureUrl ;
//   // const displayProfilePic = user && user.profilePictureUrl ? user.profilePictureUrl : defaultProfilePic;
//   const toggleDropdown = () => {
//     setIsDropdownVisible(prev => !prev)
//   }

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownVisible(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   return (
//     <div className='dashboardNav'>
//       <Link to="/Home" className="dashboardLogoLink">
//         <div className="dashboardLogo">
//           <p>hire<span className="navLogoSpan">craft</span></p>
//         </div>
//       </Link>

//       <div className='dashboardNavControls'>
//         <Link to="/Home">
//           <i className='notifications'><IoHomeOutline /></i>
//         </Link>
//         <i className='notifications'><PiBellRinging /></i>
//         <div className='profileWrapper' onClick={toggleDropdown}>
//           <Avatar
//                             imageUrl={user.profilePictureUrl}
//                             firstName={user.firstName}
//                             lastName={user.lastName}
//                             size={40} // Adjust size as needed for your navbar
//                             textSize={18} // Adjust text size as needed
//                             className='navUserImg' // Apply the existing class for styling if needed
//                         />
//           {/* <button className='online'></button> */}
//           {isDropdownVisible && (
//             <div className="profileDropdown" ref={dropdownRef}>
//               <Link to="/ProviderProfile"><i><FaRegUser /></i>My Profile</Link>
//               <Link to="/Home"><i><IoHomeOutline /></i>Back to Home</Link>
//               <Link to="" onClick={logout}><i><IoExitOutline /></i>Log Out</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DashboardNav


import './DashboardNav.css'
// import profilePic from '../../assets/pacman.jpg'
// import profilePic from '../../assets/userPic.png' // No longer needed, Avatar component handles defaults
import { IoExitOutline, IoHomeOutline } from "react-icons/io5"
import { IoMdNotifications } from "react-icons/io";
import { PiBellRinging, PiMailbox } from "react-icons/pi"
import { LuBellRing } from "react-icons/lu";
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect, useContext } from 'react'
import { FaRegUser } from 'react-icons/fa6'
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../Avatar';
import { RxCaretDown } from "react-icons/rx";

const DashboardNav = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const dropdownRef = useRef(null)

  const { user, logout } = useContext(AuthContext);

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

    // Determine dashboard/profile link based on user role
    const getProfileLink = () => {
        if (!user || !user.userRole) return "/"; // Default or fallback
        if (user.userRole.includes("PROVIDER")) return "/Profile";
        if (user.userRole.includes("CLIENT")) return "/ClientProfile";
        return "/";
    };


  return (
    <div className='dashboardNav'>
      <Link to="/Home" className="dashboardLogoLink">
        <div className="dashboardLogo">
          <p>hire<span className="navLogoSpan">craft</span></p>
        </div>
      </Link>

      <div className='dashboardNavControls'>
        {/* <Link to="/Home">
          <i className='notifications'><IoHomeOutline /></i>
        </Link>
        <i className='notifications'><PiBellRinging /></i> */}
        <i className='notifications'><IoMdNotifications/></i>

        {/* Conditionally render the profile section ONLY if 'user' is not null */}
        {user ? (
          <div className='navbarProfileWrapper' onClick={toggleDropdown} ref={dropdownRef}>
            <Avatar
              imageUrl={user.profilePictureUrl}
              firstName={user.firstName}
              lastName={user.lastName}
              size={55} // Adjust size as needed for your dashboard
              textSize={18} // Adjust text size as needed
              className='navUserImg' // Apply the existing class for styling if needed
            />
            <button className='dashboardOnlineBtn'></button>
            <p>Hi, {user.firstName}</p>
            <i><RxCaretDown/></i>
            {/* <button className='online'></button> */}
            {isDropdownVisible && (
              <div className="profileDropdown">
                <Link to={getProfileLink()}><i><FaRegUser /></i>My Profile</Link>
                <Link to="/Home"><i><IoHomeOutline /></i>Back to Home</Link>
                <Link to="" onClick={logout}><i><IoExitOutline /></i>Log Out</Link>
              </div>
            )}
          </div>
        ) : (
          // Optional: A placeholder or loading state if user is null
          // In a dashboard, ideally, this state should be very brief,
          // as the user should already be logged in to reach this page.
          <div className="profileWrapper">Loading profile...</div>
        )}
      </div>
    </div>
  )
}

export default DashboardNav
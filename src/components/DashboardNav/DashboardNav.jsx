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


// import './DashboardNav.css'
// import { IoExitOutline, IoHomeOutline } from "react-icons/io5"
// import { IoMdNotifications } from "react-icons/io";
// import { PiBellRinging, PiMailbox } from "react-icons/pi"
// import { LuBellRing } from "react-icons/lu";
// import { Link } from 'react-router-dom'
// import React, { useState, useRef, useEffect, useContext } from 'react'
// import { FaRegUser } from 'react-icons/fa6'
// import { AuthContext } from '../../context/AuthContext';
// import Avatar from '../Avatar';
// import { RxCaretDown } from "react-icons/rx";

// const DashboardNav = () => {
//   // const [isDropdownVisible, setIsDropdownVisible] = useState(false)
//   // const [isNotificationsVisible, setIsNotificationsVisible] = useState(false)
//   // const dropdownRef = useRef(null);
//   // const notificationRef = useRef(null)

//   // const { user, logout } = useContext(AuthContext);

//   // const toggleDropdown = () => {
//   //   setIsDropdownVisible(prev => !prev)
//   // }

//   // const toggleNotifications = () => {
//   //   setIsNotificationsVisible(prev => !prev)
//   // }

//   // // Close dropdown on outside click
//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     if ((dropdownRef.current && !dropdownRef.current.contains(event.target)) || (notificationRef.current && !notificationRef.current.contains(event.target))) {
//   //       setIsDropdownVisible(false)
//   //       setIsNotificationsVisible(false)
//   //     }
//   //   }

//   //   document.addEventListener("mousedown", handleClickOutside)
//   //   return () => document.removeEventListener("mousedown", handleClickOutside)
//   // }, [])

//   const [isDropdownVisible, setIsDropdownVisible] = useState(false)
//   const [isNotificationsVisible, setIsNotificationsVisible] = useState(false)
//   const dropdownRef = useRef(null); // Ref for the profile dropdown
//   const notificationButtonRef = useRef(null); // Ref for the notification icon itself
//   const notificationDropdownRef = useRef(null); // Ref for the notification dropdown content

//   const { user, logout } = useContext(AuthContext);

//   const toggleDropdown = () => {
//     setIsDropdownVisible(prev => !prev)
//     setIsNotificationsVisible(false); // Close notifications if opening profile
//   }

//   const toggleNotifications = () => {
//     setIsNotificationsVisible(prev => !prev)
//     setIsDropdownVisible(false); // Close profile dropdown if opening notifications
//   }

//   // Close dropdowns on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Check if click is outside profile dropdown AND outside the profile button
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           event.target.closest('.navbarProfileWrapper') !== dropdownRef.current.closest('.navbarProfileWrapper')) {
//         setIsDropdownVisible(false);
//       }
      
//       // Check if click is outside notification dropdown AND outside the notification button
//       if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target) &&
//           notificationButtonRef.current && !notificationButtonRef.current.contains(event.target)) {
//         setIsNotificationsVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//     // Determine dashboard/profile link based on user role
//     const getProfileLink = () => {
//         if (!user || !user.userRole) return "/"; // Default or fallback
//         if (user.userRole.includes("PROVIDER")) return "/Profile";
//         if (user.userRole.includes("CLIENT")) return "/ClientProfile";
//         return "/";
//     };


//   return (
//     <div className='dashboardNav'>
//       <Link to="/Home" className="dashboardLogoLink">
//         <div className="dashboardLogo">
//           <p>hire<span className="navLogoSpan">craft</span></p>
//         </div>
//       </Link>

//       <div className='dashboardNavControls'>
//         {/* <Link to="/Home">
//           <i className='notifications'><IoHomeOutline /></i>
//         </Link>
//         <i className='notifications'><PiBellRinging /></i> */}
//         <i className='notifications' onClick={toggleNotifications} ref={notificationButtonRef}><IoMdNotifications/></i>
//         {isNotificationsVisible && (
//             <div className="notificationsDropdown" ref={notificationDropdownRef}>
//               {/* Example Notification Items - replace with actual data */}
//               <div className="notification-item unread">
//                 <p>You have a new booking request from John Doe.</p>
//                 <p className="time">5 min ago</p>
//               </div>
//               <div className="notification-item">
//                 <p>Your booking with Jane Smith was completed.</p>
//                 <p className="time">2 hours ago</p>
//               </div>
//               <div className="notification-item">
//                 <p>Payment for job #12345 has been processed.</p>
//                 <p className="time">Yesterday</p>
//               </div>
//               {/* Example of an empty state */}
//               {/* <div className="empty-notifications">No new notifications.</div> */}
//               <Link to="/notifications" className="view-all-link">View All Notifications</Link>
//             </div>
//           )}

//         {/* Conditionally render the profile section ONLY if 'user' is not null */}
//         {user ? (
//           <div className='navbarProfileWrapper' onClick={toggleDropdown} ref={dropdownRef}>
//             <Avatar
//               imageUrl={user.profilePictureUrl}
//               firstName={user.firstName}
//               lastName={user.lastName}
//               size={55} // Adjust size as needed for your dashboard
//               textSize={18} // Adjust text size as needed
//               className='navUserImg' // Apply the existing class for styling if needed
//             />
//             <button className='dashboardOnlineBtn'></button>
//             <p>Hi, {user.firstName}</p>
//             <i><RxCaretDown/></i>
//             {/* <button className='online'></button> */}
//             {isDropdownVisible && (
//               <div className="profileDropdown">
//                 <Link to={getProfileLink()}><i><FaRegUser /></i>My Profile</Link>
//                 <Link to="/Home"><i><IoHomeOutline /></i>Back to Home</Link>
//                 <Link to="" onClick={logout}><i><IoExitOutline /></i>Log Out</Link>
//               </div>
//             )}
//           </div>
//         ) : (
//           // Optional: A placeholder or loading state if user is null
//           // In a dashboard, ideally, this state should be very brief,
//           // as the user should already be logged in to reach this page.
//           <div className="profileWrapper">Loading profile...</div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DashboardNav

import './DashboardNav.css'; // Make sure this CSS file is correctly linked and contains the styles for dropdowns and notification items.

import { IoExitOutline, IoHomeOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../Avatar';
import { RxCaretDown } from "react-icons/rx";

const DashboardNav = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([]); // State to hold fetched notifications
  const [loadingNotifications, setLoadingNotifications] = useState(true); // Loading state for notifications
  const [notificationsError, setNotificationsError] = useState(null); // Error state for notifications

  const dropdownRef = useRef(null); // Ref for the profile dropdown container
  const notificationButtonRef = useRef(null); // Ref for the notification icon itself
  const notificationDropdownRef = useRef(null); // Ref for the notification dropdown content

  const { user, logout } = useContext(AuthContext);
  const token = localStorage.getItem('token'); // Get token from local storage

  // Toggle profile dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(prev => !prev);
    setIsNotificationsVisible(false); // Close notifications if opening profile
  };

  // Toggle notifications dropdown visibility and fetch if opening
  const toggleNotifications = async () => {
    // Only fetch if the dropdown is currently hidden and about to become visible
    if (!isNotificationsVisible && user && token) {
      setLoadingNotifications(true);
      setNotificationsError(null);
      try {
        const response = await fetch('http://localhost:9090/api/v1/notifications/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming the API returns notifications sorted newest first.
          // If not, you'd sort them here: .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          setNotifications(data);
        } else {
          const errorData = await response.json();
          setNotificationsError(`Failed to fetch notifications: ${errorData.message || response.statusText}`);
          console.error("Failed to fetch notifications:", response.status, errorData);
        }
      } catch (error) {
        setNotificationsError('Network error or unable to connect to API.');
        console.error("Error fetching notifications:", error);
      } finally {
        setLoadingNotifications(false);
      }
    }
    setIsNotificationsVisible(prev => !prev); // Toggle visibility regardless of fetch success
    setIsDropdownVisible(false); // Close profile dropdown if opening notifications
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside profile dropdown AND outside the profile button
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          event.target.closest('.navbarProfileWrapper') !== dropdownRef.current.closest('.navbarProfileWrapper')) {
        setIsDropdownVisible(false);
      }
      
      // Check if click is outside notification dropdown AND outside the notification button
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target) &&
          notificationButtonRef.current && !notificationButtonRef.current.contains(event.target)) {
        setIsNotificationsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        {/* Notification Icon and Dropdown */}
        <div style={{ position: 'relative' }}> {/* Wrapper for relative positioning */}
          <i className='notifications' onClick={toggleNotifications} ref={notificationButtonRef}>
            <IoMdNotifications/>
            {/* Optional: Add a badge for unread count here if you fetch it separately */}
          </i>
          {isNotificationsVisible && (
            <div className="notificationsDropdown" ref={notificationDropdownRef}>
              {loadingNotifications ? (
                <div className="empty-notifications">Loading notifications...</div>
              ) : notificationsError ? (
                <div className="empty-notifications" style={{ color: '#ef4444' }}>{notificationsError}</div>
              ) : notifications.length > 0 ? (
                <>
                  {/* Display only the first 3 notifications */}
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                    >
                      <p className="title">{notification.message}</p> {/* Use message from API */}
                      <p className="time">{notification.timeAgo}</p> {/* Use timeAgo from API */}
                    </div>
                  ))}
                  <Link to="/notifications" className="view-all-link">View All Notifications</Link>
                </>
              ) : (
                <div className="empty-notifications">No new notifications.</div>
              )}
            </div>
          )}
        </div>

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
            {isDropdownVisible && (
              <div className="profileDropdown">
                <Link to={getProfileLink()}><i><FaRegUser /></i>My Profile</Link>
                <Link to="/Home"><i><IoHomeOutline /></i>Back to Home</Link>
                <Link to="" onClick={logout}><i><IoExitOutline /></i>Log Out</Link>
              </div>
            )}
          </div>
        ) : (
          <div className="profileWrapper">Loading profile...</div>
        )}
      </div>
    </div>
  );
};

export default DashboardNav;
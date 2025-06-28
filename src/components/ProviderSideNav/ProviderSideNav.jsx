// import React from 'react'
// import './ProviderSideNav.css'
// import { Link } from 'react-router-dom'
// import { HiWrenchScrewdriver, HiOutlineWallet } from "react-icons/hi2";
// import { LuLayoutDashboard, LuBellRing } from "react-icons/lu";
// import { TiMessages } from "react-icons/ti";
// import { FaRegUser } from "react-icons/fa6";
// import { IoExitOutline , IoBriefcaseOutline, IoSettingsOutline} from "react-icons/io5";
// import { MdOutlineRateReview } from "react-icons/md";
// import { IoMdFolderOpen } from "react-icons/io";
// import { SiReaddotcv } from "react-icons/si";
// import { RiWallet3Line } from "react-icons/ri";
// import { TbFileTextSpark } from "react-icons/tb";

// const ProviderSideNav = () => {
//   return (
//     <div className='providersidenav'>

//         <div className="start">
//             <p><b>Home</b></p>
//             <Link to="/ProviderDashboard">
//                 <i><LuLayoutDashboard /></i>
//                 Dashboard
//             </Link>
//             <Link to="/ProviderDashboard/Messages">
//                 <i><TiMessages /></i>
//                 Messages
//             </Link>
//             {/* <Link to="/Dashboard/JobAlerts">
//                 <i><LuBellRing /></i>
//                 Job Alerts
//             </Link> */}
//             <Link to="/ProviderDashboard/Bookings">
//                 <i><IoBriefcaseOutline /></i>
//                 My Bookings
//             </Link>
//         </div>
       
//         <div className="manage">
//             <p><b>Organize & Manage</b></p>
//             <Link to="/ProviderDashboard/Wallet">
//                 {/* <i><HiOutlineWallet /></i> */}
//                 <i><RiWallet3Line/></i>
//                 Wallet
//             </Link>
//             <Link to="/ProviderDashboard/MyProjects">
//                 <i><IoMdFolderOpen /></i>
//                 Projects
//             </Link>
//             {/* <Link to="/ProviderDashboard/Resume">
//                 <i><TbFileTextSpark /></i>
//                 Resume
//             </Link> */}
//         </div>

//         <div className="account">
//             <p><b>Account</b></p>
//             <Link to="/ProviderDashboard/Settings">
//                 <i><IoSettingsOutline /></i>
//                 Settings
//             </Link>
//             <Link to="/ProviderDashboard/Reviews">
//                 <i><MdOutlineRateReview /></i>
//                 Review & Ratings
//             </Link>
//             <Link to="/ProviderDashboard">
//                 <i><IoExitOutline /></i>
//                 Log Out
//             </Link>
//         </div>
//     </div>
//   )
// }

// export default ProviderSideNav


import React, { useState, useEffect } from 'react';
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { LuLayoutDashboard, LuLogOut, LuCalendarRange, LuSettings, LuBriefcaseBusiness, LuFolderCog } from "react-icons/lu";
import { TiMessages } from "react-icons/ti";
import { TbLayoutKanban } from "react-icons/tb";
import { IoBriefcaseOutline, IoSettingsOutline, IoExitOutline } from "react-icons/io5";
import { RiWallet3Line } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { MdOutlineRateReview } from "react-icons/md";
// Assuming you are using React Router for navigation
// If not, you'll need to install it: npm install react-router-dom
import { Link } from 'react-router-dom';

const ProviderSideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Styles defined within the component for clarity, or can be moved outside
  // if they are truly static and don't depend on component state.
  const mobileMenuButtonStyle = {
    display: 'none', // Default to none, enable with media query
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1001,
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: '#374151',
    // Responsive display for small screens
    '@media (max-width: 768px)': {
      display: 'block',
    },
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: 'none', // Default to none, enable with media query/conditional rendering
    // Responsive display for small screens
    '@media (max-width: 768px)': {
      display: 'block', // This will be applied conditionally via JS in render
    },
  };

  const sidebarStyle = {
    width: '255px',
    height: '480px',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: 'white',
    paddingTop: '100px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxShadow: '0 20px 20px 0 rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    transition: 'transform 0.3s ease-in-out',
    // Apply transform based on isOpen state
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    // For larger screens, always show sidebar
    '@media (min-width: 769px)': {
      transform: 'translateX(0)',
    },
  };

  const sectionStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const sectionHeaderStyle = {
    paddingLeft: '20px',
    color: '#35D07D',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    marginTop: '0'
  };

  const linkStyle = {
    textDecoration: 'none',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#888',
    paddingLeft: '20px',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  };

  const iconStyle = {
    fontSize: '20px',
    flexShrink: 0
  };

  const linkTextStyle = {
    fontSize: '15px',
    fontWeight: '500'
  };

  // Injecting global styles using useEffect to handle hover/scrollbar
  // This is better than manually manipulating the DOM outside of a component.
  // Although for more complex CSS, consider a dedicated CSS file or CSS-in-JS library.
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'provider-sidenav-global-styles';
    styleElement.textContent = `
      @media (max-width: 768px) {
        .mobile-menu-btn {
          display: block !important;
        }
        .provider-sidenav-overlay {
          display: block !important;
        }
      }

      @media (min-width: 769px) {
        .provider-sidenav {
          transform: translateX(0) !important;
        }
      }

      .provider-sidenav a:hover {
        color: #009749 !important;
        border-left: 3px solid #009749;
        padding-left: 25px !important;
        background-color: #35d07d23;
      }

      .provider-sidenav a:hover svg {
        color: #009749 !important;
      }

      .provider-sidenav::-webkit-scrollbar {
        width: 6px;
      }

      .provider-sidenav::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      .provider-sidenav::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
      }

      .provider-sidenav::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }
    `;
    document.head.appendChild(styleElement);

    // Cleanup: remove the style element when the component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        style={mobileMenuButtonStyle}
        onClick={toggleSidebar}
        className="mobile-menu-btn" // Add class for global CSS targeting
      >
        {isOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          style={overlayStyle}
          onClick={closeSidebar}
          className="provider-sidenav-overlay" // Add class for global CSS targeting
        ></div>
      )}

      {/* Sidebar */}
      <nav
        style={{
          ...sidebarStyle,
          // Conditionally apply transform directly here for responsiveness
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          '@media (min-width: 769px)': {
            transform: 'translateX(0)', // Always visible on larger screens
          },
        }}
        className="provider-sidenav" // Add class for global CSS targeting
      >
        {/* Home Section */}
        <div style={sectionStyle}>
          <p style={sectionHeaderStyle}>Home</p>
          {/* Use React Router's Link component for navigation */}
          <Link to="/ProviderDashboard" style={linkStyle} onClick={closeSidebar}>
            <LuLayoutDashboard style={iconStyle} />
            <span style={linkTextStyle}>Dashboard</span>
          </Link>
          <Link to="/ProviderDashboard/Messages" style={linkStyle} onClick={closeSidebar}>
            <TiMessages style={iconStyle} />
            <span style={linkTextStyle}>Messages</span>
          </Link>
          <Link to="/ProviderDashboard/Bookings" style={linkStyle} onClick={closeSidebar}>
            <LuBriefcaseBusiness style={iconStyle} />
            <span style={linkTextStyle}>My Bookings</span>
          </Link>
        </div>

        {/* Organize & Manage Section */}
        <div style={sectionStyle}>
          <p style={sectionHeaderStyle}>Organize & Manage</p>
          <Link to="/ProviderDashboard/Kanban" style={linkStyle} onClick={closeSidebar}>
            {/* <LuCalendarRange style={iconStyle} /> */}
            <TbLayoutKanban style={iconStyle} />
            <span style={linkTextStyle}>Schedule Board</span>
          </Link>
          <Link to="/ProviderDashboard/Wallet" style={linkStyle} onClick={closeSidebar}>
            <RiWallet3Line style={iconStyle} />
            <span style={linkTextStyle}>Earnings</span>
          </Link>
          {/* <Link to="/ProviderDashboard/MyProjects" style={linkStyle} onClick={closeSidebar}>
            <LuFolderCog style={iconStyle} />
            <span style={linkTextStyle}>Projects</span>
          </Link> */}
        </div>

        {/* Account Section */}
        <div style={sectionStyle}>
          <p style={sectionHeaderStyle}>Account</p>
          <Link to="/ProviderDashboard/Settings" style={linkStyle} onClick={closeSidebar}>
            <LuSettings style={iconStyle} />
            <span style={linkTextStyle}>Settings</span>
          </Link>
          <Link to="/ProviderDashboard/Reviews" style={linkStyle} onClick={closeSidebar}>
            <MdOutlineRateReview style={iconStyle} />
            <span style={linkTextStyle}>Review & Ratings</span>
          </Link>
          <Link to="/logout" style={linkStyle} onClick={closeSidebar}>
            <LuLogOut style={iconStyle} />
            <span style={linkTextStyle}>Log Out</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default ProviderSideNav;
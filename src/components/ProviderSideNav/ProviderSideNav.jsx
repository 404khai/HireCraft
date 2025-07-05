
import React, { useState, useEffect } from 'react';
import './ProviderSideNav.css'
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { LuLayoutDashboard, LuLogOut, LuCalendarRange, LuSettings, LuBriefcaseBusiness, LuFolderCog } from "react-icons/lu";
import { TiMessages } from "react-icons/ti";
import { TbLayoutKanban } from "react-icons/tb";
import { IoBriefcaseOutline, IoSettingsOutline, IoExitOutline } from "react-icons/io5";
import { RiWallet3Line } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { MdOutlineRateReview } from "react-icons/md";
import { Link } from 'react-router-dom';
import useBookings from '../../hooks/useBookings';

const ProviderSideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const { getFilterCounts, loading } = useBookings();
    
    // Get counts for notifications
    const filterCounts = getFilterCounts();
    
    // Calculate total notifications (pending + accepted)
    const totalNotifications = (filterCounts.PENDING || 0);

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
    height: '100vh',
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
        <div className='dashboardLinkBox'>
          <p>Home</p>
          {/* Use React Router's Lin component for navigation */}
          <Link to="/ProviderDashboard" onClick={closeSidebar}>
            <LuLayoutDashboard />
            <span className='dashboardLinkBoxSpan'>Dashboard</span>
          </Link>
          <Link to="/Dashboard/Messages" onClick={closeSidebar}>
            <TiMessages />
            <span className='dashboardLinkBoxSpan'>Messages</span>
            {/* <span className="sidenav-noti-badge">3</span> */}
          </Link>
          
        </div>

        {/* Organize & Manage Section */}
        <div className='dashboardLinkBox'>
          <p>Organize & Manage</p>
          <Link to="/ProviderDashboard/Bookings" onClick={closeSidebar}>
            <LuBriefcaseBusiness />
            <span className='dashboardLinkBoxSpan'>My Bookings</span>
            {!loading && totalNotifications > 0 && (
              <span className="sidenav-noti-badge">
                {totalNotifications}
              </span>
            )}

          </Link>
          <Link to="/ProviderDashboard/Kanban" onClick={closeSidebar}>
            {/* <LuCalendarRange style={iconStyle} /> */}
            <TbLayoutKanban />
            <span className='dashboardLinkBoxSpan'>Schedule Board</span>
          </Link>
          <Link to="/ProviderDashboard/Wallet" onClick={closeSidebar}>
            <RiWallet3Line />
            <span className='dashboardLinkBoxSpan'>Earnings</span>
            {/* <span className="sidenav-noti-badge">3</span> */}
          </Link>
        </div>

        {/* Account Section */}
        <div className='dashboardLinkBox'>
          <p>Account</p>
          <Link to="/Dashboard/Settings" onClick={closeSidebar}>
            <LuSettings />
            <span className='dashboardLinkBoxSpan'>Settings</span>
          </Link>
          <Link to="/Dashboard/Reviews" onClick={closeSidebar}>
            <MdOutlineRateReview />
            <span className='dashboardLinkBoxSpan'>Review & Ratings</span>
            {/* <span className="sidenav-noti-badge">3</span> */}
          </Link>
          <Link to="/logout" onClick={closeSidebar}>
            <LuLogOut />
            <span className='dashboardLinkBoxSpan'>Log Out</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default ProviderSideNav;
// // import React from 'react'
// import React, { useState, useEffect, useContext, useRef } from 'react'
// import './Navbar.css'
// import { Link, useLocation } from 'react-router-dom'
// import hirecraftLogo from '../../../public/favicon2.png'
// import OIF from '../../assets/OIF.jpeg'
// import UserChoiceModal from "../UserChoiceModal/UserChoiceModal";
// import { IoIosUnlock } from "react-icons/io";
// import { PiPlusCircleFill } from "react-icons/pi";
// import { AuthContext } from '../../context/AuthContext'
// import { LuLayoutDashboard } from "react-icons/lu";
// import { IoExitOutline, IoHomeOutline } from "react-icons/io5"
// import { FaRegUser } from 'react-icons/fa6'

// const Navbar = () => {

//     const location = useLocation();
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     const { user, logout } = useContext(AuthContext);

//     const [isDropdownVisible, setIsDropdownVisible] = useState(false)
//       const dropdownRef = useRef(null)
    
//       const toggleDropdown = () => {
//         setIsDropdownVisible(prev => !prev)
//       }
    
//       // Close dropdown on outside click
//       useEffect(() => {
//         const handleClickOutside = (event) => {
//           if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setIsDropdownVisible(false)
//           }
//         }
    
//         document.addEventListener("mousedown", handleClickOutside)
//         return () => document.removeEventListener("mousedown", handleClickOutside)
//     }, [])


//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 30) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         // Add scroll listener only on homepage
//         if (location.pathname === '/Home' || location.pathname === '/') {
//             window.addEventListener('scroll', handleScroll);
//             return () => window.removeEventListener('scroll', handleScroll);
//         } else {
//             // Other pages: force scrolled appearance
//             setIsScrolled(true);
//         }
//     }, [location.pathname]);

//     // alert(activeTab)
//     // console.log("Active Tab:", activeTab);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     const handleOpenModal = () => {
//         setShowModal(true);
//         document.body.classList.add('modal-open');
//     };
    
//     const handleCloseModal = () => {
//         setShowModal(false);
//         document.body.classList.remove('modal-open');
//     };
//   return (
//     <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>

//         <Link to="/Home" className="navLogoLink">
//             <div className="navLogo">
//                 <p>hire<span className="navLogoSpan">craft</span></p>
//             </div>
//         </Link>
        

//         <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
//             <Link to='/BrowseFreelancers'>Browse Freelancers</Link>
//             <Link to='/FAQS'>FAQ's</Link>
//             <Link to='/ContactUs'>Contact Us</Link>
//         </nav>

//         <div className="navBtn">
//             {/* {!user ? (
//                 <>
//                     <div className="navOpenLoginBtn">
//                     <button onClick={handleOpenModal} className='navSignUp'>
//                         <Link to=''>Sign Up</Link>
//                     </button>
//                     </div>
//                     <div className="navOpenLoginBtn">
//                     <Link to='/Login' className="loginLink">
//                         <button className='logIn'>Login</button>
//                     </Link>
//                     </div>
//                 </>
//                 ) : (
//                 <div className="navUserSection">
//                     <img
//                     src={user.profilePictureUrl}
//                     alt="User"
//                     className='navUserImg'
//                     />
//                     <button className="logoutBtn" onClick={logout}>Logout</button>
//                 </div>
//             )} */}
//             {!user ? (
//             <>
//                 <Link to="" onClick={handleOpenModal}><i><PiPlusCircleFill /></i> Register</Link>
//                 <Link to='/Login'><i><IoIosUnlock /></i> Login</Link>
//             </>
//             ) : (
//                 <div className='navbarProfileWrapper' onClick={toggleDropdown}>
//                     <img src={user.profilePictureUrl} alt="User" className='navUserImg' />
//                     {isDropdownVisible && (
//                         <div className="navbarProfileDropdown" ref={dropdownRef}>
//                             <Link to="/ProviderProfile"><i><FaRegUser /></i>My Profile</Link>
//                             <Link to="/ProviderDashboard"><i><LuLayoutDashboard /></i>Dashboard</Link>
//                             <Link to="" onClick={logout}><i><IoExitOutline /></i>Log Out</Link>
//                         </div>
//                     )}
//                 </div>
//                 // <>
//                 //     <img src={}  alt="User" className='navUserImg'/>
//                 //     <button className="logoutBtn" onClick={logout}>Logout</button>
//                 // </>
//             )}
//         </div>

//         {showModal && (
//             <UserChoiceModal onClose={handleCloseModal}/>
//         )}

//         <div className="navBarToggle">
//             <input type="checkbox" id="checkbox" checked={isMenuOpen} onChange={toggleMenu} />
//             <label htmlFor="checkbox" className="navToggle">
//             <div className="bars" id="bar1"></div>
//             <div className="bars" id="bar2"></div>
//             <div className="bars" id="bar3"></div>
//             </label>
//         </div>
//     </div>
//   )
// }


// export default Navbar;

// import React from 'react'
import React, { useState, useEffect, useContext, useRef } from 'react'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import hirecraftLogo from '../../../public/favicon2.png'
// import OIF from '../../assets/OIF.jpeg' // No longer strictly needed if Avatar component handles display
import UserChoiceModal from "../UserChoiceModal/UserChoiceModal";
import { IoIosUnlock } from "react-icons/io";
import { PiPlusCircleFill } from "react-icons/pi";
import { AuthContext } from '../../context/AuthContext'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoExitOutline, IoHomeOutline } from "react-icons/io5"
import { FaRegUser } from 'react-icons/fa6'
import Avatar from '../Avatar'; // <--- Import the new Avatar component

const Navbar = () => {

    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { user, logout } = useContext(AuthContext);

    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const dropdownRef = useRef(null)

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOpenModal = () => {
        setShowModal(true);
        document.body.classList.add('modal-open');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        document.body.classList.remove('modal-open');
    };

    // Determine dashboard link based on user role
    const getDashboardLink = () => {
        if (!user || !user.userRole) return "/"; // Default or fallback
        if (user.userRole.includes("PROVIDER")) return "/ProviderDashboard";
        if (user.userRole.includes("CLIENT")) return "/ClientDashboard";
        return "/"; // Fallback
    };

    return (
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>

            <Link to="/Home" className="navLogoLink">
                <div className="navLogo">
                    <p>hire<span className="navLogoSpan">craft</span></p>
                </div>
            </Link>

            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                <Link to='/BrowseFreelancers'>Browse Providers</Link>
                <Link to='/FAQS'>FAQ's</Link>
                <Link to='/ContactUs'>Contact Us</Link>
            </nav>

            <div className="navBtn">
                {!user ? (
                    <>
                        <Link to="" onClick={handleOpenModal}><i><PiPlusCircleFill /></i> Register</Link>
                        <Link to='/Login'><i><IoIosUnlock /></i> Login</Link>
                    </>
                ) : (
                    <div className='navbarProfileWrapper' onClick={toggleDropdown} ref={dropdownRef}> {/* Add ref here */}
                        <Avatar
                            imageUrl={user.profilePictureUrl}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            size={55} // Adjust size as needed for your navbar
                            textSize={23} // Adjust text size as needed
                            className='navUserImg' // Apply the existing class for styling if needed
                        />
                        {isDropdownVisible && (
                            <div className="navbarProfileDropdown">
                                {/* Use getDashboardLink for dynamic dashboard route */}
                                <Link to={`/${user.userRole.includes("PROVIDER") ? "ProviderProfile" : "ClientProfile"}`}><i><FaRegUser /></i>My Profile</Link>
                                <Link to={getDashboardLink()}><i><LuLayoutDashboard /></i>Dashboard</Link>
                                <Link to="" onClick={logout}><i><IoExitOutline /></i>Log Out</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showModal && (
                <UserChoiceModal onClose={handleCloseModal} />
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
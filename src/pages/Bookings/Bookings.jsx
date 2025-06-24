import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Bookings.css';
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { IoLocationOutline, IoCalendarOutline, IoBriefcaseOutline } from 'react-icons/io5'; // Removed IoBriefcaseOutline as it wasn't used
import { LuClock4 } from 'react-icons/lu'; // Removed LuMessageSquareText
import { MdTaskAlt } from 'react-icons/md';
import { LiaGlobeAmericasSolid } from 'react-icons/lia';
import { SiTicktick } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { BiTask } from 'react-icons/bi';
import axios from 'axios';
import OIF from '../../assets/OIF.jpeg';

import { AuthContext } from '../../context/AuthContext';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const API_BASE_URL = 'http://localhost:9090/api/v1/bookings'; // Define your API base URL

    // --- Utility function for getting token and config ---
    const getAuthConfig = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            // Consider redirecting to login here if token is crucial
            return null;
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    // --- Function to fetch bookings ---
    const fetchBookings = async () => {
        setLoading(true);
        setError(null);

        const config = getAuthConfig();
        if (!config) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/provider/me`, config);
            // Sort bookings by creation date in descending order (most recent first)
            const sortedBookings = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBookings(sortedBookings);
            console.log("Fetched bookings:", sortedBookings);
        } catch (err) {
            console.error("Error fetching provider bookings:", err);
            if (err.response && err.response.status === 401) {
                setError("Session expired or unauthorized. Please log in again.");
                // Optionally clear token and redirect to login
            } else {
                setError("Failed to load bookings. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    // --- Function to update booking status ---
    const updateBookingStatus = async (bookingId, newStatus) => {
        setError(null); // Clear any previous errors before a new action

        const config = getAuthConfig();
        if (!config) return;

        try {
            // Construct the payload as per your Spring Boot API
            const payload = { newStatus: newStatus };
            
            await axios.patch(`${API_BASE_URL}/${bookingId}/status`, payload, config);
            
            // On successful update, re-fetch bookings to get the latest status
            // Or, update the state directly for a more immediate UI response
            setBookings(prevBookings => 
                prevBookings.map(booking => 
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                )
            );
            console.log(`Booking ${bookingId} status updated to ${newStatus}`);
            // Optionally, show a success message to the user
        } catch (err) {
            console.error(`Error updating booking ${bookingId} to ${newStatus}:`, err);
            if (err.response) {
                if (err.response.status === 401) {
                    setError("Unauthorized: You don't have permission to perform this action or your session expired.");
                } else if (err.response.status === 400 || err.response.status === 409) { // 400 for bad request, 409 for conflict (e.g., invalid status transition)
                    setError(`Error: ${err.response.data.message || 'Invalid status transition or request.'}`);
                } else {
                    setError(`Failed to update status: ${err.response.data.message || 'Server error.'}`);
                }
            } else {
                setError("Failed to connect to the server. Please check your network.");
            }
        }
    };

    // --- Event Handlers for buttons ---
    const handleAccept = (bookingId) => {
        updateBookingStatus(bookingId, 'ACCEPTED'); // Use 'ACCEPTED' as per your Java enum
    };

    const handleDecline = (bookingId) => {
        updateBookingStatus(bookingId, 'DECLINED'); // Use 'DECLINED' as per your Java enum
    };

    const handleComplete = (bookingId) => {
        updateBookingStatus(bookingId, 'COMPLETED'); // Use 'COMPLETED' as per your Java enum
    };


    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]); // Dependency array: re-run if 'user' object changes

    // --- UI Render Logic (unchanged from your existing code, but now using `bookings` state) ---
    if (loading) {
        return (
            <div className='bookingBox'>
                <ProviderSideNav/>
                <div className='bookingBody'>
                    < DashboardNav />
                    <div className="bookingDashboard">
                        <div className="welcome">
                            <div className="welcomeTxt">
                                <h2>My Bookings</h2>
                            </div>
                            <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="My Bookings" link2="/ProviderDashboard/Bookings" />
                        </div>
                        <div className="jobAlertsBox">
                            <p>Loading bookings...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bookingBox'>
                <ProviderSideNav />
                <div className='bookingBody'>
                    < DashboardNav/>
                    <div className="bookingDashboard">
                        <div className="welcome">
                            <div className="welcomeTxt">
                                <h2>My Bookings</h2>
                            </div>
                            <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="My Bookings" link2="/ProviderDashboard/Bookings" />
                        </div>
                        <div className="jobAlertsBox">
                            <p className="error-message">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='bookingBox'>
            <ProviderSideNav />
            <div className='bookingBody'>
                < DashboardNav/>
                <div className="bookingDashboard">
                    <div className="welcome">
                        <div className="welcomeTxt">
                            <h2>My Bookings</h2>
                        </div>
                        <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="My Bookings" link2="/ProviderDashboard/Bookings" />
                    </div>

                    <div className="jobAlertsBox">
                        <div className="jobAlertsNoti">
                            <p>Your current bookings are shown below. They will also be sent to your email.</p>
                        </div>

                        <div className="jobAlerts">
                            <div className="jobAlertsHead">
                                <i><MdTaskAlt /></i>
                                My Bookings
                            </div>

                            {bookings.length === 0 ? (
                                <p className="no-bookings-found">No bookings found for you at the moment.</p>
                            ) : (
                                bookings.map((booking) => (
                                    <div className="jobAlert" key={booking.id}>
                                        <div className="jobAlertEmployer">
                                            <img src={OIF} alt="Client Profile" />
                                            <div className="jobEmployerTxt">
                                                <div className="jobEmployerTxtInfo">
                                                    <p>{booking.clientFullName}</p>
                                                    <p>
                                                        {booking.clientPosition}
                                                        {booking.clientCompany && `, ${booking.clientCompany}`}
                                                    </p>
                                                </div>

                                                <div className="jobEmployerTxtLocation">
                                                    <p>
                                                        <i><IoLocationOutline /></i>
                                                        {booking.city}, {booking.state}
                                                    </p>
                                                    <p>
                                                        <i><LiaGlobeAmericasSolid /></i>
                                                        {booking.country}
                                                    </p>
                                                </div>

                                                <p className='bookingDetails'>
                                                    <i><LuClock4 /></i>
                                                    {booking.timeSlot}
                                                </p>
                                                <p className='bookingDetails'>
                                                    <i><IoCalendarOutline /></i>
                                                    {booking.estimatedDuration}
                                                </p>
                                                {/* <p className='bookingDetails'>
                                                    <i><IoBriefcaseOutline /></i>
                                                    {booking.description}
                                                </p> */}
                                            </div>
                                        </div>

                                        <div className="bookingControls">
                                            <div className="bookingStatusBox">
                                                <button className={`bookingStatus ${booking.status.toLowerCase()}`}>
                                                    <p>{booking.status}</p>
                                                </button>
                                            </div>

                                            <div className="bookingControls2">
                                                <Link to={`/ProviderDashboard/Messages?bookingId=${booking.id}`}>
                                                    <button className='viewMessageBtn'>View Message</button>
                                                </Link>
                                                <p className='bookingTime'>
                                                    {booking.timeAgo}
                                                </p>
                                            </div>

                                            <div className="bookingControls3">
                                                {/* Conditionally render buttons based on current status */}
                                                {booking.status === 'PENDING' && (
                                                    <>
                                                        <button className="acceptBtn" onClick={() => handleAccept(booking.id)}>
                                                            <div className="acceptBtnIcon">
                                                                <i><SiTicktick className='accept' title='Accept Booking Request' /></i>
                                                            </div>
                                                            <div className="text">Accept</div>
                                                        </button>

                                                        <button className="declineBtn" onClick={() => handleDecline(booking.id)}>
                                                            <div className="acceptBtnIcon">
                                                                <i><MdOutlineCancel className='decline' title='Decline Booking Request' /></i>
                                                            </div>
                                                            <div className="text">Decline</div>
                                                        </button>
                                                    </>
                                                )}

                                                {booking.status === 'ACCEPTED' && ( // Only show Completed if booking is ACCEPTED
                                                    <button className="completedBtn" onClick={() => handleComplete(booking.id)}>
                                                        <div className="acceptBtnIcon">
                                                            <i><BiTask className='completed' title='Mark as Completed' /></i>
                                                        </div>
                                                        <div className="text">Completed</div>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;


// import React, { useState, useEffect, useContext } from 'react'; // Added useState, useEffect, useContext
// import { Link } from 'react-router-dom';
// import './Bookings.css';
// import DashboardNav from '../../components/DashboardNav/DashboardNav';
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
// import { IoLocationOutline, IoBriefcaseOutline, IoCalendarOutline } from 'react-icons/io5';
// import { LuClock4, LuMessageSquareText } from 'react-icons/lu';
// import { MdTaskAlt } from 'react-icons/md';
// import { LiaGlobeAmericasSolid } from 'react-icons/lia';
// import { SiTicktick } from 'react-icons/si';
// import { MdOutlineCancel } from 'react-icons/md';
// import { BiTask } from 'react-icons/bi';
// import axios from 'axios'; // Import axios
// import OIF from '../../assets/OIF.jpeg'; // Assuming this is a placeholder or default image

// // You'll likely need AuthContext to get the user's token for authentication
// import { AuthContext } from '../../context/AuthContext';


// const Bookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { user } = useContext(AuthContext); // Access user from AuthContext for token if needed

//     // Function to fetch bookings
//     const fetchBookings = async () => {
//         setLoading(true); // Set loading to true when fetching starts
//         setError(null); // Clear any previous errors

//         try {
//             const token = localStorage.getItem('token'); // Get token from localStorage
//             if (!token) {
//                 // Handle case where token is not found (e.g., redirect to login)
//                 setError("Authentication token not found. Please log in.");
//                 setLoading(false);
//                 return;
//             }

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
//                 }
//             };

//             const response = await axios.get('http://localhost:9090/api/v1/bookings/provider/me', config);
//             setBookings(response.data); // Set the fetched data to state
//             console.log("Fetched bookings:", response.data); // Log the data to console for verification
//         } catch (err) {
//             console.error("Error fetching provider bookings:", err);
//             setError("Failed to load bookings. Please try again later."); // Set error message
//             // You might want to handle different error statuses, e.g., 401 for unauthorized
//         } finally {
//             setLoading(false); // Set loading to false once fetching is complete
//         }
//     };

//     // Use useEffect to call fetchBookings when the component mounts
//     useEffect(() => {
//         if (user) { // Only fetch if user data is available (i.e., user is logged in)
//             fetchBookings();
//         }
//     }, [user]); // Dependency array: re-run if 'user' object changes (e.g., after login)


//     // Render loading, error, or data
//     if (loading) {
//         return (
//             <div className='dashboardBox'>
//                 <DashboardNav />
//                 <div className='dashboardBody'>
//                     <ProviderSideNav />
//                     <div className="dashboard">
//                         <div className="welcome">
//                             <div className="welcomeTxt">
//                                 <h2>My Bookings</h2>
//                             </div>
//                             <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="My Bookings" link2="/ProviderDashboard/Bookings" />
//                         </div>
//                         <div className="jobAlertsBox">
//                             <p>Loading bookings...</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className='dashboardBox'>
//                 <DashboardNav />
//                 <div className='dashboardBody'>
//                     <ProviderSideNav />
//                     <div className="dashboard">
//                         <div className="welcome">
//                             <div className="welcomeTxt">
//                                 <h2>My Bookings</h2>
//                             </div>
//                             <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="My Bookings" link2="/ProviderDashboard/Bookings" />
//                         </div>
//                         <div className="jobAlertsBox">
//                             <p className="error-message">{error}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className='bookingBox'>
//             <DashboardNav />
//             <div className='bookingBody'>
//                 <ProviderSideNav />
//                 <div className="bookingDashboard">
//                     <div className="welcome">
//                         <div className="welcomeTxt">
//                             <h2>My Bookings</h2>
//                         </div>
//                         <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="My Bookings" link2="/ProviderDashboard/Bookings" />
//                     </div>

//                     <div className="jobAlertsBox">
//                         <div className="jobAlertsNoti">
//                             <p>Your current bookings are shown below. They will also be sent to your email.</p>
//                         </div>

//                         <div className="jobAlerts">
//                             <div className="jobAlertsHead">
//                                 <i><MdTaskAlt /></i>
//                                 My Bookings
//                             </div>

//                             {bookings.length === 0 ? (
//                                 <p className="no-bookings-found">No bookings found for you at the moment.</p>
//                             ) : (
//                                 // Map over the fetched bookings data
//                                 bookings.map((booking) => (
//                                     <div className="jobAlert" key={booking.id}>
//                                         <div className="jobAlertEmployer">
//                                             {/* You might want to replace OIF with a dynamic client image if available */}
//                                             <img src={OIF} alt="Client Profile" />
//                                             <div className="jobEmployerTxt">
//                                                 <div className="jobEmployerTxtInfo">
//                                                     <p>{booking.clientFullName}</p>
//                                                     {/* Display clientCompany if available, otherwise just position */}
//                                                     <p>
//                                                         {booking.clientPosition}
//                                                         {booking.clientCompany && `, ${booking.clientCompany}`}
//                                                     </p>
//                                                 </div>

//                                                 <div className="jobEmployerTxtLocation">
//                                                     <p>
//                                                         <i><IoLocationOutline /></i>
//                                                         {booking.city}, {booking.state}
//                                                     </p>
//                                                     <p>
//                                                         <i><LiaGlobeAmericasSolid /></i>
//                                                         {booking.country}
//                                                     </p>
//                                                 </div>

//                                                 <p className='bookingDetails'>
//                                                     <i><LuClock4 /></i>
//                                                     {booking.timeSlot}
//                                                 </p>
//                                                 <p className='bookingDetails'>
//                                                     <i><IoCalendarOutline /></i>
//                                                     {booking.estimatedDuration}
//                                                 </p>
                                                
//                                             </div>
//                                         </div>

//                                         <div className="bookingControls">
//                                             {/* Pass booking ID to messages page if needed for context */}
                                            
//                                             <div className="bookingStatusBox">
//                                               <button className={`bookingStatus ${booking.status.toLowerCase()}`}>
//                                                 <p >
//                                                   {booking.status}
//                                                 </p>
//                                               </button>
//                                             </div>
                                            

//                                             <div className="bookingControls2">
//                                                 <Link to={`/ProviderDashboard/Messages?bookingId=${booking.id}`}>
//                                                     <button className='viewMessageBtn'>View Message</button>
//                                                 </Link>
//                                                 <p className='bookingTime'>
//                                                   {booking.timeAgo} 
//                                                 </p>
//                                             </div>

//                                             <div className="bookingControls3">
//                                               <button class="acceptBtn">
//                                                 <div class="acceptBtnIcon"> 
//                                                   <i><SiTicktick className='accept' title='Accept Booking Request' /></i>
//                                                 </div>
//                                                 <div class="text">Accept</div>
//                                               </button>

//                                               <button class="declineBtn">
//                                                 <div class="acceptBtnIcon"> 
//                                                   <i><MdOutlineCancel className='decline' title='Decline Booking Request' /></i>
//                                                 </div>
//                                                 <div class="text">Decline</div>
//                                               </button>

//                                               <button class="completedBtn">
//                                                 <div class="acceptBtnIcon"> 
//                                                   <i><BiTask className='completed' title='Mark as Completed' /></i>
//                                                 </div>
//                                                 <div class="text">Completed</div>
//                                               </button>


//                                               {/* <i></i>
//                                               <i>></i>
//                                               <i></i> */}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Bookings;
// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import './Bookings.css';
// import DashboardNav from '../../components/DashboardNav/DashboardNav';
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
// import { IoLocationOutline, IoCalendarOutline, IoBriefcaseOutline } from 'react-icons/io5'; // Removed IoBriefcaseOutline as it wasn't used
// import { LuClock4 } from 'react-icons/lu'; // Removed LuMessageSquareText
// import { MdTaskAlt } from 'react-icons/md';
// import { LiaGlobeAmericasSolid } from 'react-icons/lia';
// import { SiTicktick } from 'react-icons/si';
// import { MdOutlineCancel } from 'react-icons/md';
// import { BiTask } from 'react-icons/bi';
// import axios from 'axios';
// import OIF from '../../assets/OIF.jpeg';

// import { AuthContext } from '../../context/AuthContext';

// const Bookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { user } = useContext(AuthContext);

//     const API_BASE_URL = 'http://localhost:9090/api/v1/bookings'; // Define your API base URL

//     // --- Utility function for getting token and config ---
//     const getAuthConfig = () => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             setError("Authentication token not found. Please log in.");
//             setLoading(false);
//             // Consider redirecting to login here if token is crucial
//             return null;
//         }
//         return {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         };
//     };

//     // --- Function to fetch bookings ---
//     const fetchBookings = async () => {
//         setLoading(true);
//         setError(null);

//         const config = getAuthConfig();
//         if (!config) return;

//         try {
//             const response = await axios.get(`${API_BASE_URL}/provider/me`, config);
//             // Sort bookings by creation date in descending order (most recent first)
//             const sortedBookings = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//             setBookings(sortedBookings);
//             console.log("Fetched bookings:", sortedBookings);
//         } catch (err) {
//             console.error("Error fetching provider bookings:", err);
//             if (err.response && err.response.status === 401) {
//                 setError("Session expired or unauthorized. Please log in again.");
//                 // Optionally clear token and redirect to login
//             } else {
//                 setError("Failed to load bookings. Please try again later.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // --- Function to update booking status ---
//     const updateBookingStatus = async (bookingId, newStatus) => {
//         setError(null); // Clear any previous errors before a new action

//         const config = getAuthConfig();
//         if (!config) return;

//         try {
//             // Construct the payload as per your Spring Boot API
//             const payload = { newStatus: newStatus };
            
//             await axios.patch(`${API_BASE_URL}/${bookingId}/status`, payload, config);
            
//             // On successful update, re-fetch bookings to get the latest status
//             // Or, update the state directly for a more immediate UI response
//             setBookings(prevBookings => 
//                 prevBookings.map(booking => 
//                     booking.id === bookingId ? { ...booking, status: newStatus } : booking
//                 )
//             );
//             console.log(`Booking ${bookingId} status updated to ${newStatus}`);
//             // Optionally, show a success message to the user
//         } catch (err) {
//             console.error(`Error updating booking ${bookingId} to ${newStatus}:`, err);
//             if (err.response) {
//                 if (err.response.status === 401) {
//                     setError("Unauthorized: You don't have permission to perform this action or your session expired.");
//                 } else if (err.response.status === 400 || err.response.status === 409) { // 400 for bad request, 409 for conflict (e.g., invalid status transition)
//                     setError(`Error: ${err.response.data.message || 'Invalid status transition or request.'}`);
//                 } else {
//                     setError(`Failed to update status: ${err.response.data.message || 'Server error.'}`);
//                 }
//             } else {
//                 setError("Failed to connect to the server. Please check your network.");
//             }
//         }
//     };

//     // --- Event Handlers for buttons ---
//     const handleAccept = (bookingId) => {
//         updateBookingStatus(bookingId, 'ACCEPTED'); // Use 'ACCEPTED' as per your Java enum
//     };

//     const handleDecline = (bookingId) => {
//         updateBookingStatus(bookingId, 'DECLINED'); // Use 'DECLINED' as per your Java enum
//     };

//     const handleComplete = (bookingId) => {
//         updateBookingStatus(bookingId, 'COMPLETED'); // Use 'COMPLETED' as per your Java enum
//     };


//     useEffect(() => {
//         if (user) {
//             fetchBookings();
//         }
//     }, [user]); // Dependency array: re-run if 'user' object changes

//     // --- UI Render Logic (unchanged from your existing code, but now using `bookings` state) ---
//     if (loading) {
//         return (
//             <div className='bookingBox'>
//                 <ProviderSideNav/>
//                 <div className='bookingBody'>
//                     < DashboardNav />
//                     <div className="bookingDashboard">
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
//             <div className='bookingBox'>
//                 <ProviderSideNav />
//                 <div className='bookingBody'>
//                     < DashboardNav/>
//                     <div className="bookingDashboard">
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
//             <ProviderSideNav />
//             <div className='bookingBody'>
//                 < DashboardNav/>
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
//                                 bookings.map((booking) => (
//                                     <div className="jobAlert" key={booking.id}>
//                                         <div className="jobAlertEmployer">
//                                             <img src={OIF} alt="Client Profile" />
//                                             <div className="jobEmployerTxt">
//                                                 <div className="jobEmployerTxtInfo">
//                                                     <p>{booking.clientFullName}</p>
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
//                                                 {/* <p className='bookingDetails'>
//                                                     <i><IoBriefcaseOutline /></i>
//                                                     {booking.description}
//                                                 </p> */}
//                                             </div>
//                                         </div>

//                                         <div className="bookingControls">
//                                             <div className="bookingStatusBox">
//                                                 <button className={`bookingStatus ${booking.status.toLowerCase()}`}>
//                                                     <p>{booking.status}</p>
//                                                 </button>
//                                             </div>

//                                             <div className="bookingControls2">
//                                                 <Link to={`/ProviderDashboard/Messages?bookingId=${booking.id}`}>
//                                                     <button className='viewMessageBtn'>View Message</button>
//                                                 </Link>
//                                                 <p className='bookingTime'>
//                                                     {booking.timeAgo}
//                                                 </p>
//                                             </div>

//                                             <div className="bookingControls3">
//                                                 {/* Conditionally render buttons based on current status */}
//                                                 {booking.status === 'PENDING' && (
//                                                     <>
//                                                         <button className="acceptBtn" onClick={() => handleAccept(booking.id)}>
//                                                             <div className="acceptBtnIcon">
//                                                                 <i><SiTicktick className='accept' title='Accept Booking Request' /></i>
//                                                             </div>
//                                                             <div className="text">Accept</div>
//                                                         </button>

//                                                         <button className="declineBtn" onClick={() => handleDecline(booking.id)}>
//                                                             <div className="acceptBtnIcon">
//                                                                 <i><MdOutlineCancel className='decline' title='Decline Booking Request' /></i>
//                                                             </div>
//                                                             <div className="text">Decline</div>
//                                                         </button>
//                                                     </>
//                                                 )}

//                                                 {booking.status === 'ACCEPTED' && ( // Only show Completed if booking is ACCEPTED
//                                                     <button className="completedBtn" onClick={() => handleComplete(booking.id)}>
//                                                         <div className="acceptBtnIcon">
//                                                             <i><BiTask className='completed' title='Mark as Completed' /></i>
//                                                         </div>
//                                                         <div className="text">Completed</div>
//                                                     </button>
//                                                 )}
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

// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import './Bookings.css';
// import DashboardNav from '../../components/DashboardNav/DashboardNav';
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
// import { IoLocationOutline, IoCalendarOutline, IoBriefcaseOutline } from 'react-icons/io5';
// import { LuClock4 } from 'react-icons/lu';
// import { MdTaskAlt } from 'react-icons/md';
// import { LiaGlobeAmericasSolid } from 'react-icons/lia';
// import { SiTicktick } from 'react-icons/si';
// import { MdOutlineCancel } from 'react-icons/md';
// import { BiTask } from 'react-icons/bi';
// import axios from 'axios';
// import OIF from '../../assets/OIF.jpeg';
// import { AuthContext } from '../../context/AuthContext';

// const Bookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [activeFilter, setActiveFilter] = useState('ALL'); // New state for active filter
//     const { user } = useContext(AuthContext);

//     const API_BASE_URL = 'http://localhost:9090/api/v1/bookings';

//     // Filter options
//     const filterOptions = [
//         { key: 'ALL', label: 'All Requests', count: 0 },
//         { key: 'PENDING', label: 'New Requests', count: 0 },
//         { key: 'DECLINED', label: 'Declined', count: 0 },
//         { key: 'COMPLETED', label: 'Completed', count: 0 },
//         { key: 'ACCEPTED', label: 'In Progress', count: 0 },
//         { key: 'CANCELLED', label: 'Cancelled', count: 0 }
//     ];

//     // Function to get counts for each status
//     const getFilterCounts = () => {
//         const counts = { ALL: bookings.length };
//         filterOptions.forEach(option => {
//             if (option.key !== 'ALL') {
//                 counts[option.key] = bookings.filter(booking => booking.status === option.key).length;
//             }
//         });
//         return counts;
//     };

//     // Function to filter bookings based on active filter
//     const getFilteredBookings = () => {
//         if (activeFilter === 'ALL') {
//             return bookings;
//         }
//         return bookings.filter(booking => booking.status === activeFilter);
//     };

//     // Utility function for getting token and config
//     const getAuthConfig = () => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             setError("Authentication token not found. Please log in.");
//             setLoading(false);
//             return null;
//         }
//         return {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         };
//     };

//     // Function to fetch bookings
//     const fetchBookings = async () => {
//         setLoading(true);
//         setError(null);

//         const config = getAuthConfig();
//         if (!config) return;

//         try {
//             const response = await axios.get(`${API_BASE_URL}/provider/me`, config);
//             // Sort bookings by creation date in descending order (most recent first)
//             const sortedBookings = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//             setBookings(sortedBookings);
//             console.log("Fetched bookings:", sortedBookings);
//         } catch (err) {
//             console.error("Error fetching provider bookings:", err);
//             if (err.response && err.response.status === 401) {
//                 setError("Session expired or unauthorized. Please log in again.");
//             } else {
//                 setError("Failed to load bookings. Please try again later.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Function to update booking status
//     const updateBookingStatus = async (bookingId, newStatus) => {
//         setError(null);

//         const config = getAuthConfig();
//         if (!config) return;

//         try {
//             const payload = { newStatus: newStatus };
//             await axios.patch(`${API_BASE_URL}/${bookingId}/status`, payload, config);
            
//             // Update the state and maintain sorting
//             setBookings(prevBookings => {
//                 const updatedBookings = prevBookings.map(booking =>
//                     booking.id === bookingId ? { ...booking, status: newStatus } : booking
//                 );
//                 // Re-sort to maintain newest first order
//                 return updatedBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//             });
//             console.log(`Booking ${bookingId} status updated to ${newStatus}`);
//         } catch (err) {
//             console.error(`Error updating booking ${bookingId} to ${newStatus}:`, err);
//             if (err.response) {
//                 if (err.response.status === 401) {
//                     setError("Unauthorized: You don't have permission to perform this action or your session expired.");
//                 } else if (err.response.status === 400 || err.response.status === 409) {
//                     setError(`Error: ${err.response.data.message || 'Invalid status transition or request.'}`);
//                 } else {
//                     setError(`Failed to update status: ${err.response.data.message || 'Server error.'}`);
//                 }
//             } else {
//                 setError("Failed to connect to the server. Please check your network.");
//             }
//         }
//     };

//     // Event Handlers for buttons
//     const handleAccept = (bookingId) => {
//         updateBookingStatus(bookingId, 'ACCEPTED');
//     };

//     const handleDecline = (bookingId) => {
//         updateBookingStatus(bookingId, 'DECLINED');
//     };

//     const handleComplete = (bookingId) => {
//         updateBookingStatus(bookingId, 'COMPLETED');
//     };

//     // Handler for filter button clicks
//     const handleFilterChange = (filterKey) => {
//         setActiveFilter(filterKey);
//     };

//     useEffect(() => {
//         if (user) {
//             fetchBookings();
//         }
//     }, [user]);

//     // Get filtered bookings and counts
//     const filteredBookings = getFilteredBookings();
//     const filterCounts = getFilterCounts();

//     if (loading) {
//         return (
//             <div className='bookingBox'>
//                 <ProviderSideNav/>
//                 <div className='bookingBody'>
//                     <DashboardNav />
//                     <div className="bookingDashboard">
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
//             <div className='bookingBox'>
//                 <ProviderSideNav />
//                 <div className='bookingBody'>
//                     <DashboardNav/>
//                     <div className="bookingDashboard">
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
//             <ProviderSideNav />
//             <div className='bookingBody'>
//                 <DashboardNav/>
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

//                             {/* Filter Buttons */}
//                             <div className="bookingFilters">
//                                 {filterOptions.map(option => (
//                                     <button
//                                         key={option.key}
//                                         className={`filterBtn ${activeFilter === option.key ? 'active' : ''}`}
//                                         onClick={() => handleFilterChange(option.key)}
//                                     >
//                                         {option.label}
//                                         <span className="filterCount">({filterCounts[option.key] || 0})</span>
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Results Summary */}
//                             <div className="filterSummary">
//                                 <p>
//                                     Showing {filteredBookings.length} of {bookings.length} bookings
//                                     {activeFilter !== 'ALL' && ` (${filterOptions.find(f => f.key === activeFilter)?.label})`}
//                                 </p>
//                             </div>

//                             {filteredBookings.length === 0 ? (
//                                 <p className="no-bookings-found">
//                                     {activeFilter === 'ALL' 
//                                         ? "No bookings found for you at the moment." 
//                                         : `No ${filterOptions.find(f => f.key === activeFilter)?.label.toLowerCase()} found.`
//                                     }
//                                 </p>
//                             ) : (
//                                 filteredBookings.map((booking) => (
//                                     <div className="jobAlert" key={booking.id}>
//                                         <div className="jobAlertEmployer">
//                                             <img src={OIF} alt="Client Profile" />
//                                             <div className="jobEmployerTxt">
//                                                 <div className="jobEmployerTxtInfo">
//                                                     <p>{booking.clientFullName}</p>
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
//                                             <div className="bookingStatusBox">
//                                                 <button className={`bookingStatus ${booking.status.toLowerCase()}`}>
//                                                     <p>{booking.status}</p>
//                                                 </button>
//                                             </div>

//                                             <div className="bookingControls2">
//                                                 <Link to={`/ProviderDashboard/Messages?bookingId=${booking.id}`}>
//                                                     <button className='viewMessageBtn'>View Message</button>
//                                                 </Link>
//                                                 <p className='bookingTime'>
//                                                     {booking.timeAgo}
//                                                 </p>
//                                             </div>

//                                             <div className="bookingControls3">
//                                                 {booking.status === 'PENDING' && (
//                                                     <>
//                                                         <button className="acceptBtn" onClick={() => handleAccept(booking.id)}>
//                                                             <div className="acceptBtnIcon">
//                                                                 <i><SiTicktick className='accept' title='Accept Booking Request' /></i>
//                                                             </div>
//                                                             <div className="text">Accept</div>
//                                                         </button>

//                                                         <button className="declineBtn" onClick={() => handleDecline(booking.id)}>
//                                                             <div className="acceptBtnIcon">
//                                                                 <i><MdOutlineCancel className='decline' title='Decline Booking Request' /></i>
//                                                             </div>
//                                                             <div className="text">Decline</div>
//                                                         </button>
//                                                     </>
//                                                 )}

//                                                 {booking.status === 'ACCEPTED' && (
//                                                     <button className="completedBtn" onClick={() => handleComplete(booking.id)}>
//                                                         <div className="acceptBtnIcon">
//                                                             <i><BiTask className='completed' title='Mark as Completed' /></i>
//                                                         </div>
//                                                         <div className="text">Completed</div>
//                                                     </button>
//                                                 )}
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



import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Bookings.css';
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { IoLocationOutline, IoCalendarOutline, IoBriefcaseOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
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
    const [activeFilter, setActiveFilter] = useState('ALL'); // New state for active filter
    const { user } = useContext(AuthContext);

    const API_BASE_URL = 'http://localhost:9090/api/v1/bookings';

    // Filter options
    const filterOptions = [
        // { key: 'ALL', label: 'All Requests', count: 0 },
        { key: 'PENDING', label: 'New Requests', count: 0 },
        { key: 'DECLINED', label: 'Declined', count: 0 },
        { key: 'COMPLETED', label: 'Completed', count: 0 },
        { key: 'ACCEPTED', label: 'In Progress', count: 0 },
        { key: 'CANCELLED', label: 'Cancelled', count: 0 }
    ];

    // Function to get counts for each status
    const getFilterCounts = () => {
        const counts = { ALL: bookings.length };
        filterOptions.forEach(option => {
            if (option.key !== 'ALL') {
                counts[option.key] = bookings.filter(booking => booking.status === option.key).length;
            }
        });
        return counts;
    };

    // Function to filter bookings based on active filter
    const getFilteredBookings = () => {
        if (activeFilter === 'ALL') {
            return bookings;
        }
        return bookings.filter(booking => booking.status === activeFilter);
    };

    // Utility function for getting token and config
    const getAuthConfig = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            return null;
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    // Function to parse timeAgo and convert to sortable timestamp
    const parseTimeAgo = (timeAgo) => {
        const now = new Date();
        const timeAgoLower = timeAgo.toLowerCase();
        
        if (timeAgoLower.includes('just now') || timeAgoLower.includes('now')) {
            return now;
        }
        
        const match = timeAgoLower.match(/(\d+)\s*(second|minute|hour|day|week|month|year)s?\s*ago/);
        if (!match) return now;
        
        const value = parseInt(match[1]);
        const unit = match[2];
        
        const result = new Date(now);
        
        switch(unit) {
            case 'second':
                result.setSeconds(result.getSeconds() - value);
                break;
            case 'minute':
                result.setMinutes(result.getMinutes() - value);
                break;
            case 'hour':
                result.setHours(result.getHours() - value);
                break;
            case 'day':
                result.setDate(result.getDate() - value);
                break;
            case 'week':
                result.setDate(result.getDate() - (value * 7));
                break;
            case 'month':
                result.setMonth(result.getMonth() - value);
                break;
            case 'year':
                result.setFullYear(result.getFullYear() - value);
                break;
            default:
                return now;
        }
        
        return result;
    };

    // Function to fetch bookings
    const fetchBookings = async () => {
        setLoading(true);
        setError(null);

        const config = getAuthConfig();
        if (!config) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/provider/me`, config);
            // Sort bookings by parsing timeAgo (most recent first)
            const sortedBookings = response.data.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : parseTimeAgo(a.timeAgo);
                const dateB = b.createdAt ? new Date(b.createdAt) : parseTimeAgo(b.timeAgo);
                return dateB - dateA;
            });
            setBookings(sortedBookings);
            console.log("Fetched bookings:", sortedBookings);
        } catch (err) {
            console.error("Error fetching provider bookings:", err);
            if (err.response && err.response.status === 401) {
                setError("Session expired or unauthorized. Please log in again.");
            } else {
                setError("Failed to load bookings. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Function to update booking status
    const updateBookingStatus = async (bookingId, newStatus) => {
        setError(null);

        const config = getAuthConfig();
        if (!config) return;

        try {
            const payload = { newStatus: newStatus };
            await axios.patch(`${API_BASE_URL}/${bookingId}/status`, payload, config);
            
            // Update the state and maintain sorting
            setBookings(prevBookings => {
                const updatedBookings = prevBookings.map(booking =>
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                );
                // Re-sort to maintain newest first order using timeAgo parsing
                return updatedBookings.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt) : parseTimeAgo(a.timeAgo);
                    const dateB = b.createdAt ? new Date(b.createdAt) : parseTimeAgo(b.timeAgo);
                    return dateB - dateA;
                });
            });
            console.log(`Booking ${bookingId} status updated to ${newStatus}`);
        } catch (err) {
            console.error(`Error updating booking ${bookingId} to ${newStatus}:`, err);
            if (err.response) {
                if (err.response.status === 401) {
                    setError("Unauthorized: You don't have permission to perform this action or your session expired.");
                } else if (err.response.status === 400 || err.response.status === 409) {
                    setError(`Error: ${err.response.data.message || 'Invalid status transition or request.'}`);
                } else {
                    setError(`Failed to update status: ${err.response.data.message || 'Server error.'}`);
                }
            } else {
                setError("Failed to connect to the server. Please check your network.");
            }
        }
    };

    // Event Handlers for buttons
    const handleAccept = (bookingId) => {
        updateBookingStatus(bookingId, 'ACCEPTED');
    };

    const handleDecline = (bookingId) => {
        updateBookingStatus(bookingId, 'DECLINED');
    };

    const handleComplete = (bookingId) => {
        updateBookingStatus(bookingId, 'COMPLETED');
    };

    
    const handleFilterChange = (filterKey) => {
        setActiveFilter(filterKey);
    };

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    // Get filtered bookings and counts
    const filteredBookings = getFilteredBookings();
    const filterCounts = getFilterCounts();

    if (loading) {
        return (
            <div className='bookingBox'>
                <ProviderSideNav/>
                <div className='bookingBody'>
                    <DashboardNav />
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
                    <DashboardNav/>
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
                <DashboardNav/>
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

                            {/* Filter Buttons */}
                            <div className="bookingFilters">
                                {filterOptions.map(option => (
                                    <button
                                        key={option.key}
                                        className={`filterBtn ${activeFilter === option.key ? 'active' : ''}`}
                                        onClick={() => handleFilterChange(option.key)}
                                    >
                                        {option.label}
                                        <span className="filterCount">{filterCounts[option.key] || 0}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Results Summary */}
                            <div className="filterSummary">
                                <p>
                                    Showing {filteredBookings.length} of {bookings.length} bookings
                                    {activeFilter !== 'ALL' && ` (${filterOptions.find(f => f.key === activeFilter)?.label})`}
                                </p>
                            </div>



                            {filteredBookings.length === 0 ? (
                                <p className="no-bookings-found">
                                    {activeFilter === 'ALL' 
                                        ? "No bookings found for you at the moment." 
                                        : `No ${filterOptions.find(f => f.key === activeFilter)?.label.toLowerCase()} found.`
                                    }
                                </p>
                            ) : (
                                <table className="booking-table">
                                    <thead className="booking-table-header">
                                        <tr>
                                            <th>Client</th>
                                            <th>Service Details</th>
                                            <th>Location</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredBookings.map((booking) => (
                                            <tr className="booking-table-row" key={booking.id}>
                                                <td className="booking-table-cell" data-label="Client">
                                                    <div className="client-info">
                                                        <img src={booking.profilePictureUrl} alt="Client Profile" className="client-avatar" />
                                                        <div className="client-details">
                                                            <h4>{booking.clientFullName}</h4>
                                                            <p>
                                                                {booking.clientPosition}
                                                                {booking.clientCompany && `, ${booking.clientCompany}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td className="booking-table-cell" data-label="Service Details">
                                                    <div className="service-details">
                                                        <div className="service-details-item">
                                                            <i><LuClock4 /></i>
                                                            <span>{booking.timeSlot}</span>
                                                        </div>
                                                        <div className="service-details-item">
                                                            <i><IoCalendarOutline /></i>
                                                            <span>{booking.estimatedDuration}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td className="booking-table-cell" data-label="Location">
                                                    <div className="location-info">
                                                        <div className="location-item">
                                                            <i><IoLocationOutline /></i>
                                                            <span>{booking.city}, {booking.state}</span>
                                                        </div>
                                                        <div className="location-item">
                                                            <i><LiaGlobeAmericasSolid /></i>
                                                            <span>{booking.country}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td className="booking-table-cell status-cell" data-label="Status">
                                                    <div className={`bookingStatus ${booking.status.toLowerCase()}`}>
                                                        {booking.status}
                                                    </div>
                                                </td>
                                                
                                                <td className="booking-table-cell" data-label="Actions">
                                                    <div className="actions-cell">
                                                        <Link to={`/ProviderDashboard/Messages?bookingId=${booking.id}`}>
                                                            <button className='viewMessageBtn'>View Message</button>
                                                        </Link>
                                                        
                                                        
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

                                                            {booking.status === 'ACCEPTED' && (
                                                                <button className="completedBtn" onClick={() => handleComplete(booking.id)}>
                                                                    <div className="acceptBtnIcon">
                                                                        <i><BiTask className='completed' title='Mark as Completed' /></i>
                                                                    </div>
                                                                    <div className="text">Completed</div>
                                                                </button>
                                                            )}
                                                                                                        </div>
                                                </td>
                                                
                                                <td className="booking-table-cell time-cell" data-label="Time">
                                                    {booking.timeAgo}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
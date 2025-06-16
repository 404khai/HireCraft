import React, { useState, useEffect, useContext } from 'react'; // Added useState, useEffect, useContext
import { Link } from 'react-router-dom';
import './ClientBookings.css';
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { IoLocationOutline, IoBriefcaseOutline, IoCalendarOutline } from 'react-icons/io5';
import { LuClock4, LuMessageSquareText } from 'react-icons/lu';
import { MdTaskAlt } from 'react-icons/md';
import { LiaGlobeAmericasSolid } from 'react-icons/lia';
import { SiTicktick } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { BiTask } from 'react-icons/bi';
import axios from 'axios'; // Import axios
import OIF from '../../assets/OIF.jpeg'; // Assuming this is a placeholder or default image

// You'll likely need AuthContext to get the user's token for authentication
import { AuthContext } from '../../context/AuthContext';
import ClientSideNav from '../../components/ClientSideNav/ClientSideNav';


const ClientBookings = () => {
    const [clientBookings, setClientBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext); // Access user from AuthContext for token if needed

    // Function to fetch bookings
    const fetchClientBookings = async () => {
        setLoading(true); // Set loading to true when fetching starts
        setError(null); // Clear any previous errors

        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) {
                // Handle case where token is not found (e.g., redirect to login)
                setError("Authentication token not found. Please log in.");
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
                }
            };

            const response = await axios.get('http://localhost:9090/api/v1/bookings/client/me', config);
            setClientBookings(response.data); // Set the fetched data to state
            console.log("Fetched bookings:", response.data); // Log the data to console for verification
        } catch (err) {
            console.error("Error fetching provider bookings:", err);
            setError("Failed to load bookings. Please try again later."); // Set error message
            // You might want to handle different error statuses, e.g., 401 for unauthorized
        } finally {
            setLoading(false); // Set loading to false once fetching is complete
        }
    };

    // Use useEffect to call fetchBookings when the component mounts
    useEffect(() => {
        if (user) { // Only fetch if user data is available (i.e., user is logged in)
            fetchClientBookings();
        }
    }, [user]); // Dependency array: re-run if 'user' object changes (e.g., after login)


    // Render loading, error, or data
    if (loading) {
        return (
            <div className='dashboardBox'>
                <DashboardNav />
                <div className='dashboardBody'>
                    <ClientSideNav />
                    <div className="dashboard">
                        <div className="welcome">
                            <div className="welcomeTxt">
                                <h2>My Bookings</h2>
                            </div>
                            <Breadcrumbs firstLink="Dashboard" link="/ClientDashboard" secondLink="My Bookings" link2="/ClientDashboard/Bookings" />
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
            <div className='dashboardBox'>
                <DashboardNav />
                <div className='dashboardBody'>
                    <ClientSideNav />
                    <div className="dashboard">
                        <div className="welcome">
                            <div className="welcomeTxt">
                                <h2>My Bookings</h2>
                            </div>
                            <Breadcrumbs firstLink="Dashboard" link="/ClientDashboard" secondLink="My Bookings" link2="/ClientDashboard/Bookings" />
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
            <DashboardNav />
            <div className='bookingBody'>
                <ClientSideNav />
                <div className="bookingDashboard">
                    <div className="welcome">
                        <div className="welcomeTxt">
                            <h2>My Bookings</h2>
                        </div>
                        <Breadcrumbs firstLink="Dashboard" link="/ClientDashboard" secondLink="My Bookings" link2="/ClientDashboard/Bookings" />
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

                            {clientBookings.length === 0 ? (
                                <p className="no-bookings-found">No bookings found for you at the moment.</p>
                            ) : (
                                // Map over the fetched bookings data
                                clientBookings.map((clientBooking) => (
                                    <div className="jobAlert" key={clientBooking.id}>
                                        <div className="jobAlertEmployer">
                                            {/* You might want to replace OIF with a dynamic client image if available */}
                                            <img src={OIF} alt="Client Profile" />
                                            <div className="jobEmployerTxtClient">
                                                <div className="jobEmployerTxtInfo">
                                                    <p>{clientBooking.providerFullName}</p>
                                                    {/* Display clientCompany if available, otherwise just position */}
                                                    <p>
                                                        {clientBooking.occupation}
                                                    </p>
                                                </div>

                                                <div className="jobEmployerTxtLocation">
                                                    <p>
                                                        <i><IoLocationOutline /></i>
                                                        {clientBooking.city}, {clientBooking.state}
                                                    </p>
                                                    <p>
                                                        <i><LiaGlobeAmericasSolid /></i>
                                                        {clientBooking.country}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bookingControls">
                                            {/* Pass booking ID to messages page if needed for context */}
                                            
                                            <button className={`bookingStatus ${clientBooking.status.toLowerCase()}`}>
                                              <p >
                                                {clientBooking.status}
                                              </p>
                                            </button>

                                            <div className="bookingControls2">
                                                <Link to={`/ProviderDashboard/Messages?bookingId=${clientBooking.id}`}>
                                                    <button className='viewMessageBtn'>View Message</button>
                                                </Link>
                                                <div className="bookingControls3">
                                                  <i><MdOutlineCancel className='decline' title='Cancel Booking Request' /></i>
                                                  {/* {booking.status === 'PENDING' && (
                                                      <>
                                                          <i><SiTicktick className='accept' title='Accept Booking Request' /></i>
                                                          <i><MdOutlineCancel className='decline' title='Decline Booking Request' /></i>
                                                      </>
                                                  )}
                                                  {booking.status === 'CONFIRMED' && (
                                                      <i><BiTask className='completed' title='Mark as Completed' /></i>
                                                  )} */}
                                                </div>
                                                <p className='bookingTime'>
                                                  {clientBooking.timeAgo} 
                                                </p>
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

export default ClientBookings;
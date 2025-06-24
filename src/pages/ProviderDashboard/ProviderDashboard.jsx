// import React, {useContext, useState, useEffect} from 'react'
// import './ProviderDashboard.css'
// import DashboardNav from '../../components/DashboardNav/DashboardNav'
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
// import { IoBriefcaseOutline} from "react-icons/io5";
// import { HiArrowTrendingUp } from "react-icons/hi2";
// import { FaDollarSign, FaBriefcase, FaRegMessage } from "react-icons/fa6";
// import { MdMarkUnreadChatAlt } from "react-icons/md";
// import BookingLineChart from '../../components/BookingLineChart'
// import { AuthContext } from '../../context/AuthContext'

// const ProviderDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const token = localStorage.getItem('token');
  
//   const [firstName, setFirstName] = useState('');

//   useEffect(() => {
//       if (user) {
//         setFirstName(user.firstName || '');
//       }
//     }, [user]);

//   return (
//     <div className='dashboardBox'>
//       <DashboardNav/>
//       <div className='dashboardBody'>
//           <ProviderSideNav/>
//           {/* <EmployerSideNav/> */}
//           <div className="dashboard">
//             <div className="welcome">
//               <div className="welcomeTxt">
//                 <h2>Welcome, {firstName}</h2>
//                 <p style={{color: "#888"}}>We are glad to see you again!</p>
//               </div>

//               <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Home" link2="/ProviderDashboard"/>
//             </div>

//             <div className="overview">
//                 <div className="jobReqOverview">
//                   <i className='jobReqOverviewIcon'><FaBriefcase/></i>
//                   <div className="overviewTxt">
//                     <p className='overviewTxtTitle'>New Booking Requests</p>
//                     <p className='overviewTxtValue'>50</p>
//                   </div>
//                 </div>

//                 <div className="earningsOverview">
//                   <i className='earningsOverviewIcon'><FaDollarSign/></i>
//                   <div className="overviewTxt">
//                     <p className='overviewTxtTitle'>Daily Earnings</p>
//                     <p className='overviewTxtValue'>$50</p>
//                   </div>
//                 </div>

//                 <div className="unreadNotisOverview">
//                   <i className='unreadNotisOverviewIcon'><MdMarkUnreadChatAlt/></i>
//                   <div className="overviewTxt">
//                     <p className='overviewTxtTitle'>Unread Messages</p>
//                     <p className='overviewTxtValue'>3</p>
//                   </div>
//                 </div>
//             </div>

//             <BookingLineChart />
//           </div>
          
//       </div>
//     </div>
//   )
// }

// export default ProviderDashboard

import React, {useContext, useState, useEffect} from 'react'
import './ProviderDashboard.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoBriefcaseOutline} from "react-icons/io5";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { FaDollarSign, FaBriefcase, FaRegMessage } from "react-icons/fa6";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { FaStar, FaClock, FaUsers, FaCalendarAlt, FaCheckCircle, FaBalanceScale } from "react-icons/fa";
import { IoNotifications, IoTime } from "react-icons/io5";
import { SiTicktick } from 'react-icons/si';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import BookingLineChart from '../../components/BookingLineChart'
import { AuthContext } from '../../context/AuthContext'

const ProviderDashboard = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  
  const [firstName, setFirstName] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [timeFilter, setTimeFilter] = useState('7days');
  const [newBookingRequestsToday, setNewBookingRequestsToday] = useState(0);
  const [jobsCompleted, setJobsCompleted] = useState(0);
  const [totalAcceptedJobs, setTotalAcceptedJobs] = useState(0);
  // Placeholders for other dynamic data you might add later
  const [dailyEarnings, setDailyEarnings] = useState(0); 
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [completionRate, setCompletionRate] = useState('0%');

  // Mock data for new features
  const todaySchedule = [
    { time: '09:00', client: 'John Smith', service: 'Pipe Repair', status: 'confirmed' },
    { time: '14:00', client: 'Sarah Johnson', service: 'Electrical Fix', status: 'pending' },
    { time: '16:30', client: 'Mike Brown', service: 'Kitchen Repair', status: 'confirmed' }
  ];

  const notifications = [
    { type: 'urgent', text: 'New message from John Smith', time: '2 min ago' },
    { type: 'booking', text: 'Booking reminder: 2:00 PM appointment', time: '1 hour ago' },
    { type: 'payment', text: 'Payment of $450 received', time: '3 hours ago' },
    { type: 'review', text: 'New 5-star review received', time: '5 hours ago' }
  ];

  const performanceMetrics = {
    responseTime: '12 min',
    completionRate: '92%',
    repeatCustomers: '68%',
    weeklyGrowth: '+15%'
  };

  const servicePerformance = [
    { service: 'Plumbing', bookings: 15, revenue: 1200 },
    { service: 'Electrical', bookings: 8, revenue: 950 },
    { service: 'Carpentry', bookings: 12, revenue: 800 },
    { service: 'Painting', bookings: 6, revenue: 480 }
  ];

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setAverageRating(user.averageRating !== undefined && user.averageRating !== null ? user.averageRating : 0);
    }

    // Function to fetch new booking requests for today
    const fetchNewBookingRequestsToday = async () => {
      if (!token) return; // Don't fetch if no token

      try {
        const response = await fetch('http://localhost:9090/api/v1/bookings/provider/dashboard/new-requests-today', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const count = await response.json();
          setNewBookingRequestsToday(count);
        } else {
          console.error('Failed to fetch new booking requests today:', response.status, response.statusText);
          setNewBookingRequestsToday(0); // Default to 0 on error
        }
      } catch (error) {
        console.error('Error fetching new booking requests today:', error);
        setNewBookingRequestsToday(0); // Default to 0 on error
      }
    };

    // Function to fetch total completed jobs
    const fetchCompletedJobs = async () => {
      if (!token) return; // Don't fetch if no token

      try {
        const response = await fetch('http://localhost:9090/api/v1/bookings/provider/dashboard/completed-jobs', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const count = await response.json();
          setJobsCompleted(count);
        } else {
          console.error('Failed to fetch completed jobs:', response.status, response.statusText);
          setJobsCompleted(0); // Default to 0 on error
        }
      } catch (error) {
        console.error('Error fetching completed jobs:', error);
        setJobsCompleted(0); // Default to 0 on error
      }
    };

    const fetchTotalAcceptedJobs = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://localhost:9090/api/v1/bookings/provider/dashboard/accepted-jobs', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const count = await response.json();
          setTotalAcceptedJobs(count); // Update the state
        } else {
          console.error('Failed to fetch total accepted jobs:', response.status, response.statusText);
          setTotalAcceptedJobs(0); 
        }
      } catch (error) {
        console.error('Error fetching total accepted jobs:', error);
        setTotalAcceptedJobs(0); 
      }
    };

    const fetchTotalReviewsForProvider = async () => {
    if (!token) return;
      try {
        const response = await fetch('http://localhost:9090/api/v1/reviews/provider/dashboard/total-reviews', { // Correct URL
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const count = await response.json();
          setTotalReviews(count);
        } else {
          console.error('Failed to fetch total reviews:', response.status, response.statusText);
          setTotalReviews(0);
        }
      } catch (error) {
        console.error('Error fetching total reviews:', error);
        setTotalReviews(0);
      }
    };

    // Call the fetch functions when the component mounts or token changes
    if (token) {
      fetchNewBookingRequestsToday();
      fetchCompletedJobs();
      fetchTotalAcceptedJobs();
      fetchTotalReviewsForProvider();
      // You can add calls for daily earnings, unread messages, average rating, etc. here once their backend endpoints are ready.
      // Example for Daily Earnings (assuming you create a similar endpoint):
      // const fetchDailyEarnings = async () => {
      //   try {
      //     const response = await fetch('http://localhost:8080/api/earnings/provider/daily', { headers: { 'Authorization': `Bearer ${token}` } });
      //     if (response.ok) {
      //       const amount = await response.json();
      //       setDailyEarnings(amount);
      //     }
      //   } catch (error) { console.error('Error fetching daily earnings:', error); }
      // };
      // fetchDailyEarnings();
    }

  }, [user, token]);

  useEffect(() => {
      if (totalAcceptedJobs > 0) {
          const rate = (jobsCompleted / totalAcceptedJobs) * 100;
          setCompletionRate(`${rate.toFixed(1)}%`); // Format to one decimal place
      } else {
          setCompletionRate('0%'); // If no jobs accepted, rate is 0%
      }
  }, [jobsCompleted, totalAcceptedJobs]);

  return (
    <div className='dashboardBox'>
      <style jsx>{`
        .toggle-switch {
          position: relative;
          width: 50px;
          height: 24px;
          background: ${isAvailable ? '#28a745' : '#6c757d'};
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .toggle-slider {
          position: absolute;
          top: 2px;
          left: ${isAvailable ? '26px' : '2px'};
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: left 0.3s;
        } 
      `}</style>

      <ProviderSideNav/>
      <div className='dashboardBody'>
        <DashboardNav/>
        <div className="dashboard">
          <div className="welcome">
            <div className="welcomeTxt">
              <h2>Welcome, {firstName}</h2>
              <p style={{color: "#888"}}>We are glad to see you again!</p>
            </div>
            <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Home" link2="/ProviderDashboard"/>
          </div>

          {/* Availability Toggle */}
          {/* <div className="availability-section">
            <div className="availability-toggle">
              <span>{isAvailable ? 'Available for bookings' : 'Currently unavailable'}</span>
              <div 
                className="toggle-switch" 
                onClick={() => setIsAvailable(!isAvailable)}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div> */}

          {/* Enhanced Overview Cards */}
          <div className="enhanced-overview">
            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">New Booking Requests</div>
                <div className="overviewTxtValue" style={{color: 'tomato'}}>{newBookingRequestsToday}</div>
                <div className="metric-change positive">
                  <HiArrowTrendingUp size={12} />
                  8 new today
                </div>
              </div>
              <i className='jobReqOverviewIcon'><FaBriefcase/></i>
            </div>

            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">Daily Earnings</div>
                <div className="overviewTxtValue" style={{color: 'darkturquoise'}}>$450</div>
                <div className="metric-change positive">
                  <HiArrowTrendingUp size={12} />
                  +12% vs yesterday
                </div>
              </div>
              <i className='earningsOverviewIcon'><FaDollarSign/></i>
            </div>

            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">Unread Messages</div>
                <div className="overviewTxtValue" style={{color: 'purple'}}>7</div>
                <div className="metric-change negative">
                  <FaClock size={12} />
                  3 urgent responses
                </div>
              </div>
              <i className='unreadNotisOverviewIcon'><MdMarkUnreadChatAlt/></i>
            </div>

            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">Average Rating</div>
                <div className="overviewTxtValue" style={{color: '#ffc107'}}>{averageRating.toFixed(1)}</div>
                <div className="metric-change positive">
                  <FaStar size={12} />
                  {totalReviews} client reviews
                </div>
              </div>
              <i style={{color: '#ffc107', background: '#fff8dc', fontSize: '30px', padding: '10px', borderRadius: '5px'}}><FaStar/></i>
            </div>

            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">Jobs Completed</div>
                <div className="overviewTxtValue" style={{color: '#28a745'}}>{jobsCompleted}</div>
              </div>
              <i className='jobsDoneIcon'><SiTicktick/></i>
            </div>

            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">Completion Rate</div>
                <div className="overviewTxtValue" style={{color: 'darkred'}}>{completionRate}</div>
              </div>
              <i className='completionRateIcon'><FaBalanceScale/></i>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="dashboard-grid">
            <div>
              <BookingLineChart />
            </div>

            <div className="sidebar-section">
              {/* Today's Schedule */}
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <FaCalendarAlt size={16} />
                  Today's Schedule
                </div>
                <div className="sidebar-content">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="schedule-item">
                      <div className="schedule-time">{item.time}</div>
                      <div className="schedule-details">
                        <div className="schedule-client">{item.client}</div>
                        <div className="schedule-service">{item.service}</div>
                      </div>
                      <div className={`status-badge status-${item.status}`}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <IoNotifications size={16} />
                  Recent Notifications
                </div>
                <div className="sidebar-content">
                  {notifications.map((notification, index) => (
                    <div key={index} className="notification-item">
                      <div className={`notification-dot ${notification.type === 'urgent' ? 'urgent' : ''}`}></div>
                      <div className="notification-content">
                        <div className="notification-text">{notification.text}</div>
                        <div className="notification-time">{notification.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <div className="action-card">
              <div className="action-icon">
                <FaRegMessage size={20} />
              </div>
              <div className="action-title">Message Center</div>
              <div className="action-description">Respond to client messages</div>
            </div>

            <div className="action-card">
              <div className="action-icon">
                <FaCalendarAlt size={20} />
              </div>
              <div className="action-title">Manage Bookings</div>
              <div className="action-description">View and update appointments</div>
            </div>

            <div className="action-card">
              <div className="action-icon">
                <FaDollarSign size={20} />
              </div>
              <div className="action-title">Payment History</div>
              <div className="action-description">Track earnings and payments</div>
            </div>

            <div className="action-card">
              <div className="action-icon">
                <FaUsers size={20} />
              </div>
              <div className="action-title">Client Reviews</div>
              <div className="action-description">Manage feedback and ratings</div>
            </div>
          </div>

          
           
        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard
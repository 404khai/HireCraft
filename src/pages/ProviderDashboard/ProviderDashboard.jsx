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
    }
  }, [user]);

  return (
    <div className='dashboardBox'>
      <style jsx>{`
        /* Enhanced styles for new features */
        .availability-section {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #333;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          align-self: end
        }

        .availability-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
        }

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

        .enhanced-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          width: 90%;
          margin-bottom: 30px;
        }

        .metric-card-enhanced {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: transform 0.2s;
        }

        .metric-card-enhanced:hover {
          transform: translateY(-2px);
        }

        .metric-info {
          flex: 1;
        }

        .metric-change {
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 5px;
        }

        .metric-change.positive {
          color: #28a745;
        }

        .metric-change.negative {
          color: #dc3545;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          width: 90%;
          margin-bottom: 30px;
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sidebar-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .sidebar-header {
          padding: 15px 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          font-weight: 600;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sidebar-content {
          padding: 15px 20px;
        }

        .schedule-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .schedule-item:last-child {
          border-bottom: none;
        }

        .schedule-time {
          font-weight: 600;
          color: #007bff;
          min-width: 60px;
        }

        .schedule-details {
          flex: 1;
          margin-left: 15px;
        }

        .schedule-client {
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 2px;
        }

        .schedule-service {
          font-size: 12px;
          color: #6c757d;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
        }

        .status-confirmed {
          background: #d4edda;
          color: #155724;
        }

        .status-pending {
          background: #fff3cd;
          color: #856404;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #007bff;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .notification-dot.urgent {
          background: #dc3545;
        }

        .notification-content {
          flex: 1;
        }

        .notification-text {
          font-size: 14px;
          color: #2c3e50;
          margin-bottom: 2px;
        }

        .notification-time {
          font-size: 12px;
          color: #6c757d;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          width: 90%;
          margin-bottom: 30px;
        }

        .action-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }

        .action-card:hover {
          transform: translateY(-2px);
          border-color: #35D07D;
        }

        .action-icon {
          width: 40px;
          height: 40px;
          margin: 0 auto 10px;
          background: #f8f9fa;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #35D07D;
        }

        .action-title {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .action-description {
          font-size: 12px;
          color: #6c757d;
        }

        .performance-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          width: 90%;
          margin-bottom: 30px;
        }

        .performance-card {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .performance-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .performance-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 20px 0;
        }

        .performance-metric {
          text-align: center;
        }

        .performance-metric-label {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 5px;
        }

        .performance-metric-value {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
        }

        /* Responsive design */
        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .performance-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            margin-left: 0;
            width: 100%;
          }
          
          .enhanced-overview {
            grid-template-columns: 1fr;
          }
          
          .quick-actions {
            grid-template-columns: 1fr;
          }
          
          .performance-metrics {
            grid-template-columns: 1fr;
          }
          
          .availability-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .overview {
            flex-direction: column;
            height: auto;
            gap: 15px;
          }
          
          .jobReqOverview, .profileViewsOverview, .earningsOverview, .unreadNotisOverview {
            width: 100%;
          }
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
                <div className="overviewTxtValue" style={{color: 'tomato'}}>50</div>
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
                <div className="overviewTxtValue" style={{color: '#ffc107'}}>4.8</div>
                <div className="metric-change positive">
                  <FaStar size={12} />
                  6 client reviews
                </div>
              </div>
              <i style={{color: '#ffc107', background: '#fff8dc', fontSize: '30px', padding: '10px', borderRadius: '5px'}}><FaStar/></i>
            </div>

            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">Jobs Done</div>
                <div className="overviewTxtValue" style={{color: '#28a745'}}>2</div>
              </div>
              <i className='jobsDoneIcon'><SiTicktick/></i>
            </div>

            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">Completion Rate</div>
                <div className="overviewTxtValue" style={{color: 'darkred'}}>87.5%</div>
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
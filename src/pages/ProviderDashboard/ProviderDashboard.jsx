import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MessageCircle, DollarSign, Calendar, Clock, Star, TrendingUp, Users, CheckCircle } from 'lucide-react';

const ProviderDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('7days');
  const [isAvailable, setIsAvailable] = useState(true);

  // Mock data - replace with actual API calls
  const bookingTrends = [
    { date: '2024-06-17', completed: 5, rejected: 1, pending: 2, revenue: 450 },
    { date: '2024-06-18', completed: 3, rejected: 2, pending: 1, revenue: 280 },
    { date: '2024-06-19', completed: 7, rejected: 0, pending: 3, revenue: 620 },
    { date: '2024-06-20', completed: 4, rejected: 1, pending: 2, revenue: 380 },
    { date: '2024-06-21', completed: 6, rejected: 2, pending: 1, revenue: 540 },
    { date: '2024-06-22', completed: 8, rejected: 1, pending: 4, revenue: 720 },
    { date: '2024-06-23', completed: 5, rejected: 0, pending: 3, revenue: 450 }
  ];

  const servicePerformance = [
    { service: 'Plumbing', bookings: 15, revenue: 1200 },
    { service: 'Electrical', bookings: 8, revenue: 950 },
    { service: 'Carpentry', bookings: 12, revenue: 800 },
    { service: 'Painting', bookings: 6, revenue: 480 }
  ];

  const todaySchedule = [
    { time: '09:00', client: 'John Smith', service: 'Pipe Repair', status: 'confirmed' },
    { time: '14:00', client: 'Sarah Johnson', service: 'Electrical Fix', status: 'pending' },
    { time: '16:30', client: 'Mike Brown', service: 'Kitchen Repair', status: 'confirmed' }
  ];

  const notifications = [
    { type: 'message', text: 'New message from John Smith', urgent: true },
    { type: 'booking', text: 'Booking reminder: 2:00 PM appointment', urgent: false },
    { type: 'payment', text: 'Payment of $450 received', urgent: false },
    { type: 'review', text: 'New 5-star review received', urgent: false }
  ];

  const conversionRate = bookingTrends.map(day => ({
    ...day,
    conversionRate: ((day.completed / (day.completed + day.rejected + day.pending)) * 100).toFixed(1)
  }));

  return (
    <div className="provider-dashboard">
      <style jsx>{`
        .provider-dashboard {
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .availability-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .metric-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: transform 0.2s;
        }

        .metric-card:hover {
          transform: translateY(-2px);
        }

        .metric-info {
          flex: 1;
        }

        .metric-label {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 5px;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .metric-change {
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .metric-change.positive {
          color: #28a745;
        }

        .metric-change.negative {
          color: #dc3545;
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .icon-messages { background: #007bff; }
        .icon-earnings { background: #28a745; }
        .icon-bookings { background: #ffc107; }
        .icon-rating { background: #17a2b8; }

        .dashboard-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }

        .chart-section {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
        }

        .time-filter {
          display: flex;
          gap: 8px;
        }

        .filter-btn {
          padding: 6px 12px;
          border: 1px solid #dee2e6;
          background: white;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sidebar-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .sidebar-header {
          padding: 15px 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          font-weight: 600;
          color: #2c3e50;
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
        }

        .schedule-details {
          flex: 1;
          margin-left: 15px;
        }

        .schedule-client {
          font-weight: 500;
          color: #2c3e50;
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
          align-items: center;
          gap: 10px;
          padding: 10px 0;
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
        }

        .notification-dot.urgent {
          background: #dc3545;
        }

        .notification-text {
          flex: 1;
          font-size: 14px;
          color: #2c3e50;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .action-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }

        .action-card:hover {
          transform: translateY(-2px);
          border-color: #007bff;
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
          color: #007bff;
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

        .performance-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-top: 30px;
        }

        .performance-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .performance-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
          
          .performance-grid {
            grid-template-columns: 1fr;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dashboard-header">
        <h1 className="dashboard-title">Provider Dashboard</h1>
        <div className="availability-toggle">
          <span>Available for bookings</span>
          <div 
            className="toggle-switch" 
            onClick={() => setIsAvailable(!isAvailable)}
          >
            <div className="toggle-slider"></div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-info">
            <div className="metric-label">Unread Messages</div>
            <div className="metric-value">7</div>
            <div className="metric-change positive">
              <TrendingUp size={12} />
              3 new today
            </div>
          </div>
          <div className="metric-icon icon-messages">
            <MessageCircle size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <div className="metric-label">Today's Earnings</div>
            <div className="metric-value">$450</div>
            <div className="metric-change positive">
              <TrendingUp size={12} />
              +12% vs yesterday
            </div>
          </div>
          <div className="metric-icon icon-earnings">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <div className="metric-label">Pending Requests</div>
            <div className="metric-value">4</div>
            <div className="metric-change negative">
              <Clock size={12} />
              2 need response
            </div>
          </div>
          <div className="metric-icon icon-bookings">
            <Calendar size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <div className="metric-label">Average Rating</div>
            <div className="metric-value">4.8</div>
            <div className="metric-change positive">
              <Star size={12} />
              92% completion rate
            </div>
          </div>
          <div className="metric-icon icon-rating">
            <Star size={24} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="chart-section">
          <div className="chart-header">
            <h3 className="chart-title">Booking Trends & Revenue</h3>
            <div className="time-filter">
              {['7days', '30days', '90days'].map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${timeFilter === filter ? 'active' : ''}`}
                  onClick={() => setTimeFilter(filter)}
                >
                  {filter === '7days' ? 'Last 7 days' : 
                   filter === '30days' ? 'Last 30 days' : 'Last 90 days'}
                </button>
              ))}
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionRate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="completed" stroke="#28a745" strokeWidth={2} name="Completed" />
              <Line yAxisId="left" type="monotone" dataKey="rejected" stroke="#dc3545" strokeWidth={2} name="Rejected" />
              <Line yAxisId="left" type="monotone" dataKey="pending" stroke="#ffc107" strokeWidth={2} name="Pending" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#007bff" strokeWidth={2} name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="sidebar">
          <div className="sidebar-card">
            <div className="sidebar-header">Today's Schedule</div>
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

          <div className="sidebar-card">
            <div className="sidebar-header">Notifications</div>
            <div className="sidebar-content">
              {notifications.map((notification, index) => (
                <div key={index} className="notification-item">
                  <div className={`notification-dot ${notification.urgent ? 'urgent' : ''}`}></div>
                  <div className="notification-text">{notification.text}</div>
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
            <MessageCircle size={20} />
          </div>
          <div className="action-title">Message Center</div>
          <div className="action-description">Respond to client messages</div>
        </div>

        <div className="action-card">
          <div className="action-icon">
            <Calendar size={20} />
          </div>
          <div className="action-title">Manage Bookings</div>
          <div className="action-description">View and update appointments</div>
        </div>

        <div className="action-card">
          <div className="action-icon">
            <DollarSign size={20} />
          </div>
          <div className="action-title">Payment History</div>
          <div className="action-description">Track earnings and payments</div>
        </div>

        <div className="action-card">
          <div className="action-icon">
            <Users size={20} />
          </div>
          <div className="action-title">Client Reviews</div>
          <div className="action-description">Manage feedback and ratings</div>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="performance-grid">
        <div className="performance-card">
          <h3 className="performance-title">Service Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={servicePerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#007bff" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="performance-card">
          <h3 className="performance-title">Performance Metrics</h3>
          <div style={{ padding: '20px 0' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '5px' }}>Average Response Time</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#2c3e50' }}>12 minutes</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '5px' }}>Repeat Customers</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#2c3e50' }}>68%</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '5px' }}>This Week vs Last Week</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#28a745' }}>+15%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
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
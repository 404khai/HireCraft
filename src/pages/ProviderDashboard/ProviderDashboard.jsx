

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
  
  const [dashboardMetrics, setDashboardMetrics] = useState({
    newBookingRequestsToday: 0,
    completedJobs: 0,
    acceptedJobs: 0,
    totalReviews: 0,
    dailyEarnings: 0, 
    unreadMessages: 0, 
    averageRating: 0, 
  });
  const [completionRate, setCompletionRate] = useState('0%');

  const [dashboardNotifications, setDashboardNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [notificationsError, setNotificationsError] = useState(null);

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

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
    }

    // Early return if no token - don't fetch anything
    if (!token) {
      console.warn("No token available, skipping dashboard metrics fetch.");
      return;
    }

    // Fetch dashboard metrics only when token exists
    const fetchAllDashboardMetrics = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/v1/bookings/provider/dashboard/metrics', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const metrics = await response.json();
          setDashboardMetrics(metrics); 
        } else {
          console.error('Failed to fetch dashboard metrics:', response.status, response.statusText);
          // Keep default/initial state on API error
        }
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
        // Keep default/initial state on network error
      }
    };

    const fetchNotifications = async () => {
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
          // Assuming the backend returns notifications sorted by creation date descending (newest first).
          // If not, you'd sort them here:
          // data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setDashboardNotifications(data);
        } else {
          const errorData = await response.json();
          setNotificationsError(`Failed to fetch notifications: ${errorData.message || response.statusText}`);
          console.error("Failed to fetch notifications:", response.status, errorData);
        }
      } catch (error) {
        setNotificationsError('Network error or unable to connect to notifications API.');
        console.error("Error fetching notifications for dashboard:", error);
      } finally {
        setLoadingNotifications(false);
      }
    };

    fetchAllDashboardMetrics();
    fetchNotifications(); // Call the new fetch function
  }, [user, token]);

  // Calculate completion rate whenever relevant dashboardMetrics change
  useEffect(() => {
      if (dashboardMetrics.acceptedJobs > 0) {
          const rate = (dashboardMetrics.completedJobs / dashboardMetrics.acceptedJobs) * 100;
          setCompletionRate(`${rate.toFixed(1)}%`); 
      } else {
          setCompletionRate('0%'); 
      }
  }, [dashboardMetrics.completedJobs, dashboardMetrics.acceptedJobs]);

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
                <div className="overviewTxtValue" style={{color: 'tomato'}}>{dashboardMetrics.newBookingRequestsToday}</div>
                <div className="metric-change positive">
                  <HiArrowTrendingUp size={12} />
                  8% vs yesterday
                </div>
              </div>
              <i className='jobReqOverviewIcon'><FaBriefcase/></i>
              {/* <button className='dashboardMetricsBtn'></button> */}
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
              {/* <button className='dashboardMetricsBtn'></button> */}
            </div>

            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">Average Rating</div>
                <div className="overviewTxtValue" style={{color: '#ffc107'}}>{dashboardMetrics.averageRating.toFixed(1)}</div>
                <div className="metric-change positive">
                  <FaStar size={12} />
                  {dashboardMetrics.totalReviews} client reviews
                </div>
              </div>
              <i style={{color: '#ffc107', background: '#fff8dc', fontSize: '30px', padding: '10px', borderRadius: '5px'}}><FaStar/></i>
            </div>

            <div className="metric-card-enhanced">
              <div className="metric-info">
                <div className="overviewTxtTitle">Jobs Completed</div>
                <div className="overviewTxtValue" style={{color: '#28a745'}}>{dashboardMetrics.completedJobs}</div>
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
                  {loadingNotifications ? (
                    <div className="loading-message">Loading notifications...</div>
                  ) : notificationsError ? (
                    <div className="error-message">{notificationsError}</div>
                  ) : dashboardNotifications.length > 0 ? (
                    // Slice to show only the first 4 notifications (assuming sorted newest first by API)
                    dashboardNotifications.slice(0, 4).map((notification) => (
                      <div key={notification.id} className="notification-item">
                        {/* Use !notification.isRead for the dot to indicate unread status */}
                        <div className={`notification-dot ${!notification.isRead ? 'unread-dot' : 'read-dot'}`}></div>
                        <div className="notification-content">
                          {/* Use message from API response */}
                          <div className="notification-text">{notification.message}</div>
                          {/* Use timeAgo from API response */}
                          <div className="notification-time">{notification.timeAgo}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-notifications">No notifications to display.</div>
                  )}
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
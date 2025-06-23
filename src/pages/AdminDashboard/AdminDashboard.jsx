// import React from 'react'
// import './AdminDashboard.css'
// import DashboardNav from '../../components/DashboardNav/DashboardNav'

// const AdminDashboard = () => {
//   return (
//     <div>AdminDashboard</div>
//   )
// }

// export default AdminDashboard
import React, { useState, useEffect } from 'react'
import './AdminDashboard.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import SalesMappingDashboard from '../../components/SalesMappingDashboard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { FaUsers, FaUserTie, FaDollarSign, FaExclamationTriangle, FaCalendarCheck, FaChartLine, FaMapMarkerAlt, FaStar, FaHandshake, FaCreditCard } from 'react-icons/fa';
import { MdPendingActions, MdTrendingUp, MdReport, MdNotifications } from 'react-icons/md';
import { IoStatsChart, IoSettings } from 'react-icons/io5';
import { HiUserGroup } from 'react-icons/hi';

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('users');

  // Mock data for analytics
  const userGrowthData = [
    { date: '2024-05-24', providers: 45, clients: 120, newProviders: 3, newClients: 8 },
    { date: '2024-05-25', providers: 48, clients: 128, newProviders: 3, newClients: 8 },
    { date: '2024-05-26', providers: 52, clients: 135, newProviders: 4, newClients: 7 },
    { date: '2024-05-27', providers: 55, clients: 142, newProviders: 3, newClients: 7 },
    { date: '2024-05-28', providers: 58, clients: 150, newProviders: 3, newClients: 8 },
    { date: '2024-05-29', providers: 62, clients: 158, newProviders: 4, newClients: 8 },
    { date: '2024-05-30', providers: 65, clients: 165, newProviders: 3, newClients: 7 },
    { date: '2024-06-01', providers: 68, clients: 172, newProviders: 3, newClients: 7 },
    { date: '2024-06-02', providers: 72, clients: 180, newProviders: 4, newClients: 8 },
    { date: '2024-06-03', providers: 75, clients: 188, newProviders: 3, newClients: 8 }
  ];

  const revenueData = [
    { date: '2024-05-24', totalRevenue: 2450, commission: 245, dailyRevenue: 350 },
    { date: '2024-05-25', totalRevenue: 2800, commission: 280, dailyRevenue: 350 },
    { date: '2024-05-26', totalRevenue: 3150, commission: 315, dailyRevenue: 350 },
    { date: '2024-05-27', totalRevenue: 3600, commission: 360, dailyRevenue: 450 },
    { date: '2024-05-28', totalRevenue: 4050, commission: 405, dailyRevenue: 450 },
    { date: '2024-05-29', totalRevenue: 4500, commission: 450, dailyRevenue: 450 },
    { date: '2024-05-30', totalRevenue: 5000, commission: 500, dailyRevenue: 500 },
    { date: '2024-06-01', totalRevenue: 5550, commission: 555, dailyRevenue: 550 },
    { date: '2024-06-02', totalRevenue: 6100, commission: 610, dailyRevenue: 550 },
    { date: '2024-06-03', totalRevenue: 6700, commission: 670, dailyRevenue: 600 }
  ];

  const serviceCategories = [
    { name: 'Plumbing', value: 35, color: '#007bff' },
    { name: 'Electrical', value: 25, color: '#28a745' },
    { name: 'Carpentry', value: 20, color: '#ffc107' },
    { name: 'Painting', value: 12, color: '#dc3545' },
    { name: 'Others', value: 8, color: '#6c757d' }
  ];

  const regionData = [
    { region: 'North', providers: 25, clients: 68, bookings: 145 },
    { region: 'South', providers: 20, clients: 52, bookings: 120 },
    { region: 'East', providers: 15, clients: 35, bookings: 85 },
    { region: 'West', providers: 18, clients: 45, bookings: 95 },
    { region: 'Central', providers: 22, clients: 58, bookings: 130 }
  ];

  const pendingActions = [
    { type: 'provider_approval', count: 12, priority: 'high', description: 'New provider applications' },
    { type: 'dispute_resolution', count: 5, priority: 'urgent', description: 'Booking disputes requiring review' },
    { type: 'payment_issues', count: 8, priority: 'medium', description: 'Payment processing issues' },
    { type: 'profile_verification', count: 15, priority: 'medium', description: 'Profile verifications pending' }
  ];

  const recentActivities = [
    { type: 'new_registration', text: 'John Doe registered as plumber', time: '5 min ago', priority: 'low' },
    { type: 'dispute', text: 'Dispute raised for booking #1234', time: '15 min ago', priority: 'high' },
    { type: 'payment', text: 'Payment of $450 processed', time: '30 min ago', priority: 'low' },
    { type: 'review', text: 'New 1-star review flagged for review', time: '1 hour ago', priority: 'medium' },
    { type: 'approval', text: 'Provider Mike Smith approved', time: '2 hours ago', priority: 'low' }
  ];

  return (
    <div className='adminDashboardBox'>
      <style jsx>{`
        .adminDashboardBox {
          width: 100%;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .adminDashboardContent {
          padding: 20px;
          margin-top: 70px;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .admin-title {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .admin-actions {
          display: flex;
          gap: 10px;
        }

        .admin-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .admin-btn.primary {
          background: #007bff;
          color: white;
        }

        .admin-btn.secondary {
          background: white;
          color: #007bff;
          border: 1px solid #007bff;
        }

        .admin-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .admin-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .admin-metric-card {
          background: white;
          height: 150px;
          padding: 5px 10px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: transform 0.2s;
          border-left: 4px solid transparent;
        }

        .admin-metric-card:hover {
          transform: translateY(-2px);
        }

        .admin-metric-card.providers { border-left-color: #007bff; }
        .admin-metric-card.clients { border-left-color: #28a745; }
        .admin-metric-card.earnings { border-left-color: #ffc107; }
        .admin-metric-card.disputes { border-left-color: #dc3545; }

        .metric-info {
          flex: 1;
        }

        .metric-label {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .metric-value {
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 8px;
        }

        .metric-change {
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 500;
        }

        .metric-change.positive { color: #28a745; }
        .metric-change.negative { color: #dc3545; }
        .metric-change.neutral { color: #6c757d; }

        .metric-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }

        .icon-providers { background: linear-gradient(135deg, #007bff, #0056b3); }
        .icon-clients { background: linear-gradient(135deg, #28a745, #1e7e34); }
        .icon-earnings { background: linear-gradient(135deg, #ffc107, #e0a800); }
        .icon-disputes { background: linear-gradient(135deg, #dc3545, #bd2130); }

        .admin-content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }

        .admin-chart-section {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .chart-title {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
        }

        .chart-controls {
          display: flex;
          gap: 10px;
        }

        .filter-btn {
          padding: 8px 16px;
          border: 1px solid #dee2e6;
          background: white;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .filter-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .metric-selector {
          padding: 8px 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          background: white;
          font-size: 12px;
          cursor: pointer;
        }

        .admin-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .admin-sidebar-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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
          gap: 10px;
        }

        .sidebar-content {
          padding: 15px 20px;
        }

        .pending-action-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .pending-action-item:last-child {
          border-bottom: none;
        }

        .action-info {
          flex: 1;
        }

        .action-count {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 2px;
        }

        .action-description {
          font-size: 12px;
          color: #6c757d;
        }

        .priority-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .priority-urgent { background: #ffebee; color: #c62828; }
        .priority-high { background: #fff3e0; color: #ef6c00; }
        .priority-medium { background: #e8f5e8; color: #2e7d32; }
        .priority-low { background: #e3f2fd; color: #1565c0; }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .activity-dot.low { background: #007bff; }
        .activity-dot.medium { background: #ffc107; }
        .activity-dot.high { background: #dc3545; }

        .activity-content {
          flex: 1;
        }

        .activity-text {
          font-size: 14px;
          color: #2c3e50;
          margin-bottom: 4px;
          font-weight: 500;
        }

        .activity-time {
          font-size: 12px;
          color: #6c757d;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }

        .analytics-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .analytics-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .region-item {
          display: flex;
          justify-content: between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .region-item:last-child {
          border-bottom: none;
        }

        .region-name {
          font-weight: 500;
          color: #2c3e50;
          min-width: 60px;
        }

        .region-stats {
          display: flex;
          gap: 15px;
          font-size: 12px;
          color: #6c757d;
        }

        .region-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .region-stat-value {
          font-weight: 600;
          color: #2c3e50;
          font-size: 14px;
        }

        .platform-overview {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 30px;
        }

        .overview-title {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .overview-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .overview-stat {
          text-align: center;
          padding: 15px;
          border-radius: 8px;
          background: #f8f9fa;
        }

        .overview-stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #007bff;
          margin-bottom: 5px;
        }

        .overview-stat-label {
          font-size: 12px;
          color: #6c757d;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .admin-content-grid {
            grid-template-columns: 1fr;
          }
          
          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .adminDashboardContent {
            padding: 15px;
          }
          
          .admin-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .admin-metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .chart-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .overview-stats {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .admin-title {
            font-size: 24px;
          }
          
          .admin-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .overview-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <DashboardNav/>
      
      <div className='adminDashboardContent'>
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-actions">
            <button className="admin-btn secondary">
              <MdReport size={16} />
              Generate Report
            </button>
            <button className="admin-btn primary">
              <IoSettings size={16} />
              Platform Settings
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="admin-metrics-grid">
          <div className="admin-metric-card providers">
            <div className="metric-info">
              <div className="metric-label">Total Providers</div>
              <div className="metric-value">75</div>
              <div className="metric-change positive">
                <MdTrendingUp size={14} />
                +12 this month
              </div>
            </div>
            <div className="metric-icon icon-providers">
              <FaUserTie />
            </div>
          </div>

          <div className="admin-metric-card clients">
            <div className="metric-info">
              <div className="metric-label">Total Clients</div>
              <div className="metric-value">188</div>
              <div className="metric-change positive">
                <MdTrendingUp size={14} />
                +25 this month
              </div>
            </div>
            <div className="metric-icon icon-clients">
              <HiUserGroup />
            </div>
          </div>

          <div className="admin-metric-card earnings">
            <div className="metric-info">
              <div className="metric-label">Total Platform Revenue</div>
              <div className="metric-value">$6,700</div>
              <div className="metric-change positive">
                <MdTrendingUp size={14} />
                +18% this month
              </div>
            </div>
            <div className="metric-icon icon-earnings">
              <FaDollarSign />
            </div>
          </div>

          <div className="admin-metric-card disputes">
            <div className="metric-info">
              <div className="metric-label">Active Disputes</div>
              <div className="metric-value">5</div>
              <div className="metric-change neutral">
                <FaExclamationTriangle size={14} />
                2 urgent
              </div>
            </div>
            <div className="metric-icon icon-disputes">
              <FaExclamationTriangle />
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="platform-overview">
          <h3 className="overview-title">Platform Overview</h3>
          <div className="overview-stats">
            <div className="overview-stat">
              <div className="overview-stat-value">92%</div>
              <div className="overview-stat-label">Avg Completion Rate</div>
            </div>
            <div className="overview-stat">
              <div className="overview-stat-value">4.6</div>
              <div className="overview-stat-label">Platform Rating</div>
            </div>
            <div className="overview-stat">
              <div className="overview-stat-value">15 min</div>
              <div className="overview-stat-label">Avg Response Time</div>
            </div>
            <div className="overview-stat">
              <div className="overview-stat-value">575</div>
              <div className="overview-stat-label">Total Bookings</div>
            </div>
            <div className="overview-stat">
              <div className="overview-stat-value">$670</div>
              <div className="overview-stat-label">Daily Commission</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="admin-content-grid">
          <div className="admin-chart-section">
            <div className="chart-header">
              <h3 className="chart-title">Platform Growth Analytics</h3>
              <div className="chart-controls">
                <select 
                  value={selectedMetric} 
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="metric-selector"
                >
                  <option value="users">User Growth</option>
                  <option value="revenue">Revenue Growth</option>
                </select>
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
            </div>
            
            <ResponsiveContainer width="100%" height={350}>
              {selectedMetric === 'users' ? (
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="providers" stroke="#007bff" strokeWidth={3} name="Providers" />
                  <Line type="monotone" dataKey="clients" stroke="#28a745" strokeWidth={3} name="Clients" />
                </LineChart>
              ) : (
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="totalRevenue" stroke="#ffc107" strokeWidth={3} name="Total Revenue" />
                  <Line type="monotone" dataKey="commission" stroke="#dc3545" strokeWidth={3} name="Platform Commission" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="admin-sidebar">
            {/* Pending Actions */}
            <div className="admin-sidebar-card">
              <div className="sidebar-header">
                <MdPendingActions size={18} />
                Pending Actions
              </div>
              <div className="sidebar-content">
                {pendingActions.map((action, index) => (
                  <div key={index} className="pending-action-item">
                    <div className="action-info">
                      <div className="action-count">{action.count}</div>
                      <div className="action-description">{action.description}</div>
                    </div>
                    <div className={`priority-badge priority-${action.priority}`}>
                      {action.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="admin-sidebar-card">
              <div className="sidebar-header">
                <MdNotifications size={18} />
                Recent Activities
              </div>
              <div className="sidebar-content">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className={`activity-dot ${activity.priority}`}></div>
                    <div className="activity-content">
                      <div className="activity-text">{activity.text}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3 className="analytics-title">
              <FaChartLine />
              Service Categories
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={serviceCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {serviceCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* <div className="analytics-card">
            <h3 className="analytics-title">
              <FaMapMarkerAlt />
              Regional Performance
            </h3>
            <div style={{ padding: '20px 0' }}>
              {regionData.map((region, index) => (
                <div key={index} className="region-item">
                  <div className="region-name">{region.region}</div>
                  <div className="region-stats">
                    <div className="region-stat">
                      <div className="region-stat-value">{region.providers}</div>
                      <div>Providers</div>
                    </div>
                    <div className="region-stat">
                      <div className="region-stat-value">{region.clients}</div>
                      <div>Clients</div>
                    </div>
                    <div className="region-stat">
                      <div className="region-stat-value">{region.bookings}</div>
                      <div>Bookings</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
import React, { useState, useContext, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AuthContext } from '../context/AuthContext';

const BookingLineChart = ({ width = "100%", height = 400 }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const [firstName, setFirstName] = useState('');
  const [bookingChartData, setBookingChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dashboardMetrics, setDashboardMetrics] = useState({
    completedJobs: 0,
    acceptedJobs: 0,
    rejectedJobs: 0
  });

  // Generate last 7 days labels
  const generateLast6Months = () => {
    const months = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) { // Last 6 months (0-indexed for current month)
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1); // Start of the month
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }), // Jan, Feb, etc.
        fullDate: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) // Jan 2025
      });
    }
    return months;
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

    // Fetch both dashboard metrics and chart data
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch dashboard metrics
        const metricsResponse = await fetch('http://localhost:9090/api/v1/bookings/provider/dashboard/metrics', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (metricsResponse.ok) {
          const metrics = await metricsResponse.json();
          setDashboardMetrics(metrics);
        }

        // Fetch chart data for last 7 days
        const chartResponse = await fetch('http://localhost:9090/api/v1/bookings/provider/chart/monthly', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (chartResponse.ok) {
          const chartData = await chartResponse.json();
          setBookingChartData(chartData);
        } else {
          console.error('Failed to fetch chart data:', chartResponse.status, chartResponse.statusText);
          // Fallback to empty data structure for last 7 days
          const fallbackData = generateLast6Months().map(monthInfo => ({
            month: monthInfo.month,
            fullDate: monthInfo.fullDate,
            acceptedBookings: 0,
            completedBookings: 0,
            rejectedBookings: 0
          }));
          setBookingChartData(fallbackData);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load booking data');
        // Fallback data
        const fallbackData = generateLast6Months().map(monthInfo => ({
            month: monthInfo.month,
            fullDate: monthInfo.fullDate,
            acceptedBookings: 0,
            completedBookings: 0,
            rejectedBookings: 0
          }));
        setBookingChartData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={tooltipStyle}>
          <p style={tooltipLabelStyle}>{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, fontSize: '14px', margin: '2px 0' }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Booking Status Trends</h2>
          <p style={subtitleStyle}>Loading chart data...</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Booking Status Trends</h2>
          <p style={{ ...subtitleStyle, color: '#ef4444' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          Booking Trends - Last 6 Months
        </h2>
        <p style={subtitleStyle}>
          Monthly analysis of accepted, completed, and rejected bookings
        </p>
      </div>
      
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          data={bookingChartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#f0f0f0"
          />
          <XAxis 
            dataKey="month"
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px'
            }}
          />
          
          {/* Accepted Bookings Line */}
          <Line
            type="monotone"
            dataKey="acceptedBookings"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ 
              fill: '#3b82f6', 
              strokeWidth: 2, 
              r: 6,
              stroke: '#fff'
            }}
            activeDot={{ 
              r: 8, 
              stroke: '#3b82f6',
              strokeWidth: 2,
              fill: '#fff'
            }}
            name="Accepted Bookings"
          />

          {/* Completed Bookings Line */}
          <Line
            type="monotone"
            dataKey="completedBookings"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ 
              fill: '#10b981', 
              strokeWidth: 2, 
              r: 6,
              stroke: '#fff'
            }}
            activeDot={{ 
              r: 8, 
              stroke: '#10b981',
              strokeWidth: 2,
              fill: '#fff'
            }}
            name="Completed Bookings"
          />

          {/* Rejected Bookings Line */}
          <Line
            type="monotone"
            dataKey="rejectedBookings"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ 
              fill: '#ef4444', 
              strokeWidth: 2, 
              r: 6,
              stroke: '#fff'
            }}
            activeDot={{ 
              r: 8, 
              stroke: '#ef4444',
              strokeWidth: 2,
              fill: '#fff'
            }}
            name="Rejected Bookings"
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Summary Stats */}
      <div style={statsContainerStyle}>

        <div style={completedStatsStyle}>
          <div style={statsContentStyle}>
            <div style={statsIconContainerStyle}>
              <div style={completedIconStyle}></div>
            </div>
            <div style={statsTextContainerStyle}>
              <h3 style={completedStatsTitleStyle}>Total Completed</h3>
              <p style={completedStatsValueStyle}>
                {dashboardMetrics.completedJobs || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div style={rejectedStatsStyle}>
          <div style={statsContentStyle}>
            <div style={statsIconContainerStyle}>
              <div style={rejectedIconStyle}></div>
            </div>
            <div style={statsTextContainerStyle}>
              <h3 style={rejectedStatsTitleStyle}>Total Rejected</h3>
              <p style={rejectedStatsValueStyle}>
                {dashboardMetrics.rejectedJobs || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS-in-JS Styles
const containerStyle = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
};

const headerStyle = {
  marginBottom: '24px'
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#1f2937',
  marginBottom: '8px',
  margin: '0 0 8px 0'
};

const subtitleStyle = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0'
};

const tooltipStyle = {
  backgroundColor: 'white',
  padding: '12px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
};

const tooltipLabelStyle = {
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 4px 0'
};

const statsContainerStyle = {
  marginTop: '10px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '16px'
};

const acceptedStatsStyle = {
  backgroundColor: '#eff6ff',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #3b82f6'
};

const completedStatsStyle = {
  backgroundColor: '#f0fdf4',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #4ade80'
};

const rejectedStatsStyle = {
  backgroundColor: '#fef2f2',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '4px solid #f87171'
};

const statsContentStyle = {
  display: 'flex',
  alignItems: 'center'
};

const statsIconContainerStyle = {
  flexShrink: 0
};

const acceptedIconStyle = {
  width: '12px',
  height: '12px',
  backgroundColor: '#3b82f6',
  borderRadius: '50%'
};

const completedIconStyle = {
  width: '12px',
  height: '12px',
  backgroundColor: '#4ade80',
  borderRadius: '50%'
};

const rejectedIconStyle = {
  width: '12px',
  height: '12px',
  backgroundColor: '#f87171',
  borderRadius: '50%'
};

const statsTextContainerStyle = {
  marginLeft: '12px'
};

const acceptedStatsTitleStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#1e40af',
  margin: '0 0 4px 0'
};

const completedStatsTitleStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#166534',
  margin: '0 0 4px 0'
};

const rejectedStatsTitleStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#991b1b',
  margin: '0 0 4px 0'
};

const acceptedStatsValueStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#2563eb',
  margin: '0'
};

const completedStatsValueStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#16a34a',
  margin: '0'
};

const rejectedStatsValueStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#dc2626',
  margin: '0'
};

export default BookingLineChart;
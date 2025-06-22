import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data - replace with your actual data
const bookingData = [
  { month: 'Jan', rejectedBookings: 15, completedBookings: 85 },
  { month: 'Feb', rejectedBookings: 22, completedBookings: 92 },
  { month: 'Mar', rejectedBookings: 18, completedBookings: 78 },
  { month: 'Apr', rejectedBookings: 35, completedBookings: 105 },
  { month: 'May', rejectedBookings: 28, completedBookings: 118 },
  { month: 'Jun', rejectedBookings: 41, completedBookings: 134 },
  { month: 'Jul', rejectedBookings: 33, completedBookings: 142 },
  { month: 'Aug', rejectedBookings: 25, completedBookings: 156 },
  { month: 'Sep', rejectedBookings: 38, completedBookings: 128 },
  { month: 'Oct', rejectedBookings: 44, completedBookings: 115 },
  { month: 'Nov', rejectedBookings: 29, completedBookings: 138 },
  { month: 'Dec', rejectedBookings: 31, completedBookings: 149 }
];

const BookingLineChart = ({ data = bookingData, width = "100%", height = 400 }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Booking Status Trends
        </h2>
        <p className="text-gray-600 text-sm">
          Monthly comparison of rejected vs completed bookings
        </p>
      </div>
      
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          data={data}
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
        </LineChart>
      </ResponsiveContainer>
      
      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Total Rejected</h3>
              <p className="text-2xl font-bold text-red-600">
                {data.reduce((sum, item) => sum + item.rejectedBookings, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Total Completed</h3>
              <p className="text-2xl font-bold text-green-600">
                {data.reduce((sum, item) => sum + item.completedBookings, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingLineChart;
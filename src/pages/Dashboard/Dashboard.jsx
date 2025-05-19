import React from 'react'
import './Dashboard.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <DashboardNav/>

        <div className="welcome">
            <p>Welcome, Mark</p>
        </div>

        <div className="overview">
            
        </div>
    </div>
  )
}

export default Dashboard
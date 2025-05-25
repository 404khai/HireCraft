import React from 'react'
import './Dashboard.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import Sidenav from '../../components/Sidenav/Sidenav'

const Dashboard = () => {
  return (
    <div className='dashboardBox'>
      <DashboardNav/>
      <div className='dashboardBody'>
          <Sidenav/>
          <div className="dashboard">
            <div className="welcome">
              <p>Welcome, Mark</p>
            </div>

            <div className="overview">
                
            </div>
          </div>
          
      </div>
    </div>
  )
}

export default Dashboard
import React from 'react'
import './JobRequests.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

const JobRequests = () => {
  return (
    <div className='dashboardBox'>
      <DashboardNav/>
      <div className='dashboardBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Job Requests</h2>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/Dashboard" secondLink="Job Requests" link2="/JobRequests"/>
            </div>

            
          </div>
          
      </div>
    </div>
  )
}

export default JobRequests
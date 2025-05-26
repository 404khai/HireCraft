import React from 'react'
import './JobAlerts.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoBriefcaseOutline} from "react-icons/io5";

const JobAlerts = () => {
  return (
    <div className='dashboardBox'>
      <DashboardNav/>
      <div className='dashboardBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Job Alerts</h2>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/Dashboard" secondLink="Job Alerts" link2="/Dashboard/JobAlerts"/>
            </div>

            <div className="jobAlertsBox">
              <div className="jobAlertsNoti">
                <p>Your job alerts are shown below. Your alerts will also be sent to your email.</p>
              </div>

              <div className="jobAlerts">
                <div className="jobAlertsHead">
                  <i><IoBriefcaseOutline /></i>
                  Alerts
                </div>

                <div className="jobAlert">
                  <p>TV Unit Decor</p>
                </div>
              </div>
            </div>
            
          </div>
          
      </div>
    </div>
  )
}

export default JobAlerts
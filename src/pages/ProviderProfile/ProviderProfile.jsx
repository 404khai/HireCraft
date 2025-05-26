import React from 'react'
import './ProviderProfile.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

const ProviderProfile = () => {
  return (
    <div className='profileBox'>
      <DashboardNav/>
        <div className='profileBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
            <div className="dashboard">
                <div className="welcome">
                <div className="welcomeTxt">
                    <h2>My Profile</h2>
                </div>

                <Breadcrumbs firstLink="Dashboard" link="/Dashboard" secondLink="Profile" link2="/Dashboard/ProviderProfile"/>
                </div>

            </div>
        </div>
    </div>
  )
}


export default ProviderProfile
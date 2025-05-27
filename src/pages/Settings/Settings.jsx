import React from 'react'
import './Settings.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { TiFolderAdd } from "react-icons/ti";

const Settings = () => {
  return (
    <div className='profileBox'>
      <DashboardNav/>
        <div className='profileBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
            <div className="dashboard">
                <div className="welcome">
                    <div className="welcomeTxt">
                        <h2>Settings</h2>
                    </div>

                    <Breadcrumbs firstLink="Dashboard" link="/Dashboard" secondLink="Settings" link2="/Dashboard/Settings"/>
                </div>

                <div className="editProfileSettings">
                    <div className="editProfile">
                        <div className="jobAlertsHead">
                            <i><TiFolderAdd /></i>
                            <b>Edit Profile</b>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}


export default Settings
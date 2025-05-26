import React from 'react'
import './MyProjects.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoMdFolderOpen } from "react-icons/io";
import { TbEyeSearch } from "react-icons/tb";
import tvUnit

const MyProjects = () => {
  return (
    <div className='dashboardBox'>
      <DashboardNav/>
      <div className='dashboardBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Projects</h2>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/Dashboard" secondLink="Projects" link2="/Dashboard/MyProjects"/>
            </div>

            <div className="jobAlertsBox">

              <div className="jobAlerts">
                <div className="jobAlertsHead">
                  <i><IoMdFolderOpen /></i>
                  <b>Projects</b>
                </div>

                <div className="project">
                  <div className="projectTitle">
                    <p><b>Duplex TV Unit Decor</b></p>
                  </div>
                  <img src={tvUnit} alt="" />
                  <button>
                    <i><TbEyeSearch/></i>
                    Edit Image
                  </button>
                </div>
              </div>
                
            </div>
            
          </div>
          
      </div>
    </div>
  )
}

export default MyProjects


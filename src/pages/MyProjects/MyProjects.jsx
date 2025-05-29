import React from 'react'
import './MyProjects.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoMdFolderOpen } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import tvUnit from '../../assets/tvUnit.jpg'

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

              <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Projects" link2="/ProviderDashboard/MyProjects"/>
            </div>

            <div className="projects">
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
                    <i><IoImageOutline/></i>
                    Edit Image
                  </button>
                </div>
            </div>
            
          </div>
          
      </div>
    </div>
  )
}

export default MyProjects


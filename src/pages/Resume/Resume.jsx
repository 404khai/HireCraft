import React from 'react'
import './Resume.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import resumeFolder from '../../assets/resume.gif'
import { FiFileText } from "react-icons/fi";

const Resume = () => {
  return (
    <div className='dashboardBox'>
      <DashboardNav/>
      <div className='dashboardBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Resume</h2>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/Dashboard" secondLink="Resume" link2="/Dashboard/Resume"/>
            </div>

            <div className="resumeBox">
                <p>No Resumes added</p>
               <img src={resumeFolder} alt="" />

               <button className='uploadCv'>
                    <i><FiFileText /></i>
                    Upload CV
               </button>
            </div>
            
          </div>
          
      </div>
    </div>
  )
}

export default Resume
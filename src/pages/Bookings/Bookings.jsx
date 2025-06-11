import React from 'react'
import { Link } from 'react-router-dom'
import './Bookings.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoBriefcaseOutline, IoLocationOutline} from "react-icons/io5";
import OIF from '../../assets/OIF.jpeg'
import { LuClock4 } from "react-icons/lu";
import { MdTaskAlt } from "react-icons/md";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { SiTicktick } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { BiTask } from "react-icons/bi";

const Bookings = () => {
  return (
    <div className='dashboardBox'>
      <DashboardNav/>
      <div className='dashboardBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>My Bookings</h2>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="My Bookings" link2="/ProviderDashboard/Bookings"/>
            </div>

            <div className="jobAlertsBox">
              <div className="jobAlertsNoti">
                <p>Your current bookings are shown below. They will also be sent to your email.</p>
              </div>

              <div className="jobAlerts">
                <div className="jobAlertsHead">
                  <i><MdTaskAlt /></i>
                  My Bookings
                </div>

                <div className="jobAlert">               
                  <div className="jobAlertEmployer">
                    <img src={OIF} alt="" />
                    <div className="jobEmployerTxt">
                      <div className="jobEmployerTxtInfo">
                        <p>Peter Grey</p>
                        <p>Recruiting Manager, Microsoft</p>
                      </div>
                      
                      <div className="jobEmployerTxtLocation">
                        <p>
                          <i><IoLocationOutline /></i>
                          Ikeja, Lagos
                        </p>
                        <p>
                          <i><LiaGlobeAmericasSolid /></i>
                          Nigeria
                        </p>
                      </div>

                      <p className='bookingTime'>
                        <i><LuClock4/></i>
                        3 days ago
                      </p>
                      
                    </div>
                    
                  </div>

                  <div className="bookingControls">
                    <Link to="/ProviderDashboard/Messages">
                      <button className='viewMessageBtn'>View Message</button>
                    </Link>
                    

                    <div className="bookingControls2">
                      <i><SiTicktick className='accept' title='Accept Booking Request'/></i>
                      <i><MdOutlineCancel className='decline' title='Decline Booking Request'/></i>
                      <i><BiTask className='completed' title='Mark as Completed'/></i>
                    </div>
                  </div>
                  {/* <div className="jobAlertDuration">
                    <p><i><LuClock4/></i>3 days</p>
                  </div> */}
                </div>
              </div>
            </div>
            
          </div>
          
      </div>
    </div>
  )
}

export default Bookings
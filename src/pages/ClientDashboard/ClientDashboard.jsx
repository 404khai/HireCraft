import React, {useState, useEffect, useContext} from 'react'
import './ClientDashboard.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ClientSideNav from '../../components/ClientSideNav/ClientSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoBriefcaseOutline} from "react-icons/io5";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { FaDollarSign } from "react-icons/fa6";
import { MdMarkUnreadChatAlt } from "react-icons/md";

import { AuthContext } from '../../context/AuthContext'

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    
    const [firstName, setFirstName] = useState('');
  
    useEffect(() => {
        if (user) {
          setFirstName(user.firstName || '');
        }
      }, [user]);

  return (
    <div className='dashboardBox'>
      <DashboardNav/>
      <div className='dashboardBody'>
          <ClientSideNav/>
          {/* <EmployerSideNav/> */}
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Welcome, {firstName}</h2>
                <p style={{color: "#888"}}>We are glad to see you again!</p>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Home" link2="/ProviderDashboard"/>
            </div>

            <div className="overview">
                <div className="jobReqOverview">
                  <div className="overviewTxt">
                    <p><b>Accepted Booking Requests</b></p>
                    <p>50</p>
                  </div>
                  <i className='jobReqOverviewIcon'><IoBriefcaseOutline/></i>
                </div>

                <div className="profileViewsOverview">
                  <div className="overviewTxt">
                    <p><b>Profile Views</b></p>
                    <p>50</p>
                    <p><span style={{color: "green"}}>47%</span> more than yesterday</p>
                  </div>
                  <i className='profileViewsOverviewIcon'><HiArrowTrendingUp/></i>
                </div>

                <div className="earningsOverview">
                  <div className="overviewTxt">
                    <p><b>New Invoice</b></p>
                    <p>$50</p>
                  </div>
                  <i className='earningsOverviewIcon'><FaDollarSign/></i>
                </div>

                <div className="unreadNotisOverview">
                  <div className="overviewTxt">
                    <p><b>Unread Messages</b></p>
                    <p>3</p>
                  </div>
                  <i className='unreadNotisOverviewIcon'><MdMarkUnreadChatAlt/></i>
                </div>
            </div>
          </div>
          
      </div>
    </div>
  )
}

export default ClientDashboard
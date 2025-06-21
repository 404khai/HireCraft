import React, {useContext, useState, useEffect} from 'react'
import './ProviderDashboard.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoBriefcaseOutline} from "react-icons/io5";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { FaDollarSign, FaBriefcase, FaRegMessage } from "react-icons/fa6";
import { MdMarkUnreadChatAlt } from "react-icons/md";

import { AuthContext } from '../../context/AuthContext'

const ProviderDashboard = () => {
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
          <ProviderSideNav/>
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
                  <i className='jobReqOverviewIcon'><FaBriefcase/></i>
                  <div className="overviewTxt">
                    <p className='overviewTxtTitle'>New Booking Requests</p>
                    <p className='overviewTxtValue'>50</p>
                  </div>
                </div>

                <div className="earningsOverview">
                  <i className='earningsOverviewIcon'><FaDollarSign/></i>
                  <div className="overviewTxt">
                    <p className='overviewTxtTitle'>Daily Earnings</p>
                    <p className='overviewTxtValue'>$50</p>
                  </div>
                </div>

                <div className="unreadNotisOverview">
                  <i className='unreadNotisOverviewIcon'><MdMarkUnreadChatAlt/></i>
                  <div className="overviewTxt">
                    <p className='overviewTxtTitle'>Unread Messages</p>
                    <p className='overviewTxtValue'>3</p>
                  </div>
                </div>
            </div>
          </div>
          
      </div>
    </div>
  )
}

export default ProviderDashboard
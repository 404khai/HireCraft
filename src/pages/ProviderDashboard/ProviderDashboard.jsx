import React from 'react'
import './ProviderDashboard.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoBriefcaseOutline} from "react-icons/io5";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { FaDollarSign } from "react-icons/fa6";
import { MdMarkUnreadChatAlt } from "react-icons/md";

const ProviderDashboard = () => {
  return (
    <div className='dashboardBox'>
      <DashboardNav/>
      <div className='dashboardBody'>
          <ProviderSideNav/>
          {/* <EmployerSideNav/> */}
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Welcome, Daniel</h2>
                <p style={{color: "#888"}}>We are glad to see you again!</p>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Home" link2="/ProviderDashboard"/>
            </div>

            <div className="overview">
                <div className="jobReqOverview">
                  <div className="overviewTxt">
                    <p className='overviewTxtTitle'>New Booking Requests</p>
                    <p className='overviewTxtValue'>50</p>
                  </div>
                  <i className='jobReqOverviewIcon'><IoBriefcaseOutline/></i>
                </div>

                <div className="profileViewsOverview">
                  <div className="overviewTxt">
                    <p className='overviewTxtTitle'>Profile Views</p>
                    <p className='overviewTxtValue'>50</p>
                    <p><span style={{color: "green"}}>47%</span> more than yesterday</p>
                  </div>
                  <i className='profileViewsOverviewIcon'><HiArrowTrendingUp/></i>
                </div>

                <div className="earningsOverview">
                  <div className="overviewTxt">
                    <p className='overviewTxtTitle'>Daily Earnings</p>
                    <p className='overviewTxtValue'>$50</p>
                  </div>
                  <i className='earningsOverviewIcon'><FaDollarSign/></i>
                </div>

                <div className="unreadNotisOverview">
                  <div className="overviewTxt">
                    <p className='overviewTxtTitle'>Unread Messages</p>
                    <p className='overviewTxtValue'>3</p>
                  </div>
                  <i className='unreadNotisOverviewIcon'><MdMarkUnreadChatAlt/></i>
                </div>
            </div>
          </div>
          
      </div>
    </div>
  )
}

export default ProviderDashboard
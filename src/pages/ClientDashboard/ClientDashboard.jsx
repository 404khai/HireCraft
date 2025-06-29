import React, {useState, useEffect, useContext} from 'react'
import './ClientDashboard.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ClientSideNav from '../../components/ClientSideNav/ClientSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoBriefcaseOutline} from "react-icons/io5";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { FaDollarSign, FaBriefcase, FaRegMessage } from "react-icons/fa6";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { FaStar, FaClock, FaUsers, FaCalendarAlt, FaCheckCircle, FaBalanceScale } from "react-icons/fa";
import { IoNotifications, IoTime } from "react-icons/io5";
import { SiTicktick } from 'react-icons/si';

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
        <ClientSideNav/>
      <div className='dashboardBody'>
          <DashboardNav/>
          {/* <EmployerSideNav/> */}
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Welcome, {firstName}</h2>
                <p style={{color: "#888"}}>We are glad to see you again!</p>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/ClientDashboard" secondLink="Home" link2="/ProviderDashboard"/>
            </div>

            <div className="enhanced-overview">
                        <div className="metric-card-enhanced">
                          <div className="metric-info">
                            <div className="overviewTxtTitle">New Booking Requests</div>
                            <div className="overviewTxtValue" style={{color: 'tomato'}}></div>
                            <div className="metric-change positive">
                              <HiArrowTrendingUp size={12} />
                              8% vs yesterday
                            </div>
                          </div>
                          <i className='jobReqOverviewIcon'><FaBriefcase/></i>
                          {/* <button className='dashboardMetricsBtn'></button> */}
                        </div>
            
                        <div className="metric-card-enhanced">
                          <div className="metric-info">
                            <div className="overviewTxtTitle">Today's Payments</div>
                            <div className="overviewTxtValue" style={{color: 'darkturquoise'}}>$450</div>
                            <div className="metric-change positive">
                              <HiArrowTrendingUp size={12} />
                              +12% vs yesterday
                            </div>
                          </div>
                          <i className='earningsOverviewIcon'><FaDollarSign/></i>
                        </div>
            
                        <div className="metric-card-enhanced">
                          <div className="metric-info">
                            <div className="overviewTxtTitle">Unread Messages</div>
                            <div className="overviewTxtValue" style={{color: 'purple'}}>7</div>
                            <div className="metric-change negative">
                              <FaClock size={12} />
                              3 urgent responses
                            </div>
                          </div>
                          <i className='unreadNotisOverviewIcon'><MdMarkUnreadChatAlt/></i>
                          {/* <button className='dashboardMetricsBtn'></button> */}
                        </div>
            
                        <div className="metric-card-enhanced">
                          <div className="metric-info">
                            <div className="overviewTxtTitle">Jobs Completed</div>
                            <div className="overviewTxtValue" style={{color: '#28a745'}}></div>
                          </div>
                          <i className='jobsDoneIcon'><SiTicktick/></i>
                        </div>

                      </div>
          </div>
          
      </div>
    </div>
  )
}

export default ClientDashboard
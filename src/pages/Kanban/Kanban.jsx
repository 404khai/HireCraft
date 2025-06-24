import React, {useContext, useState, useEffect} from 'react'
import './Kanban.css'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import { AuthContext } from '../../context/AuthContext'

const Kanban = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');
    
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
    }
  }, [user, token]);

    return (
      <div className='dashboardBox'>
        
        <ProviderSideNav/>
        <div className='dashboardBody'>
          <DashboardNav/>
          <div className="dashboard">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Welcome, {firstName}</h2>
                <p style={{color: "#888"}}>We are glad to see you again!</p>
              </div>
              <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Home" link2="/ProviderDashboard/Kanban"/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Kanban
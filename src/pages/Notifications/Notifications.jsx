
import React, {useContext, useState, useEffect} from 'react'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { AuthContext } from '../../context/AuthContext'

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  
  const [firstName, setFirstName] = useState('');
  
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
    }

    // Early return if no token - don't fetch anything
    if (!token) {
      console.warn("No token available, skipping dashboard metrics fetch.");
      return;
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
              <h2>Notifications</h2>
            </div>
            <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Notifications" link2="/Notifications"/>
          </div>


          
           
        </div>
      </div>
    </div>
  )
}

export default Notifications
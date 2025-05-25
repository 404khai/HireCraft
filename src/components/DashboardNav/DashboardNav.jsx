import './DashboardNav.css'
import profilePic from '../../assets/pacman.jpg'
// import profilePic from '../../assets/bluePacman.png'
import { IoHomeOutline } from "react-icons/io5";
import { PiMailbox } from "react-icons/pi";
import { Link } from 'react-router-dom';
import React from 'react';
// import Toggle from '../../components/Toggle/Toggle'

const DashboardNav = () => {
  return (
    <div className='dashboardNav'>
        <Link to="/Home" className="dashboardLogoLink">
            <div className="dashboardLogo">
                <p>hire<span className="navLogoSpan">craft</span></p>
            </div>
        </Link>

        <div className='dashboardNavControls'>
          <Link to="/Home">
              <i className='notifications'><IoHomeOutline /></i>
          </Link>
          {/* <div className="moon">
              <Toggle/>
          </div> */}
          <i className='notifications'><PiMailbox /></i>
          <img src={profilePic} alt="" className='profilePic'/>
        </div>
    </div>
  )
}

export default DashboardNav
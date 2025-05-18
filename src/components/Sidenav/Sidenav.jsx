import React from 'react'
import './Sidenav.css'
import { Link } from 'react-router-dom'
import { HiWrenchScrewdriver, HiOutlineWallet } from "react-icons/hi2";
import { LuLayoutDashboard, LuBellRing } from "react-icons/lu";
import { TiMessages } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa6";
import { IoExitOutline , IoBriefcaseOutline} from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";

const Sidenav = () => {
  return (
    <div className='sidenav'>
        <Link to="/Home" className="navLogoLink">
            <div className="navLogo" id='dashboardLogo'>
                <i><HiWrenchScrewdriver/></i>
                <p>hire<span className="navLogoSpan">craft</span></p>
            </div>
        </Link>

        <div className="start">
            <p><b>Start</b></p>
            <Link to="/Dashboard">
                <i><LuLayoutDashboard /></i>
                Dashboard
            </Link>
            <Link to="/Dashboard">
                <i><TiMessages /></i>
                Messages
            </Link>
            <Link to="/Dashboard">
                <i><LuBellRing /></i>
                Job Requests
            </Link>
            <Link to="/Dashboard">
                <i><IoBriefcaseOutline /></i>
                My Bookings
            </Link>
        </div>
       
        <div className="account">
            <p><b>Account</b></p>
            <Link to="/Dashboard">
                <i><FaRegUser /></i>
                My Profile
            </Link>
            <Link to="/Dashboard">
                <i><HiOutlineWallet /></i>
                Wallet / Earnings
            </Link>
            <Link to="/Dashboard">
                <i><MdOutlineRateReview /></i>
                Review & Ratings
            </Link>
            <Link to="/Dashboard">
                <i><IoExitOutline /></i>
                Log Out
            </Link>
        </div>
    </div>
  )
}

export default Sidenav
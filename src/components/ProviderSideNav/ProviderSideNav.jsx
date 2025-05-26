import React from 'react'
import './ProviderSideNav.css'
import { Link } from 'react-router-dom'
import { HiWrenchScrewdriver, HiOutlineWallet } from "react-icons/hi2";
import { LuLayoutDashboard, LuBellRing } from "react-icons/lu";
import { TiMessages } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa6";
import { IoExitOutline , IoBriefcaseOutline} from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { IoMdFolderOpen } from "react-icons/io";

const ProviderSideNav = () => {
  return (
    <div className='sidenav'>

        <div className="start">
            <p><b>Home</b></p>
            <Link to="/Dashboard">
                <i><LuLayoutDashboard /></i>
                Dashboard
            </Link>
            <Link to="/Dashboard/Messages">
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
       
        <div className="manage">
            <p><b>Organize & Manage</b></p>
            <Link to="/Dashboard">
                <i><HiOutlineWallet /></i>
                Wallet / Earnings
            </Link>
            <Link to="/Dashboard">
                <i><IoMdFolderOpen /></i>
                Projects
            </Link>
        </div>

        <div className="account">
            <p><b>Account</b></p>
            <Link to="/Dashboard">
                <i><FaRegUser /></i>
                My Profile
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

export default ProviderSideNav
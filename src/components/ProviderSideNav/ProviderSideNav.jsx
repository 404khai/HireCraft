import React from 'react'
import './ProviderSideNav.css'
import { Link } from 'react-router-dom'
import { HiWrenchScrewdriver, HiOutlineWallet } from "react-icons/hi2";
import { LuLayoutDashboard, LuBellRing } from "react-icons/lu";
import { TiMessages } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa6";
import { IoExitOutline , IoBriefcaseOutline, IoSettingsOutline} from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { IoMdFolderOpen } from "react-icons/io";
import { SiReaddotcv } from "react-icons/si";
import { RiWallet3Line } from "react-icons/ri";
import { TbFileTextSpark } from "react-icons/tb";

const ProviderSideNav = () => {
  return (
    <div className='providersidenav'>

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
            {/* <Link to="/Dashboard/JobAlerts">
                <i><LuBellRing /></i>
                Job Alerts
            </Link> */}
            <Link to="/Dashboard/Bookings">
                <i><IoBriefcaseOutline /></i>
                My Bookings
            </Link>
        </div>
       
        <div className="manage">
            <p><b>Organize & Manage</b></p>
            <Link to="/Dashboard/Wallet">
                {/* <i><HiOutlineWallet /></i> */}
                <i><RiWallet3Line/></i>
                Wallet
            </Link>
            <Link to="/Dashboard/MyProjects">
                <i><IoMdFolderOpen /></i>
                Projects
            </Link>
            <Link to="/Dashboard/Resume">
                <i><TbFileTextSpark /></i>
                Resume
            </Link>
        </div>

        <div className="account">
            <p><b>Account</b></p>
            <Link to="/Dashboard/Settings">
                <i><IoSettingsOutline /></i>
                Settings
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
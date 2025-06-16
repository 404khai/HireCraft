import React from 'react'
import './ClientSideNav.css'
import { Link } from 'react-router-dom'
import { LuLayoutDashboard, LuBellRing } from "react-icons/lu";
import { TiMessages } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa6";
import { IoExitOutline , IoBriefcaseOutline} from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GrUserWorker } from "react-icons/gr";

const ClientSideNav = () => {
  return (
    <div className='employersidenav'>

        <div className="start">
            <p><b>Home</b></p>
            <Link to="/ClientDashboard">
                <i><LuLayoutDashboard /></i>
                Dashboard
            </Link>
            <Link to="/ProviderDashboard/Messages">
                <i><TiMessages /></i>
                Messages
            </Link>
            {/* <Link to="/Dashboard">
                <i><LuBellRing /></i>
                Job Requests
            </Link> */}
            <Link to="/ClientDashboard/Bookings">
                <i><IoBriefcaseOutline /></i>
                My Bookings
            </Link>
        </div>
       
        <div className="serviceMgt">
            <p><b>Service Management</b></p>
            <Link to="/Dashboard">
                <i><GrUserWorker /></i>
                Hired Providers
            </Link>
            <Link to="/Dashboard">
                <i><LiaFileInvoiceDollarSolid /></i>
                Payments / Invoices
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

export default ClientSideNav
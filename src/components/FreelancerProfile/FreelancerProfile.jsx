import React from 'react'
import './FreelancerProfile.css'
import { Link } from 'react-router-dom';
import OIF from '../../assets/OIF.jpeg'
import { IoLocationOutline } from "react-icons/io5";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";

const FreelancerProfile = () => {
  return (
    <div className='freelancerProfile'>
        <img src={OIF} alt="" />
        <div className="freelancerProfileInfo">
            <p className='freelanceProfileInfoName'><b>Lucas Harris</b></p>
            <p className='freelanceProfileInfoJob'>UI/UX Design</p>
            <div className="providerRating">
                <button>4.5</button>
                <i><FaStar/></i>
                <i><FaStar/></i>
                <i><FaStar/></i>
                <i><FaStar/></i>
                <i><FaRegStarHalfStroke/></i>
            </div>
        </div>
        <div className="freelancerProfileInfo2">
            <div className='freelancerProfileRateBox'>
                <div className='freelancerProfileRate'>
                    <p>Rate</p>
                    <strong>$90 / hour</strong>
                </div>
                <div className='freelancerProfileLocation'>
                    <p>Location</p>
                    <strong> <i><IoLocationOutline /></i>Chicago, Illinois</strong>
                </div>
            </div>

            <button className='viewProfileBtn'>
                <Link to="/ProviderProfile">View Profile</Link>
            </button>
        </div>
    </div>
  )
}

export default FreelancerProfile
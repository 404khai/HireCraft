import React from 'react'
import './ProviderProfile.css'
import OIF from '../../assets/OIF.jpeg'
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import ReactCountryFlag from "react-country-flag"
import { IoLocationOutline } from "react-icons/io5";
import { DiVisualstudio } from 'react-icons/di';

const ProviderProfile = () => {
  return (
    <div className='providerProfile'>
      <div className="providerProfileHead">
        <img src={OIF} alt="" className='providerProfileImg'/>

        <div className="providerProfileName">
          <h3>Daniels Fega</h3>
          <p style={{color: "#808080"}}>Software Engineer</p>

          <div className='providerRatingBox'>
            <div className="providerRating">
              <button>4.5</button>
              <i><FaStar/></i>
              <i><FaStar/></i>
              <i><FaStar/></i>
              <i><FaStar/></i>
              <i><FaRegStarHalfStroke/></i>
            </div>

            <div className='providerProfileCountry'>
              <ReactCountryFlag className='flag' countryCode="US" svg />
              <p>United States</p>
            </div>       
          </div>

          <p className='providerProfileState'><i><IoLocationOutline/></i> Chicago</p>
        </div>

        {/* <button>Send a job request</button> */}

        </div>
    </div>
  )
}

export default ProviderProfile
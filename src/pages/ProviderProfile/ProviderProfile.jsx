import React from 'react'
import './ProviderProfile.css'
import OIF from '../../assets/OIF.jpeg'
import ReactCountryFlag from "react-country-flag"
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { DiVisualstudio } from 'react-icons/di';
import { FaRegThumbsUp, FaInstagram, FaLinkedinIn, FaWhatsapp, FaFacebookF } from "react-icons/fa6";
import mac1 from '../../assets/mac1.jpg'
import mac2 from '../../assets/mac2.jpg'
import mac3 from '../../assets/mac3.jpg'
import lofi from '../../assets/lofi.png'
import shop from '../../assets/shop.jpg'
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

      <div className="providerProfileBody">
        <div className="providerProfileAbout">
          <h3>About Me</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum eaque mollitia officiis nam atque assumenda enim distinctio asperiores temporibus, voluptatum necessitatibus laborum fugit, harum, obcaecati itaque est cumque aliquam saepe?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus vel neque voluptatibus perspiciatis! Cupiditate natus facilis soluta. Ut a, omnis laudantium obcaecati, cumque quos voluptates atque veritatis adipisci at magnam!</p>
        </div>
        <div className="providerProfileOverview">
          <h3>Profile Overview</h3>
          <div className="providerProfileOverviewRates">
            <div className="hourlyRate">
              <strong>$22</strong>
              <p style={{color: "#808080"}}>Hourly Rate</p>
            </div>
            <div className="jobsDone">
              <strong>2</strong>
              <p style={{color: "#808080"}}>Jobs Done</p>
            </div>
          </div>

          <h3>Social Profiles</h3>
          <div className="socialProfiles">
            {/* <i><FaFacebookF/></i> */}
            <i><FaInstagram/></i>
            <i><FaWhatsapp/></i>
            <i><FaLinkedinIn/></i>
          </div>

          <h3>Skills</h3>
          <div className="skills">
            <p>Web Design</p>
            <p>UI / UX Design</p>
            <p>Web Design</p>
            <p>UI / UX Design</p>
            <p>Web Design</p>
            <p>UI / UX Design</p>
          </div>

          <h3>Attachments</h3>
          <div className="cvFile">
            <p>My-CV.pdf</p>
            <p>pdf</p>
          </div>
        </div>

        <div className="providerProfilePortfolio">
          <h3>Portfolio</h3>

          <div className="providerProfilePortfolioImgBox">
            <div className="providerProfilePortfolioImg1">
                <img src={shop} alt=""/>
            </div>
            <div className="providerProfilePortfolioImg2">
                <img src={mac1} alt=""/>
            </div>
            <div className="providerProfilePortfolioImg3">
                <img src={lofi} alt=""/>
            </div>
            <div className="providerProfilePortfolioImg4">
                {/* <img src={shop} alt=""/> */}
            </div>
            <div className="providerProfilePortfolioImg5">
                {/* <img src={mac3} alt="" /> */}
            </div>

          </div>
        </div>
        <div className="providerWorkFeedback">
          <h3><i><FaRegThumbsUp/></i> Work Feedback</h3>
          <ReviewCard/>
          
        </div>
      </div>
    </div>
  )
}

export default ProviderProfile
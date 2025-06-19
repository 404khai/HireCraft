import React, {useContext, useEffect, useState} from 'react'
import './Profile.css'
import OIF from '../../assets/OIF.jpeg'
import ReactCountryFlag from "react-country-flag"
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { FaStar, FaRegStarHalfStroke, FaRegStar } from 'react-icons/fa6';
import { IoLocationOutline } from "react-icons/io5";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { DiVisualstudio } from 'react-icons/di';
import { FaRegThumbsUp, FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa6";
import mac1 from '../../assets/mac1.jpg'
import mac2 from '../../assets/mac2.jpg'
import mac3 from '../../assets/mac3.jpg'
import lofi from '../../assets/lofi.png'
import shop from '../../assets/shop.jpg'

import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json'; // Import English locale data
countries.registerLocale(en); // Register the locale data for lookup

import { AuthContext } from '../../context/AuthContext';
import Avatar from '../../components/Avatar';

const Profile = () => {

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [occupation, setOccupation] = useState('');
  const [hourlyRate, setHourlyRate] = useState('')
  const [providerBio, setProviderBio] = useState('');
  const [skills, setSkills] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');

  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  // NEW STATE: To store the ISO country code for the flag
  const [displayCountryCode, setDisplayCountryCode] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
      setOccupation(user.occupation || '');
      setHourlyRate(user.hourlyRate || '');
      setProviderBio(user.providerBio || '');
      setAverageRating(user.averageRating !== undefined && user.averageRating !== null ? user.averageRating : 0);
      setSkills(Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''));
      setProfilePictureUrl(user.profilePictureUrl || profilePictureUrl);

      setSelectedCountryName(user.country || '');
      setSelectedStateName(user.state || '');
      setSelectedCityName(user.city || '');

      if (user.country) {
        // Get the 2-letter country code (e.g., "NG" for "Nigeria")
        const code = countries.getAlpha2Code(user.country, 'en');
        setDisplayCountryCode(code || ''); // Set the code, or empty string if not found
      } else {
        setDisplayCountryCode(''); // Clear code if no country is set
      }
    }
  }, [user]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0; // Check if there's a decimal part
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`}><FaStar/></i>);
    }

        // Half star (if applicable)
    if (hasHalfStar) {
        stars.push(<i key="half"><FaRegStarHalfStroke/></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`}><FaRegStar/></i>); // Assuming FaRegStar is imported
    }

    return stars;
  };

  return (
    <div className='providerProfile'>
      <div className="providerProfileHead">
        <Avatar
          imageUrl={profilePictureUrl}
          firstName={firstName}
          lastName={lastName}
          size={100} // Adjust size as needed
          textSize={40} // Adjust text size for initials
          className='providerProfileImg' // Add your existing CSS class for extra styling
        />

        <div className="providerProfileName">
          <h3>{firstName + " " +lastName}</h3>
          <p style={{color: "#808080"}}>{occupation}</p>

          <div className='providerRatingBox'>
            <div className="providerRating">
              <button>{averageRating.toFixed(1)}</button> {/* Display with 1 decimal place */}
              {renderStars(averageRating)}
            </div>

            <div className='providerProfileCountry'>
              {displayCountryCode && ( // Only render flag if a code is available
                <ReactCountryFlag
                  className='flag'
                  countryCode={displayCountryCode} // Use the derived country code
                  svg
                  title={selectedCountryName} // Add title for accessibility
                />
              )}
              <p>{selectedCountryName}</p>
            </div>
          </div>
          <p className='providerProfileState'>
            <i><IoLocationOutline /></i> {selectedCityName}
            {selectedCityName && selectedStateName && ', '}
            {selectedStateName}
          </p>
          {/* <p className='providerProfileState'><i><IoLocationOutline/></i> {selectedCityName}, {selectedStateName}</p> */}
        </div>

        <div className="socialLinks">
          <p>
            <i><FiPhoneCall/></i>
            {phoneNumber}
          </p>
          <p>
            <i><FiMail/></i>
            {email}
          </p>
          
        </div>
        {/* <button>Send a job request</button> */}

      </div>

      <div className="providerProfileBody">
        <div className="providerProfileAbout">
          <h3>About Me</h3>
          <p>{providerBio || 'No bio provided yet.'}</p>
        </div>
        <div className="providerProfileOverview">
          <h3>Profile Overview</h3>
          <div className="providerProfileOverviewRates">
            <div className="hourlyRate">
              <strong>${hourlyRate}</strong>
              <p style={{color: "#808080"}}>Hourly Rate</p>
            </div>
            <div className="jobsDone">
              <strong>2</strong>
              <p style={{color: "#808080"}}>Jobs Done</p>
            </div>
          </div>

          {/* <h3>Social Profiles</h3>
          <div className="socialProfiles">
            <i><FaInstagram/></i>
            <i><FaWhatsapp/></i>
            <i><FaFacebookF/></i>
          </div> */}

          <h3>Skills</h3>
          <div className="skills">
            {skills.split(',').filter(s => s.trim() !== '').map((skill, index) => (
              <p key={index}>{skill.trim()}</p>
            ))}
            {/* Fallback if no skills */}
            {(!skills || skills.split(',').filter(s => s.trim() !== '').length === 0) && (
              <p style={{color: "#808080"}}>No skills listed yet.</p>
            )}
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

export default Profile
// import React from 'react'
// import './FreelancerProfile.css'
// import { Link } from 'react-router-dom';
// import OIF from '../../assets/OIF.jpeg'
// import { IoLocationOutline } from "react-icons/io5";
// import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";

// const FreelancerProfile = () => {
//   return (
//     <div className='freelancerProfile'>
//         <img src={OIF} alt="" />
//         <div className="freelancerProfileInfo">
//             <p className='freelanceProfileInfoName'><b>Lucas Harris</b></p>
//             <p className='freelanceProfileInfoJob'>UI/UX Design</p>
//             <div className="providerRating">
//                 <button>4.5</button>
//                 <i><FaStar/></i>
//                 <i><FaStar/></i>
//                 <i><FaStar/></i>
//                 <i><FaStar/></i>
//                 <i><FaRegStarHalfStroke/></i>
//             </div>
//         </div>
//         <div className="freelancerProfileInfo2">
//             <div className='freelancerProfileRateBox'>
//                 <div className='freelancerProfileRate'>
//                     <p>Rate</p>
//                     <strong>$90 / hour</strong>
//                 </div>
//                 <div className='freelancerProfileLocation'>
//                     <p>Location</p>
//                     <strong> <i><IoLocationOutline /></i>Chicago, Illinois</strong>
//                 </div>
//             </div>

//             <button className='viewProfileBtn'>
//                 <Link to="/ProviderProfile">View Profile</Link>
//             </button>
//         </div>
//     </div>
//   )
// }

// export default FreelancerProfile



// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext'; // Replace with your actual context

// const FreelancerProfile = ({ provider }) => {
//   const { user } = useContext(AuthContext);

//   return (
//     <div className='freelancerProfile'>
//         <img src={OIF} alt="" />

//         <div className="freelancerProfileInfo">
//             <p className='freelanceProfileInfoName'><b>Lucas Harris</b></p>
//             <p className='freelanceProfileInfoJob'>UI/UX Design</p>
//             <div className="providerRating">
//                 <button>4.5</button>
//                 <i><FaStar/></i>
//                 <i><FaStar/></i>
//                 <i><FaStar/></i>
//                 <i><FaStar/></i>
//                 <i><FaRegStarHalfStroke/></i>
//             </div>
//         </div>

//         <div className="freelancerProfileInfo2">
//             <div className='freelancerProfileRateBox'>
//                 <div className='freelancerProfileRate'>
//                     <p>Rate</p>
//                     <strong>$90 / hour</strong>
//                 </div>
//                 <div className='freelancerProfileLocation'>
//                     <p>Location</p>
//                     <strong> <i><IoLocationOutline /></i>Chicago, Illinois</strong>
//                 </div>
//             </div>
//         </div>

//       {user && user.role === 'ROLE_CLIENT' && (
//         <button className='viewProfileBtn'>
//           <Link to={`/ProviderProfile/${provider.id}`}>View Profile</Link>
//         </button>
//       )}
//     </div>
//   );
// };

// export default FreelancerProfile;

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import { FaStar, FaRegStarHalfStroke } from 'react-icons/fa6';
import { AuthContext } from '../../context/AuthContext'; // Ensure this path is correct
import './FreelancerProfile.css'; // Ensure your CSS file is correctly linked
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json'; // Import English locale data
countries.registerLocale(en); 
import ReactCountryFlag from "react-country-flag"

// Placeholder image if no profile picture is available
const PLACEHOLDER_IMG = 'https://placehold.co/150x150/EEEEEE/888888?text=No+Image';

const FreelancerProfile = ({ provider }) => {
  const { user } = useContext(AuthContext); // Assuming AuthContext provides user object and role

  const [displayCountryCode, setDisplayCountryCode] = useState('');
  // Helper function to render star ratings dynamically
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar className='renderStars' key={`full-${i}`} />);
    }
    if (hasHalfStar) {
      stars.push(<FaRegStarHalfStroke className='renderStars' key="half" />);
    }
    // Using FaRegStarHalfStroke for empty stars, you could use a FaRegStar if preferred
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStarHalfStroke className='renderStars empty-star' key={`empty-${i}`} />);
    }
    return stars;
  };

  // Ensure provider object exists before accessing its properties
  if (!provider) {
    return null; // Or a loading/placeholder state if this component could render independently
  }

  // Destructure provider properties with fallbacks
  const {
    providerId,
    firstName,
    lastName,
    occupation,
    averageRating = 0, // Default to 0 if null/undefined
    hourlyRate,
    city,
    state,
    country,
    profilePictureUrl
  } = provider;

  const fullName = `${firstName || ''} ${lastName || ''}`.trim();
  const location = [state].filter(Boolean).join(', '); // Concatenate non-empty location parts

  useEffect(() => {
      if (user) {
        if (country) {
          // Get the 2-letter country code (e.g., "NG" for "Nigeria")
          const code = countries.getAlpha2Code(country, 'en');
          setDisplayCountryCode(code || ''); // Set the code, or empty string if not found
        } else {
          setDisplayCountryCode(''); // Clear code if no country is set
        }
      }
    }, [user]);

  return (
    <div className='freelancerProfile'>
      {/* Use provider's profile picture URL or a placeholder */}
      <img className='freelancerProfileImg' src={profilePictureUrl || PLACEHOLDER_IMG} alt={`${fullName}'s profile`} />

      <div className="providerNameInfo">
      <div className="freelancerProfileInfo">
        <div className='providerProfileInfoName'>
          <b>{fullName || 'N/A'}</b> 
         
            {displayCountryCode && ( // Only render flag if a code is available
              <ReactCountryFlag
                className='flag2'
                countryCode={displayCountryCode} // Use the derived country code
                svg
                title={country} // Add title for accessibility
              />
            )}       
       
        </div>
        <p className='freelanceProfileInfoJob'>{occupation || 'Not Specified'}</p>

        {/* Display rating if available and greater than 0 */}
        {averageRating > 0 && (
          <div className="providerRating">
            <button>{averageRating.toFixed(1)}</button> {/* Display rating with one decimal place */}
            {renderStars(averageRating)}
          </div>
        )}
      </div>

      <div className="freelancerProfileInfo2">
        <div className='freelancerProfileRateBox'>
          <div className='freelancerProfileRate'>
            <p>Rate</p>
            {/* Display hourly rate, default if not available */}
            <strong>{hourlyRate ? `₦${hourlyRate} / day` : 'N/A'}</strong>
          </div>
          <div className='freelancerProfileLocation'>
            <p>Location</p>
            {/* Display location, default if not available */}
            <strong>
              {location ? (
                <><i><IoLocationOutline /></i>{location}</>
              ) : 'N/A'}
            </strong>
          </div>
        </div>

        {/* Conditionally render "View Profile" button only if user is a client */}
        {/* Assuming `user` object and `user.userRole` are available from AuthContext */}
        {user && user.userRole === 'ROLE_CLIENT' && (
          <button className='viewProfileBtn'>
            {/* Link to the specific provider's detailed profile page */}
            <Link to={`/ProviderProfile/${providerId}`}>View Profile</Link>
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
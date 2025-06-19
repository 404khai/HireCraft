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

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import { FaStar, FaRegStarHalfStroke } from 'react-icons/fa6';
import { AuthContext } from '../../context/AuthContext'; // Ensure this path is correct
import './FreelancerProfile.css'; // Ensure your CSS file is correctly linked

// Placeholder image if no profile picture is available
const PLACEHOLDER_IMG = 'https://placehold.co/150x150/EEEEEE/888888?text=No+Image';

const FreelancerProfile = ({ provider }) => {
  const { user } = useContext(AuthContext); // Assuming AuthContext provides user object and role

  // Helper function to render star ratings dynamically
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    if (hasHalfStar) {
      stars.push(<FaRegStarHalfStroke key="half" />);
    }
    // Using FaRegStarHalfStroke for empty stars, you could use a FaRegStar if preferred
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStarHalfStroke key={`empty-${i}`} className="empty-star" />);
    }
    return stars;
  };

  // Ensure provider object exists before accessing its properties
  if (!provider) {
    return null; // Or a loading/placeholder state if this component could render independently
  }

  // Destructure provider properties with fallbacks
  const {
    id,
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
  const location = [city, state, country].filter(Boolean).join(', '); // Concatenate non-empty location parts

  return (
    <div className='freelancerProfile'>
      {/* Use provider's profile picture URL or a placeholder */}
      <img src={profilePictureUrl || PLACEHOLDER_IMG} alt={`${fullName}'s profile`} />

      <div className="freelancerProfileInfo">
        <p className='freelanceProfileInfoName'><b>{fullName || 'N/A'}</b></p>
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
            <strong>{hourlyRate ? `$${hourlyRate} / hour` : 'N/A'}</strong>
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
            <Link to={`/ProviderProfile/${id}`}>View Profile</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;
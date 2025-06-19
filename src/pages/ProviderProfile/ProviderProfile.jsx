// import React, { useContext, useEffect, useState } from 'react';
// import './ProviderProfile.css'
// import { useParams } from 'react-router-dom'; // Import useParams
// import { IoLocationOutline } from 'react-icons/io5';
// import { FaStar, FaRegStarHalfStroke, FaRegStar, FaRegThumbsUp } from 'react-icons/fa6';
// import { FiMail, FiPhoneCall } from "react-icons/fi";
// import ReactCountryFlag from 'react-country-flag';
// import countries from 'i18n-iso-countries';
// import en from 'i18n-iso-countries/langs/en.json';
// countries.registerLocale(en);

// import { AuthContext } from '../../context/AuthContext';
// import Avatar from '../../components/Avatar';
// import ReviewCard from '../../components/ReviewCard/ReviewCard'; // Assuming you still use this
// import SendJobRequestBtn from '../../components/SendJobRequestBtn';
// // Import placeholder images if needed
// // import mac1 from '../../assets/mac1.jpg';
// // import mac2 from '../../assets/mac2.jpg';
// // import mac3 from '../../assets/mac3.jpg';
// // import lofi from '../../assets/lofi.png';
// // import shop from '../../assets/shop.jpg';

// const API_BASE_URL = 'http://localhost:9090/api/v1/users'; // Define API base URL

// const PLACEHOLDER_IMG = 'https://placehold.co/150x150/EEEEEE/888888?text=No+Image';

// const ProviderProfile = () => {
//   const { id } = useParams(); // <--- Get the provider ID from the URL
//   const { token } = useContext(AuthContext); // Get the token for API calls
//   const { user: loggedInUser } = useContext(AuthContext); // Get logged-in user, potentially for conditional rendering later

//   const [providerData, setProviderData] = useState(null); // State to hold all fetched provider data
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // States derived from providerData for display purposes
//   const [displayCountryCode, setDisplayCountryCode] = useState('');

//   useEffect(() => {
//     // This effect runs when the component mounts or when 'id' or 'token' changes
//     const fetchProviderDetails = async () => {
//       if (!id) {
//         setError('Provider ID is missing from URL.');
//         setIsLoading(false);
//         return;
//       }
//       if (!token) {
//         setError('Authentication token is missing. Please log in.');
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(`${API_BASE_URL}/providers/${id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           // Provide more specific error messages for 401/403
//           if (response.status === 401 || response.status === 403) {
//             throw new Error('You are not authorized to view this profile. Please log in.');
//           } else if (response.status === 404) {
//             throw new Error('Provider not found.');
//           }
//           throw new Error(errorData.message || `Failed to fetch provider details. Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setProviderData(data); // Set the entire fetched data to state

//         // Set country code for flag if country data is available
//         if (data.country) {
//           const code = countries.getAlpha2Code(data.country, 'en');
//           setDisplayCountryCode(code || '');
//         } else {
//           setDisplayCountryCode('');
//         }

//       } catch (err) {
//         console.error('Error fetching provider details:', err);
//         setError(err.message || 'Failed to load provider profile. Please try again.');
//         setProviderData(null); // Clear data on error
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProviderDetails();
//   }, [id, token]); // Dependencies: Re-run if ID or token changes

//   // Helper function to render star ratings dynamically (keep this as is)
//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
//     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
//     const stars = [];

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<i key={`full-${i}`}><FaStar/></i>);
//     }
//     if (hasHalfStar) {
//       stars.push(<i key="half"><FaRegStarHalfStroke/></i>);
//     }
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<i key={`empty-${i}`}><FaRegStar/></i>);
//     }
//     return stars;
//   };

//   // Render loading, error, or data
//   if (isLoading) {
//     return <div className="providerProfile"><p>Loading provider profile...</p></div>;
//   }

//   if (error) {
//     return <div className="providerProfile"><p className="error-message" style={{ color: 'red' }}>{error}</p></div>;
//   }

//   if (!providerData) {
//     return <div className="providerProfile"><p>No provider data found.</p></div>; // Should ideally be caught by error state
//   }

//   // Destructure providerData for easier access in JSX
//   const {
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//     occupation,
//     hourlyRate,
//     providerBio,
//     skills,
//     averageRating = 0,
//     city,
//     state,
//     country,
//     profilePictureUrl,
//     // Assuming portfolioImages is an array of URLs for the portfolio section
//     portfolioImages = []
//   } = providerData;

//   const fullName = `${firstName || ''} ${lastName || ''}`.trim();
//   const location = [city, state].filter(Boolean).join(', '); // city, state

//   return (
//     <div className='providerProfile'>
//       <div className="providerProfileHead">
//         <Avatar
//           imageUrl={profilePictureUrl || PLACEHOLDER_IMG}
//           firstName={firstName}
//           lastName={lastName}
//           size={100}
//           textSize={40}
//           className='providerProfileImg'
//         />

//         <div className="providerProfileName">
//           <h3>{fullName || 'N/A'}</h3>
//           <p style={{color: "#808080"}}>{occupation || 'Not Specified'}</p>

//           <div className='providerRatingBox'>
//             <div className="providerRating">
//               <button>{averageRating.toFixed(1)}</button>
//               {renderStars(averageRating)}
//             </div>

//             <div className='providerProfileCountry'>
//               {displayCountryCode && (
//                 <ReactCountryFlag
//                   className='flag'
//                   countryCode={displayCountryCode}
//                   svg
//                   title={country}
//                 />
//               )}
//               <p>{country || 'N/A'}</p> {/* Display full country name */}
//             </div>
//           </div>
//           <p className='providerProfileState'>
//             <i><IoLocationOutline /></i> {location || 'N/A'}
//           </p>
//         </div>

//         <div className="socialLinks2">
//           <p>
//             <i><FiPhoneCall/></i>
//             {phoneNumber || 'N/A'}
//           </p>
//           <p>
//             <i><FiMail/></i>
//             {email || 'N/A'}
//           </p>

//           <SendJobRequestBtn/>
//           {/* <button className='sendJobRequestBtn'>Send Job Request</button> */}
//         </div>
//         {/* You can add a "Send a job request" button here, maybe conditionally based on loggedInUser.userRole */}
//       </div>

//       <div className="providerProfileBody">
//         <div className="providerProfileAbout">
//           <h3>About Me</h3>
//           <p>{providerBio || 'No bio provided yet.'}</p>
//         </div>
//         <div className="providerProfileOverview">
//           <h3>Profile Overview</h3>
//           <div className="providerProfileOverviewRates">
//             <div className="hourlyRate">
//               <strong>{hourlyRate ? `$${hourlyRate}` : 'N/A'}</strong>
//               <p style={{color: "#808080"}}>Hourly Rate</p>
//             </div>
//             <div className="jobsDone">
//               <strong>{providerData.jobsDone || '0'}</strong> {/* Assuming jobsDone comes from providerData */}
//               <p style={{color: "#808080"}}>Jobs Done</p>
//             </div>
//           </div>

//           <h3>Skills</h3>
//             <div className="skills">
//               {/* Check if skills is an array and has elements */}
//               {skills && Array.isArray(skills) && skills.length > 0 ? (
//                 skills.map((skill, index) => (
//                   <p key={index}>{skill.trim()}</p>
//                 ))
//               ) : (
//                 <p style={{color: "#808080"}}>No skills listed yet.</p>
//               )}
//             </div>
          

//           <h3>Attachments</h3>
//           <div className="cvFile">
//             {/* You'll need the actual CV URL from the providerData */}
//             {providerData.cvUrl ? (
//               <>
//                 <p><a href={providerData.cvUrl} target="_blank" rel="noopener noreferrer">Download CV</a></p>
//                 <p>pdf</p> {/* You might need to parse file type from URL */}
//               </>
//             ) : (
//               <p style={{color: "#808080"}}>No CV uploaded.</p>
//             )}
//           </div>
//         </div>

//         <div className="providerProfilePortfolio">
//           <h3>Portfolio</h3>
//           <div className="providerProfilePortfolioImgBox">
//             {portfolioImages.length > 0 ? (
//               portfolioImages.map((imgUrl, index) => (
//                 <div key={index} className={`providerProfilePortfolioImg${index + 1}`}>
//                   <img src={imgUrl} alt={`Portfolio item ${index + 1}`} />
//                 </div>
//               ))
//             ) : (
//               <p style={{color: "#808080"}}>No portfolio images yet.</p>
//             )}
//           </div>
//         </div>
//         <div className="providerWorkFeedback">
//           <h3><i><FaRegThumbsUp/></i> Work Feedback</h3>
//           {/* You might want to pass provider.id to ReviewCard to fetch reviews for this specific provider */}
//           <ReviewCard providerId={id} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProviderProfile;



import React, { useContext, useEffect, useState } from 'react';
import './ProviderProfile.css'
import { useParams } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import { FaStar, FaRegStarHalfStroke, FaRegStar, FaRegThumbsUp } from 'react-icons/fa6';
import { FiMail, FiPhoneCall } from "react-icons/fi";
import ReactCountryFlag from 'react-country-flag';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(en);

import { AuthContext } from '../../context/AuthContext';
import Avatar from '../../components/Avatar';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import SendJobRequestBtn from '../../components/SendJobRequestBtn';
import BookingModal from '../../components/BookingModal'; // Import the new modal component
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS

const API_BASE_URL = 'http://localhost:9090/api/v1/users';

const PLACEHOLDER_IMG = 'https://placehold.co/150x150/EEEEEE/888888?text=No+Image';

const ProviderProfile = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { user: loggedInUser } = useContext(AuthContext);

  const [providerData, setProviderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCountryCode, setDisplayCountryCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchProviderDetails = async () => {
      if (!id) {
        setError('Provider ID is missing from URL.');
        setIsLoading(false);
        return;
      }
      if (!token) {
        setError('Authentication token is missing. Please log in.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/providers/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401 || response.status === 403) {
            throw new Error('You are not authorized to view this profile. Please log in.');
          } else if (response.status === 404) {
            throw new Error('Provider not found.');
          }
          throw new Error(errorData.message || `Failed to fetch provider details. Status: ${response.status}`);
        }

        const data = await response.json();
        setProviderData(data);

        if (data.country) {
          const code = countries.getAlpha2Code(data.country, 'en');
          setDisplayCountryCode(code || '');
        } else {
          setDisplayCountryCode('');
        }

      } catch (err) {
        console.error('Error fetching provider details:', err);
        setError(err.message || 'Failed to load provider profile. Please try again.');
        setProviderData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviderDetails();
  }, [id, token]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`}><FaStar/></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half"><FaRegStarHalfStroke/></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`}><FaRegStar/></i>);
    }
    return stars;
  };

  const openBookingModal = () => {
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div className="providerProfile"><p>Loading provider profile...</p></div>;
  }

  if (error) {
    return <div className="providerProfile"><p className="error-message" style={{ color: 'red' }}>{error}</p></div>;
  }

  if (!providerData) {
    return <div className="providerProfile"><p>No provider data found.</p></div>;
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    occupation,
    hourlyRate,
    providerBio,
    skills,
    averageRating = 0,
    city,
    state,
    country,
    profilePictureUrl,
    portfolioImages = []
  } = providerData;

  const fullName = `${firstName || ''} ${lastName || ''}`.trim();
  const location = [city, state].filter(Boolean).join(', ');

  return (
    <div className='providerProfile'>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <div className="providerProfileHead">
        <Avatar
          imageUrl={profilePictureUrl || PLACEHOLDER_IMG}
          firstName={firstName}
          lastName={lastName}
          size={100}
          textSize={40}
          className='providerProfileImg'
        />

        <div className="providerProfileName">
          <h3>{fullName || 'N/A'}</h3>
          <p style={{color: "#808080"}}>{occupation || 'Not Specified'}</p>

          <div className='providerRatingBox'>
            <div className="providerRating">
              <button>{averageRating.toFixed(1)}</button>
              {renderStars(averageRating)}
            </div>

            <div className='providerProfileCountry'>
              {displayCountryCode && (
                <ReactCountryFlag
                  className='flag'
                  countryCode={displayCountryCode}
                  svg
                  title={country}
                />
              )}
              <p>{country || 'N/A'}</p>
            </div>
          </div>
          <p className='providerProfileState'>
            <i><IoLocationOutline /></i> {location || 'N/A'}
          </p>
        </div>

        <div className="socialLinks2">
          <p>
            <i><FiPhoneCall/></i>
            {phoneNumber || 'N/A'}
          </p>
          <p>
            <i><FiMail/></i>
            {email || 'N/A'}
          </p>

          {/* Render the SendJobRequestBtn and attach the openBookingModal function */}
          <SendJobRequestBtn onClick={openBookingModal}/>
        </div>
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
              <strong>{hourlyRate ? `$${hourlyRate}` : 'N/A'}</strong>
              <p style={{color: "#808080"}}>Hourly Rate</p>
            </div>
            <div className="jobsDone">
              <strong>{providerData.jobsDone || '0'}</strong>
              <p style={{color: "#808080"}}>Jobs Done</p>
            </div>
          </div>

          <h3>Skills</h3>
            <div className="skills">
              {skills && Array.isArray(skills) && skills.length > 0 ? (
                skills.map((skill, index) => (
                  <p key={index}>{skill.trim()}</p>
                ))
              ) : (
                <p style={{color: "#808080"}}>No skills listed yet.</p>
              )}
            </div>
          

          <h3>Attachments</h3>
          <div className="cvFile">
            {providerData.cvUrl ? (
              <>
                <p><a href={providerData.cvUrl} target="_blank" rel="noopener noreferrer">Download CV</a></p>
                <p>pdf</p>
              </>
            ) : (
              <p style={{color: "#808080"}}>No CV uploaded.</p>
            )}
          </div>
        </div>

        <div className="providerProfilePortfolio">
          <h3>Portfolio</h3>
          <div className="providerProfilePortfolioImgBox">
            {portfolioImages.length > 0 ? (
              portfolioImages.map((imgUrl, index) => (
                <div key={index} className={`providerProfilePortfolioImg${index + 1}`}>
                  <img src={imgUrl} alt={`Portfolio item ${index + 1}`} />
                </div>
              ))
            ) : (
              <p style={{color: "#808080"}}>No portfolio images yet.</p>
            )}
          </div>
        </div>
        <div className="providerWorkFeedback">
          <h3><i><FaRegThumbsUp/></i> Work Feedback</h3>
          <ReviewCard providerId={id} />
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={closeBookingModal}
        providerId={id} 
        providerName={fullName} 
      />
    </div>
  );
};

export default ProviderProfile;
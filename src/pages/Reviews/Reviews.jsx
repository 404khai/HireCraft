// import React, { useState, useEffect, useContext } from 'react'; // Import necessary hooks
// import './Reviews.css';
// import DashboardNav from '../../components/DashboardNav/DashboardNav';
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
// import ReviewCard from '../../components/ReviewCard/ReviewCard';
// import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

// const Reviews = () => {
//   const { user } = useContext(AuthContext); // Get user from AuthContext
//   const token = localStorage.getItem('token'); // Get token for authentication

//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [filteredReviews, setFilteredReviews] = useState([]); // Add filtered reviews state
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchReviews = async () => {
//       if (!token) {
//         setError('Authentication token not found. Please log in.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:9090/api/v1/reviews/provider/me', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setReviews(data); // Set the fetched reviews
//         setFilteredReviews(data);
//       } catch (err) {
//         console.error('Error fetching reviews:', err);
//         setError(err.message || 'Failed to load reviews.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) { // Only fetch if user data is available (meaning authenticated)
//       fetchReviews();
//     } else {
//       setLoading(false); // If no user, stop loading and show no reviews
//       setError('No user logged in to fetch reviews for.');
//     }
//   }, [user, token]); // Re-run effect if user or token changes

//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredReviews(reviews); // Show all reviews if search is empty
//     } else {
//       const filtered = reviews.filter(review => {
//         const searchLower = searchTerm.toLowerCase();
//         return (
//           // Search in review text
//           (review.reviewTxt && review.reviewTxt.toLowerCase().includes(searchLower)) ||
//           // Search in client full name
//           (review.clientFullName && review.clientFullName.toLowerCase().includes(searchLower)) ||
//           // Search in rating (convert to string for search)
//           review.rating.toString().includes(searchTerm)
//         );
//       });
//       setFilteredReviews(filtered);
//     }
//   }, [searchTerm, reviews]); // Re-run when search term or reviews change

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   if (loading) {
//     return (
//       <div className='dashboardBox'>
//         <DashboardNav />
//         <div className='dashboardBody'>
//           <ProviderSideNav />
//           <div className="dashboard">
//             <p>Loading reviews...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className='dashboardBox'>
//         <DashboardNav />
//         <div className='dashboardBody'>
//           <ProviderSideNav />
//           <div className="dashboard">
//             <p style={{ color: 'red' }}>Error: {error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='dashboardBox'>
//       <DashboardNav />
//       <div className='dashboardBody'>
//         <ProviderSideNav />
//         <div className="dashboard">
//           <div className="welcome">
//             <div className="welcomeTxt">
//               <h2>Reviews</h2>
//             </div>
//             <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Reviews" link2="/ProviderDashboard/Reviews" />
//           </div>

//           <div className="reviewsBox">
//             <div className="searchReviewsBox">
//               <input
//                 placeholder="Search Reviews...."
//                 className="searchReviews"
//                 name="text"
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
            
//             {searchTerm && (
//               <p className="searchResults">
//                 Found {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''} 
//                 {searchTerm && ` for "${searchTerm}"`}
//               </p>
//             )}
            
//             {filteredReviews.length > 0 ? (
//               filteredReviews.map((review, index) => (
//                 <div className="reviewBoxEach" key={review.id || index}> {/* Use index as fallback key */}
//                   <ReviewCard review={review} />
//                 </div>
//               ))
//             ) : (
//               <p>
//                 {searchTerm 
//                   ? `No reviews found matching "${searchTerm}"`
//                   : "No reviews available for you yet."
//                 }
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reviews;






// import React, { useState, useEffect, useContext } from 'react'; // Import necessary hooks
// import './Reviews.css';
// import DashboardNav from '../../components/DashboardNav/DashboardNav';
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
// import ReviewCard from '../../components/ReviewCard/ReviewCard';
// import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

// const Reviews = () => {
//   const { user } = useContext(AuthContext); // Get user from AuthContext
//   const token = localStorage.getItem('token'); // Get token for authentication

//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [filteredReviews, setFilteredReviews] = useState([]); // Add filtered reviews state
//   const [searchTerm, setSearchTerm] = useState('');
//   const [userRole, setUserRole] = useState(null); // Track user role

//   useEffect(() => {
//     const fetchReviews = async () => {
//       if (!token) {
//         setError('Authentication token not found. Please log in.');
//         setLoading(false);
//         return;
//       }

//       if (!user) {
//         setLoading(false);
//         setError('No user logged in to fetch reviews for.');
//         return;
//       }

//       try {
//         // Determine user role and API endpoint
//         let apiEndpoint = '';
//         let role = '';

//         // Check if user has provider role (adjust this based on your user object structure)
//         if (user.userRole === 'ROLE_PROVIDER') {
//           apiEndpoint = 'http://localhost:9090/api/v1/reviews/provider/me';
//           role = 'provider';
//         } else if (user.userRole === 'ROLE_CLIENT') {
//           apiEndpoint = 'http://localhost:9090/api/v1/reviews/client/me';
//           role = 'client';
//         } else {
//           // If role is not clear, try provider first, then client
//           apiEndpoint = 'http://localhost:9090/api/v1/reviews/provider/me';
//           role = 'provider';
//         }

//         setUserRole(role);

//         const response = await fetch(apiEndpoint, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           // If provider endpoint fails and we haven't tried client yet, try client endpoint
//           if (role === 'provider' && response.status === 403) {
//             const clientResponse = await fetch('http://localhost:9090/api/v1/reviews/client/me', {
//               method: 'GET',
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//               },
//             });

//             if (clientResponse.ok) {
//               const clientData = await clientResponse.json();
//               setUserRole('client');
//               setReviews(clientData);
//               setFilteredReviews(clientData);
//               return;
//             }
//           }

//           const errorData = await response.json();
//           throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setReviews(data); // Set the fetched reviews
//         setFilteredReviews(data);
//       } catch (err) {
//         console.error('Error fetching reviews:', err);
//         setError(err.message || 'Failed to load reviews.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) { // Only fetch if user data is available (meaning authenticated)
//       fetchReviews();
//     } else {
//       setLoading(false); // If no user, stop loading and show no reviews
//       setError('No user logged in to fetch reviews for.');
//     }
//   }, [user, token]); // Re-run effect if user or token changes

//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredReviews(reviews); // Show all reviews if search is empty
//     } else {
//       const filtered = reviews.filter(review => {
//         const searchLower = searchTerm.toLowerCase();
        
//         // Format the date for searching
//         const reviewDate = new Date(review.createdAt).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//         });
        
//         // Extract month name separately for more flexible searching
//         const monthName = new Date(review.createdAt).toLocaleDateString('en-US', {
//           month: 'long',
//         });
        
//         // Extract short month name too (Jan, Feb, etc.)
//         const shortMonthName = new Date(review.createdAt).toLocaleDateString('en-US', {
//           month: 'short',
//         });
        
//         return (
//           // Search in review text
//           (review.reviewTxt && review.reviewTxt.toLowerCase().includes(searchLower)) ||
//           // Search in client full name (for provider reviews)
//           (review.clientFullName && review.clientFullName.toLowerCase().includes(searchLower)) ||
//           // Search in provider name (for client reviews)
//           (review.providerFullName && review.providerFullName.toLowerCase().includes(searchLower)) ||
//           // Search in formatted date (full date)
//           reviewDate.toLowerCase().includes(searchLower) ||
//           // Search in month name (January, February, etc.)
//           monthName.toLowerCase().includes(searchLower) ||
//           // Search in short month name (Jan, Feb, etc.)
//           shortMonthName.toLowerCase().includes(searchLower) ||
//           // Search in rating (convert to string for search)
//           review.rating.toString().includes(searchTerm)
//         );
//       });
//       setFilteredReviews(filtered);
//     }
//   }, [searchTerm, reviews]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Get appropriate header text based on user role
//   const getHeaderText = () => {
//     if (userRole === 'provider') {
//       return 'Reviews Received';
//     } else if (userRole === 'client') {
//       return 'Reviews Given';
//     }
//     return 'Reviews';
//   };

//   // Get appropriate placeholder text based on user role
//   const getPlaceholderText = () => {
//     if (userRole === 'provider') {
//       return 'Search reviews from clients...';
//     } else if (userRole === 'client') {
//       return 'Search reviews you gave...';
//     }
//     return 'Search Reviews...';
//   };

//   if (loading) {
//     return (
//       <div className='dashboardBox'>
//         <DashboardNav />
//         <div className='dashboardBody'>
//           <ProviderSideNav />
//           <div className="dashboard">
//             <p>Loading reviews...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className='dashboardBox'>
//         <DashboardNav />
//         <div className='dashboardBody'>
//           <ProviderSideNav />
//           <div className="dashboard">
//             <p style={{ color: 'red' }}>Error: {error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='dashboardBox'>
//       <DashboardNav />
//       <div className='dashboardBody'>
//         <ProviderSideNav />
//         <div className="dashboard">
//           <div className="welcome">
//             <div className="welcomeTxt">
//               <h2>{getHeaderText()}</h2>
//             </div>
//             <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Reviews" link2="/ProviderDashboard/Reviews" />
//           </div>

//           <div className="reviewsBox">
//             <div className="searchReviewsBox">
//               <input
//                 placeholder={getPlaceholderText()}
//                 className="searchReviews"
//                 name="text"
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
            
//             {/* {searchTerm && (
//               <p className="searchResults">
//                 Found {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''} 
//                 {searchTerm && ` for "${searchTerm}"`}
//               </p>
//             )} */}
            
//             {filteredReviews.length > 0 ? (
//               <ReviewCard 
//                 reviews={filteredReviews} 
//                 userRole={userRole} 
//               />
//             ) : (
//               <div className="no-reviews">
//                 <p>
//                   {searchTerm 
//                     ? `No reviews found matching "${searchTerm}"`
//                     : userRole === 'provider'
//                       ? "No reviews received yet."
//                       : "No reviews given yet."
//                   }
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reviews;


import React, { useState, useEffect, useContext } from 'react'; // Import necessary hooks
import './Reviews.css';
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const Reviews = () => {
  const { user, loading: authLoading } = useContext(AuthContext); // Get user and loading state from AuthContext
  const token = localStorage.getItem('token'); // Get token for authentication

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredReviews, setFilteredReviews] = useState([]); // Add filtered reviews state
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState(null); // Track user role

  useEffect(() => {
    const fetchReviews = async () => {
      // Wait for auth to finish loading
      if (authLoading) {
        return;
      }

      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      if (!user) {
        setLoading(false);
        setError('No user logged in to fetch reviews for.');
        return;
      }

      try {
        // Determine user role and API endpoint
        let apiEndpoint = '';
        let role = '';

        // Check if user has provider role (adjust this based on your user object structure)
        if (user.userRole === 'ROLE_PROVIDER') {
          apiEndpoint = 'http://localhost:9090/api/v1/reviews/provider/me';
          role = 'provider';
        } else if (user.userRole === 'ROLE_CLIENT') {
          apiEndpoint = 'http://localhost:9090/api/v1/reviews/client/me';
          role = 'client';
        } else {
          // If role is not clear, try provider first, then client
          apiEndpoint = 'http://localhost:9090/api/v1/reviews/provider/me';
          role = 'provider';
        }

        setUserRole(role);

        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // If provider endpoint fails and we haven't tried client yet, try client endpoint
          if (role === 'provider' && response.status === 403) {
            const clientResponse = await fetch('http://localhost:9090/api/v1/reviews/client/me', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (clientResponse.ok) {
              const clientData = await clientResponse.json();
              setUserRole('client');
              setReviews(clientData);
              setFilteredReviews(clientData);
              return;
            }
          }

          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data); // Set the fetched reviews
        setFilteredReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message || 'Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user, token, authLoading]); // Add authLoading to dependencies

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReviews(reviews); // Show all reviews if search is empty
    } else {
      const filtered = reviews.filter(review => {
        const searchLower = searchTerm.toLowerCase();
        
        // Format the date for searching
        const reviewDate = new Date(review.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        
        // Extract month name separately for more flexible searching
        const monthName = new Date(review.createdAt).toLocaleDateString('en-US', {
          month: 'long',
        });
        
        // Extract short month name too (Jan, Feb, etc.)
        const shortMonthName = new Date(review.createdAt).toLocaleDateString('en-US', {
          month: 'short',
        });
        
        return (
          // Search in review text
          (review.reviewTxt && review.reviewTxt.toLowerCase().includes(searchLower)) ||
          // Search in client full name (for provider reviews)
          (review.clientFullName && review.clientFullName.toLowerCase().includes(searchLower)) ||
          // Search in provider name (for client reviews)
          (review.providerFullName && review.providerFullName.toLowerCase().includes(searchLower)) ||
          // Search in formatted date (full date)
          reviewDate.toLowerCase().includes(searchLower) ||
          // Search in month name (January, February, etc.)
          monthName.toLowerCase().includes(searchLower) ||
          // Search in short month name (Jan, Feb, etc.)
          shortMonthName.toLowerCase().includes(searchLower) ||
          // Search in rating (convert to string for search)
          review.rating.toString().includes(searchTerm)
        );
      });
      setFilteredReviews(filtered);
    }
  }, [searchTerm, reviews]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get appropriate header text based on user role
  const getHeaderText = () => {
    if (userRole === 'provider') {
      return 'Reviews Received';
    } else if (userRole === 'client') {
      return 'Reviews Given';
    }
    return 'Reviews';
  };

  // Get appropriate placeholder text based on user role
  const getPlaceholderText = () => {
    if (userRole === 'provider') {
      return 'Search reviews from clients...';
    } else if (userRole === 'client') {
      return 'Search reviews you gave...';
    }
    return 'Search Reviews...';
  };

  // Show loading while auth is loading or reviews are loading
  if (authLoading || loading) {
    return (
      <div className='dashboardBox'>
        <DashboardNav />
        <div className='dashboardBody'>
          <ProviderSideNav />
          <div className="dashboard">
            <p>Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='dashboardBox'>
        <DashboardNav />
        <div className='dashboardBody'>
          <ProviderSideNav />
          <div className="dashboard">
            <p style={{ color: 'red' }}>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='dashboardBox'>
      <DashboardNav />
      <div className='dashboardBody'>
        <ProviderSideNav />
        <div className="dashboard">
          <div className="welcome">
            <div className="welcomeTxt">
              <h2>{getHeaderText()}</h2>
            </div>
            <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Reviews" link2="/ProviderDashboard/Reviews" />
          </div>

          <div className="reviewsBox">
            <div className="searchReviewsBox">
              <input
                placeholder={getPlaceholderText()}
                className="searchReviews"
                name="text"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* {searchTerm && (
              <p className="searchResults">
                Found {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''} 
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            )} */}
            
            {filteredReviews.length > 0 ? (
              <ReviewCard 
                reviews={filteredReviews} 
                userRole={userRole} 
              />
            ) : (
              <div className="no-reviews">
                <p>
                  {searchTerm 
                    ? `No reviews found matching "${searchTerm}"`
                    : userRole === 'provider'
                      ? "No reviews received yet."
                      : "No reviews given yet."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
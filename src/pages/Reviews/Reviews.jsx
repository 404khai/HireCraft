// import React from 'react'
// import './Reviews.css'
// import DashboardNav from '../../components/DashboardNav/DashboardNav'
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
// import ReviewCard from '../../components/ReviewCard/ReviewCard'

// const Reviews = () => {
//   return (
//     <div className='dashboardBox'>
//       <DashboardNav/>
//       <div className='dashboardBody'>
//           <ProviderSideNav/>
//           {/* <EmployerSideNav/> */}
//           <div className="dashboard">
//             <div className="welcome">
//               <div className="welcomeTxt">
//                 <h2>Reviews</h2>
//               </div>

//               <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Reviews" link2="/ProviderDashboard/Reviews"/>
//             </div>

//             <div className="reviewsBox">
//               <div className="reviewBoxEach">
//                 <ReviewCard/>
//               </div>
//               <div className="reviewBoxEach">
//                 <ReviewCard/>
//               </div>
//               <div className="reviewBoxEach">
//                 <ReviewCard/>
//               </div>
//             </div>
            
//           </div>
          
//       </div>
//     </div>
//   )
// }


// export default Reviews

import React, { useState, useEffect, useContext } from 'react'; // Import necessary hooks
import './Reviews.css';
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const Reviews = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const token = localStorage.getItem('token'); // Get token for authentication

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:9090/api/v1/reviews/provider/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data); // Set the fetched reviews
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message || 'Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    if (user) { // Only fetch if user data is available (meaning authenticated)
      fetchReviews();
    } else {
      setLoading(false); // If no user, stop loading and show no reviews
      setError('No user logged in to fetch reviews for.');
    }
  }, [user, token]); // Re-run effect if user or token changes

  if (loading) {
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
              <h2>Reviews</h2>
            </div>
            <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Reviews" link2="/ProviderDashboard/Reviews" />
          </div>

          <div className="reviewsBox">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div className="reviewBoxEach" key={review.id}> {/* Assuming each review has a unique 'id' */}
                  <ReviewCard review={review} />
                </div>
              ))
            ) : (
              <p>No reviews available for you yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

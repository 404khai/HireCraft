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

  const [filteredReviews, setFilteredReviews] = useState([]); // Add filtered reviews state
  const [searchTerm, setSearchTerm] = useState('');

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
        setFilteredReviews(data);
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

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReviews(reviews); // Show all reviews if search is empty
    } else {
      const filtered = reviews.filter(review => {
        const searchLower = searchTerm.toLowerCase();
        return (
          // Search in review text
          (review.reviewTxt && review.reviewTxt.toLowerCase().includes(searchLower)) ||
          // Search in client full name
          (review.clientFullName && review.clientFullName.toLowerCase().includes(searchLower)) ||
          // Search in rating (convert to string for search)
          review.rating.toString().includes(searchTerm)
        );
      });
      setFilteredReviews(filtered);
    }
  }, [searchTerm, reviews]); // Re-run when search term or reviews change

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
            <div className="searchReviewsBox">
              <input
                placeholder="Search Reviews...."
                className="searchReviews"
                name="text"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            {searchTerm && (
              <p className="searchResults">
                Found {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''} 
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            )}
            
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review, index) => (
                <div className="reviewBoxEach" key={review.id || index}> {/* Use index as fallback key */}
                  <ReviewCard review={review} />
                </div>
              ))
            ) : (
              <p>
                {searchTerm 
                  ? `No reviews found matching "${searchTerm}"`
                  : "No reviews available for you yet."
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

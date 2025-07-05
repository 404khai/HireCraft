// import React from 'react';
// import './ReviewCard.css';
// import { FaStar, FaRegStarHalfStroke, FaRegStar } from 'react-icons/fa6';
// import { LuCalendarDays } from 'react-icons/lu';

// // Helper function to render stars based on a rating
// const renderStars = (rating) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0; // Check for decimal part
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   const stars = [];
//   for (let i = 0; i < fullStars; i++) {
//     stars.push(<i key={`full-${i}`}><FaStar/></i>);
//   }
//   if (hasHalfStar) {
//     stars.push(<i key="half"><FaRegStarHalfStroke/></i>);
//   }
//   for (let i = 0; i < emptyStars; i++) {
//     stars.push(<i key={`empty-${i}`}><FaRegStar/></i>); // Render empty stars with less opacity
//   }
//   return stars;
// };

// const ReviewCard = ({ review }) => {
//   if (!review) {
//     return null; // Don't render if no review data is passed
//   }

//   // Format the date
//   const reviewDate = new Date(review.createdAt).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <div className="feedbackRating">
//         <p>{review.clientFullName}</p>
//         <div className="feedbackRatingRating">
//             <div className="providerRating">
//                 <button>{review.rating.toFixed(1)}</button> {/* Display rating with one decimal */}
//                 {renderStars(review.rating)} {/* Render stars dynamically */}
//             </div>

//             <div className="feedbackDate" style={{color: "#666"}}>
//                 <i><LuCalendarDays /></i>
//                 <p>{reviewDate}</p>
//             </div>
//         </div>
//         <p style={{color: "#666"}}>{review.reviewTxt}</p>
//     </div>
//   )
// }

// export default ReviewCard;


import React from 'react';
import './ReviewCard.css';
import { FaStar, FaRegStarHalfStroke, FaRegStar } from 'react-icons/fa6';
import { LuCalendarDays } from 'react-icons/lu';

// Helper function to render stars based on a rating
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0; // Check for decimal part
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={`full-${i}`}><FaStar/></i>);
  }
  if (hasHalfStar) {
    stars.push(<i key="half"><FaRegStarHalfStroke/></i>);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`}><FaRegStar/></i>); // Render empty stars with less opacity
  }
  return stars;
};

const ReviewCard = ({ reviews, userRole }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>No reviews available.</p>
      </div>
    );
  }

  return (
    <table className="booking-table">
      <thead className="booking-table-header">
        <tr>
          <th>{userRole === 'ROLE_PROVIDER' ? 'Client' : 'Provider'}</th>
          <th>Rating</th>
          <th>Review</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => {
          // Format the date
          const reviewDate = new Date(review.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <tr className="booking-table-row" key={review.id}>
              <td className="booking-table-cell" data-label={userRole === 'ROLE_PROVIDER' ? 'Client' : 'Provider'}>
                <div className="client-info" id='review-client-info'>
                  <img 
                    src={review.profilePictureUrl} 
                    alt={`${userRole === 'ROLE_PROVIDER' ? 'Client' : 'Provider'} Profile`} 
                    className="client-avatar" 
                  />
                  <div className="client-details">
                    <h4>{review.clientFullName}</h4>
                    <p>{review.clientJobTitle}</p>
                  </div>
                </div>
              </td>
              
              <td className="booking-table-cell" data-label="Rating">
                <div className="feedbackRatingRating">
                  <div className="providerRating">
                    <button>{review.rating.toFixed(1)}</button>
                    <div className="stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
              </td>
              
              <td className="booking-table-cell" data-label="Review">
                <div className="review-text-cell">
                  <p>{review.reviewTxt}</p>
                </div>
              </td>
              
              <td className="booking-table-cell time-cell" data-label="Date">
                <div className="feedbackDate">
                  <i><LuCalendarDays /></i>
                  <p>{reviewDate}</p>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReviewCard;
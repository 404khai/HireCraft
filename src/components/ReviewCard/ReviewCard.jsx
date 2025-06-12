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

const ReviewCard = ({ review }) => {
  if (!review) {
    return null; // Don't render if no review data is passed
  }

  // Format the date
  const reviewDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="feedbackRating">
        <p>{review.clientFullName}</p>
        <div className="feedbackRatingRating">
            <div className="providerRating">
                <button>{review.rating.toFixed(1)}</button> {/* Display rating with one decimal */}
                {renderStars(review.rating)} {/* Render stars dynamically */}
            </div>

            <div className="feedbackDate" style={{color: "#666"}}>
                <i><LuCalendarDays /></i>
                <p>{reviewDate}</p>
            </div>
        </div>
        <p style={{color: "#666"}}>{review.reviewTxt}</p>
    </div>
  )
}

export default ReviewCard;



// import React from 'react'
// import './ReviewCard.css'
// import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
// import { LuCalendarDays } from "react-icons/lu";

// const ReviewCard = () => {
//   return (
//     <div className="feedbackRating">
//         <p>Steve Rogers</p>
//         <div className="feedbackRatingRating">
//             <div className="providerRating">
//                 <button>4.5</button>
//                 <i><FaStar/></i>
//                 <i><FaStar/></i>
//                 <i><FaStar/></i>
//                 <i><FaStar/></i>
//                 <i><FaRegStarHalfStroke/></i>
//             </div>

//             <div className="feedbackDate" style={{color: "#666"}}>
//                 <i><LuCalendarDays /></i>
//                 <p>May 29, 2025</p>
//             </div>
//         </div>
//         <p style={{color: "#666"}}>Very professional, excellent work, highly recommend!</p>
//     </div>
//   )
// }

// export default ReviewCard
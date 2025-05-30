import React from 'react'
import './ReviewCard.css'
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";

const ReviewCard = () => {
  return (
    <div className="feedbackRating">
        <p>Steve Rogers</p>
        <div className="feedbackRatingRating">
            <div className="providerRating">
                <button>4.5</button>
                <i><FaStar/></i>
                <i><FaStar/></i>
                <i><FaStar/></i>
                <i><FaStar/></i>
                <i><FaRegStarHalfStroke/></i>
            </div>

            <div className="feedbackDate" style={{color: "#666"}}>
                <i><LuCalendarDays /></i>
                <p>May 29, 2025</p>
            </div>
        </div>
        <p style={{color: "#666"}}>Very professional, excellent work, highly recommend!</p>
    </div>
  )
}

export default ReviewCard
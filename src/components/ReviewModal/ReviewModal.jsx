import React, { useState } from 'react';
import { IoClose, IoStar, IoStarOutline } from 'react-icons/io5';
import './ReviewModal.css';

const ReviewModal = ({ isOpen, onClose, booking, onSubmitReview }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleStarClick = (starRating) => {
        setRating(starRating);
    };

    const handleStarHover = (starRating) => {
        setHoverRating(starRating);
    };

    const handleStarLeave = () => {
        setHoverRating(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        if (reviewText.trim() === '') {
            alert('Please write a review');
            return;
        }

        // DEBUG: Check what values we're working with
        console.log('Booking object:', booking);
        console.log('Booking ID:', booking.id);
        
        // Check if booking ID exists
        if (!booking.id) {
            alert('Unable to submit review: Booking ID is missing');
            return;
        }
        
        const reviewData = {
            bookingId: booking.id,  // Use booking ID instead of providerId
            rating: rating,
            reviewTxt: reviewText.trim()
        };
        
        console.log('Review data to submit:', reviewData);

        setIsSubmitting(true);
        
        try {
            await onSubmitReview(reviewData);
            
            // Reset form
            setRating(0);
            setReviewText('');
            onClose();
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setRating(0);
            setReviewText('');
            onClose();
        }
    };

    if (!isOpen) return null;

    const getRatingText = (rating) => {
        switch (rating) {
            case 1: return 'Poor';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Very Good';
            case 5: return 'Excellent';
            default: return 'Rate this service';
        }
    };

    return (
        <div className="review-modal-overlay" onClick={handleClose}>
            <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="review-modal-header">
                    <h3>Leave a Review</h3>
                    <button 
                        className="close-btn" 
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        <IoClose />
                    </button>
                </div>

                <div className="review-modal-body">
                    <div className="service-provider-info">
                        <img 
                            src={booking.profilePictureUrl} 
                            alt="Provider" 
                            className="provider-avatar"
                        />
                        <div className="provider-details">
                            <h4>{booking.providerFullName}</h4>
                            <p>{booking?.serviceType}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="rating-section">
                            <label>How would you rate this service?</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => handleStarHover(star)}
                                        onMouseLeave={handleStarLeave}
                                        disabled={isSubmitting}
                                    >
                                        {star <= (hoverRating || rating) ? <IoStar /> : <IoStarOutline />}
                                    </button>
                                ))}
                            </div>
                            <p className="rating-text">{getRatingText(hoverRating || rating)}</p>
                        </div>

                        <div className="review-text-section">
                            <label htmlFor="reviewText">Write your review</label>
                            <textarea
                                id="reviewText"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your experience with this service provider..."
                                rows="4"
                                maxLength="500"
                                disabled={isSubmitting}
                            />
                            <small className="char-count">{reviewText.length}/500</small>
                        </div>

                        <div className="review-modal-footer">
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={handleClose}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="submit-review-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
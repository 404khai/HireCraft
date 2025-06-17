import React, { useState } from 'react';
import Modal from 'react-modal';

const BookingModal = ({ isOpen, onRequestClose, providerId }) => {
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    message: '',
  });

  const handleInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleBook = () => {
    // Implement your booking logic here (e.g., send a request to your backend)
    console.log('Booking details:', bookingDetails);
    onRequestClose(); // Close the modal after booking
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Booking Modal"
    >
      <h2>Book Service</h2>
      <label>Date:</label>
      <input type="date" name="date" onChange={handleInputChange} />
      <label>Time:</label>
      <input type="time" name="time" onChange={handleInputChange} />
      <label>Message:</label>
      <textarea name="message" onChange={handleInputChange} />
      <button onClick={handleBook}>Book Now</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default BookingModal;
// // import React, { useState } from 'react';
// // import Modal from 'react-modal';

// // const BookingModal = ({ isOpen, onRequestClose, providerId }) => {
// //   const [bookingDetails, setBookingDetails] = useState({
// //     date: '',
// //     time: '',
// //     message: '',
// //   });

// //   const handleInputChange = (e) => {
// //     setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
// //   };

// //   const handleBook = () => {
// //     // Implement your booking logic here (e.g., send a request to your backend)
// //     console.log('Booking details:', bookingDetails);
// //     onRequestClose(); // Close the modal after booking
// //   };

// //   return (
// //     <Modal
// //       isOpen={isOpen}
// //       onRequestClose={onRequestClose}
// //       contentLabel="Booking Modal"
// //     >
// //       <h2>Book Service</h2>
// //       <label>Date:</label>
// //       <input type="date" name="date" onChange={handleInputChange} />
// //       <label>Time:</label>
// //       <input type="time" name="time" onChange={handleInputChange} />
// //       <label>Message:</label>
// //       <textarea name="message" onChange={handleInputChange} />
// //       <button onClick={handleBook}>Book Now</button>
// //       <button onClick={onRequestClose}>Cancel</button>
// //     </Modal>
// //   );
// // };

// // export default BookingModal;


// import React, { useState, useContext } from 'react';
// import styled from 'styled-components';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify
// import { AuthContext } from '../context/AuthContext';

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.7);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background: white;
//   padding: 30px;
//   border-radius: 8px;
//   width: 90%;
//   max-width: 500px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   gap: 15px;

//   h3 {
//     margin-top: 0;
//     color: #333;
//     font-size: 1.5em;
//   }

//   label {
//     font-weight: bold;
//     margin-bottom: 5px;
//     display: block;
//   }

//   input[type="time"],
//   input[type="number"],
//   textarea {
//     width: 100%;
//     padding: 10px;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     font-size: 1em;
//     box-sizing: border-box; /* Include padding in width */
//   }

//   textarea {
//     resize: vertical;
//     min-height: 80px;
//   }

//   .form-group {
//     margin-bottom: 15px;
//   }

//   .button-group {
//     display: flex;
//     justify-content: flex-end;
//     gap: 10px;
//     margin-top: 20px;
//   }

//   button {
//     padding: 10px 20px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     font-weight: 600;
//     transition: background-color 0.3s ease;

//     &.submit-btn {
//       background-color: #35D07D;
//       color: white;
//       &:hover {
//         background-color: #2bb86c;
//       }
//     }

//     &.cancel-btn {
//       background-color: #f0f0f0;
//       color: #333;
//       &:hover {
//         background-color: #e0e0e0;
//       }
//     }
//   }

//   .close-button {
//     position: absolute;
//     top: 15px;
//     right: 15px;
//     background: none;
//     border: none;
//     font-size: 1.5em;
//     cursor: pointer;
//     color: #888;
//     &:hover {
//       color: #333;
//     }
//   }
// `;

// const BookingModal = ({ isOpen, onClose, providerId, providerName }) => {
//   const { token } = useContext(AuthContext); // Get token from AuthContext

//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [daysNeeded, setDaysNeeded] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!token) {
//       toast.error('Authentication required to create a booking request.');
//       setIsSubmitting(false);
//       return;
//     }

//     if (!providerId) {
//         toast.error('Provider ID is missing. Cannot create booking.');
//         setIsSubmitting(false);
//         return;
//     }

//     const payload = {
//       providerId: providerId,
//       startTime: startTime,
//       endTime: endTime,
//       daysNeeded: parseInt(daysNeeded, 10), // Ensure daysNeeded is a number
//       message: message,
//     };

//     try {
//       const response = await fetch('http://localhost:9090/api/v1/bookings/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to create booking request.');
//       }

//       toast.success('Booking request created successfully!');
//       onClose(); // Close the modal on success
//       // Optionally reset form fields here
//       setStartTime('');
//       setEndTime('');
//       setDaysNeeded('');
//       setMessage('');
//     } catch (error) {
//       console.error('Error creating booking request:', error);
//       toast.error(error.message || 'Error creating booking request. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <ModalOverlay>
//       <ModalContent>
//         <button className="close-button" onClick={onClose}>&times;</button>
//         <h3>Send Booking Request</h3>
//         <p>To: <strong>{providerName || 'Unknown Provider'}</strong></p>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="startTime">Time From:</label>
//             <input
//               type="time"
//               id="startTime"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="endTime">Time To:</label>
//             <input
//               type="time"
//               id="endTime"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="daysNeeded">Days Needed:</label>
//             <input
//               type="number"
//               id="daysNeeded"
//               value={daysNeeded}
//               onChange={(e) => setDaysNeeded(e.target.value)}
//               min="1"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="message">Your Message (First Message to Provider):</label>
//             <textarea
//               id="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="e.g., 'Hello, I'm interested in your services for a project lasting about 3 days. Can you provide a quote?'"
//               required
//             ></textarea>
//           </div>

//           <div className="button-group">
//             <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>
//               Cancel
//             </button>
//             <button type="submit" className="submit-btn" disabled={isSubmitting}>
//               {isSubmitting ? 'Sending...' : 'Send Booking Request'}
//             </button>
//           </div>
//         </form>
//       </ModalContent>
//     </ModalOverlay>
//   );
// };

// export default BookingModal;


import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify
import { AuthContext } from '../context/AuthContext';

// --- (Your styled components ModalOverlay and ModalContent would go here) ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
  }

  h3 {
    margin-top: 0;
    color: #333;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 20px;
    color: #555;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  input[type="time"],
  input[type="number"],
  textarea {
    width: calc(100% - 20px); /* Adjust for padding */
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box; /* Include padding in width */
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }

  .cancel-btn,
  .submit-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.2s ease;
  }

  .cancel-btn {
    background-color: #ccc;
    color: #333;
  }

  .cancel-btn:hover {
    background-color: #bbb;
  }

  .submit-btn {
    background-color: #35D07D;
    color: white;
  }

  .submit-btn:hover {
    background-color:rgb(74, 180, 123);
  }

  .submit-btn:disabled {
    background-color:rgb(171, 234, 201);
    cursor: not-allowed;
  }
`;
// --- (End of styled components) ---

const API_BASE_URL = 'http://localhost:9090/api/v1'; // Define API base URL

const BookingModal = ({ isOpen, onClose, providerId, providerName }) => {
  const { token } = useContext(AuthContext); // Get token from AuthContext

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [daysNeeded, setDaysNeeded] = useState('');
  const [message, setMessage] = useState(''); // This will become `description`
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!token) {
      toast.error('Authentication required to create a booking request.');
      setIsSubmitting(false);
      return;
    }

    if (!providerId) {
      toast.error('Provider ID is missing. Cannot create booking.');
      setIsSubmitting(false);
      return;
    }

    // Construct the payload to match the backend's expected format
    const payload = {
      providerId: providerId,
      timeSlot: `${startTime} - ${endTime}`, // Combine start and end time
      estimatedDuration: `${daysNeeded} days`, // Combine days and "days"
      status: "PENDING", // Fixed status as per your example
      description: message, // Rename message to description
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking request.');
      }

      toast.success('Booking request sent successfully!');
      onClose(); // Close the modal on success
      // Optionally reset form fields here
      setStartTime('');
      setEndTime('');
      setDaysNeeded('');
      setMessage('');
    } catch (error) {
      console.error('Error creating booking request:', error);
      toast.error(error.message || 'Error creating booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h3>Send Booking Request</h3>
        <p>To: <strong>{providerName || 'Unknown Provider'}</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="startTime">Time From:</label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime">Time To:</label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="daysNeeded">Days Needed:</label>
            <input
              type="number"
              id="daysNeeded"
              value={daysNeeded}
              onChange={(e) => setDaysNeeded(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g., 'Hello, I'm interested in your services for a project lasting about 3 days. Can you provide a quote?'"
              required
            ></textarea>
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Booking Request'}
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BookingModal;
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import ClientSideNav from '../../components/ClientSideNav/ClientSideNav';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { AuthContext } from '../../context/AuthContext';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';

const PaymentPage = () => {
    const [booking, setBooking] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [customAmount, setCustomAmount] = useState('');
const [paymentLoading, setPaymentLoading] = useState(false);
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
const [testOption, setTestOption] = useState('success');

const { user } = useContext(AuthContext);
const location = useLocation();
const navigate = useNavigate();

const API_BASE_URL = 'http://localhost:9090/api/v1';

// Safely get provider's profile image
const providerImg = booking?.provider?.user?.profileImageUrl;

// Get booking ID from URL or state
const getBookingId = () => {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get('bookingId') || location.state?.bookingId;
};

// Get token and config for auth
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    setError("Authentication token not found. Please log in.");
    return null;
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Fetch booking details by ID
const fetchBookingDetails = async () => {
  const bookingId = getBookingId();

  if (!bookingId) {
    setError("No booking ID provided");
    setLoading(false);
    return;
  }

  const config = getAuthConfig();
  if (!config) {
    setLoading(false);
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/client/me`, config);
    const bookings = response.data;

    const matchedBooking = Array.isArray(bookings)
      ? bookings.find(b => b.id == bookingId)
      : bookings;

    if (!matchedBooking) {
      setError("Booking not found.");
    } else {
      setBooking(matchedBooking);
      console.log("Matched booking:", matchedBooking);
    }
  } catch (err) {
    console.error("Error fetching booking details:", err);
    if (err.response?.status === 401) {
      setError("Session expired or unauthorized. Please log in again.");
    } else if (err.response?.status === 404) {
      setError("Booking not found.");
    } else {
      setError("Failed to load booking details. Please try again later.");
    }
  } finally {
    setLoading(false);
  }
};

// Initiate payment
const initiatePayment = async () => {
  if (!booking?.id) {
    setError("Booking ID is missing. Cannot proceed.");
    return;
  }

  setPaymentLoading(true);
  setError(null);

  const config = getAuthConfig();
  if (!config) {
    setPaymentLoading(false);
    return;
  }

  try {
    const paymentData = {
      bookingId: booking.id,
      amount: Number(customAmount),
      email: user.email,
      callbackUrl: `${window.location.origin}/payment/callback`,
      useEscrow: false
    };

    const response = await axios.post(`${API_BASE_URL}/payments/initiate`, paymentData, config);
    const paymentResponse = response.data;

    console.log("Payment initiated:", paymentResponse);

    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: paymentResponse.publicKey,
        email: paymentData.email,
        amount: paymentData.amount * 100,
        ref: paymentResponse.reference,

        onClose: () => {
          setPaymentLoading(false);
          toast.info('Payment cancelled', {
            position: 'top-center',
            autoClose: 3000,
            transition: Bounce,
          });
        },

        callback: (response) => {
          console.log("Payment callback:", response);
          verifyPayment(response.reference);
        }
      });

      handler.openIframe();
    } else {
      throw new Error("Paystack library not loaded");
    }
  } catch (err) {
    console.error("Payment initiation failed:", err);
    setError(err.response?.data?.message || "Failed to initiate payment. Please try again.");
  } finally {
    setPaymentLoading(false);
  }
};

// Verify payment after Paystack callback
const verifyPayment = async (reference) => {
  const config = getAuthConfig();
  if (!config) {
    setPaymentLoading(false);
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/payments/verify/${reference}`, config);
    const result = response.data;

    if (result.status === 'success') {
      toast.success('Payment successful!', {
        position: 'top-center',
        autoClose: 3000,
        transition: Bounce,
      });

      setTimeout(() => {
        navigate('/ClientDashboard/Bookings');
      }, 2000);
    } else {
      throw new Error(result.message || 'Payment verification failed');
    }
  } catch (err) {
    console.error("Payment verification failed:", err);
    setError(err.response?.data?.message || "Payment verification failed. Please contact support.");
  } finally {
    setPaymentLoading(false);
  }
};

// Event handlers
const handlePaymentMethodChange = (method) => setSelectedPaymentMethod(method);
const handleTestOptionChange = (option) => setTestOption(option);
const handlePayNow = () => initiatePayment();

// Fetch booking when user exists
useEffect(() => {
  if (user) {
    fetchBookingDetails();
  }
}, [user]);

// Load Paystack script
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://js.paystack.co/v1/inline.js';
  script.async = true;
  document.body.appendChild(script);
  
  return () => {
    document.body.removeChild(script);
  };
}, []);


    if (loading) {
        return (
            <div className='dashboardBox'>
                <DashboardNav />
                <div className='dashboardBody'>
                    <ClientSideNav />
                    <div className="dashboard">
                        <div className="welcome">
                            <div className="welcomeTxt">
                                <h2>Payment</h2>
                            </div>
                            <Breadcrumbs 
                                firstLink="Dashboard" 
                                link="/ClientDashboard" 
                                secondLink="My Bookings" 
                                link2="/ClientDashboard/Bookings" 
                                thirdLink="Payment"
                            />
                        </div>
                        <div className="paymentContainer">
                            <p>Loading payment details...</p>
                        </div>
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
                    <ClientSideNav />
                    <div className="dashboard">
                        <div className="welcome">
                            <div className="welcomeTxt">
                                <h2>Payment</h2>
                            </div>
                            <Breadcrumbs 
                                firstLink="Dashboard" 
                                link="/ClientDashboard" 
                                secondLink="My Bookings" 
                                link2="/ClientDashboard/Bookings" 
                                thirdLink="Payment"
                            />
                        </div>
                        <div className="paymentContainer">
                            <div className="error-message">{error}</div>
                            <button 
                                className="backBtn" 
                                onClick={() => navigate('/ClientDashboard/Bookings')}
                            >
                                Back to Bookings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='dashboardBox'>
            <DashboardNav />
            <div className='dashboardBody'>
                <ClientSideNav />
                <div className="dashboard">
                    <div className="welcome">
                        <div className="welcomeTxt">
                            <h2>Payment</h2>
                        </div>
                        <Breadcrumbs 
                            firstLink="Dashboard" 
                            link="/ClientDashboard" 
                            secondLink="My Bookings" 
                            link2="/ClientDashboard/Bookings" 
                            thirdLink="Payment"
                        />
                    </div>

                    <div className="paymentContainer">

                        <div className="paymentBox">
                            <div className="paymentHeader">
                                <h3 className="paymentTitle">PAY WITH</h3>
                                <button className="closeBtn" onClick={() => navigate('/ClientDashboard/Bookings')}>×</button>
                            </div>

                            <div className="paymentProvider">
                                {booking?.provider?.user?.profileImageUrl && (
                                <img
                                    src={booking.provider.user.profileImageUrl}
                                    alt="Provider"
                                    className="providerImage"
                                />
                                )}
                                <p className="providerNote">You're paying {booking?.provider?.user?.firstname}</p>
                            </div>

                            <div className="paymentInfo">
                                <p className="paymentEmail">{user?.email}</p>
                                <p className="paymentAmount">
                                Pay <span className="currency">NGN</span> <span className="amount">{customAmount}</span>
                                </p>
                            </div>

                            <div className="paymentAmountInput">
                                <label htmlFor="amount">Enter Amount:</label>
                                <input
                                type="number"
                                id="amount"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                placeholder="Enter custom amount"
                                />
                            </div>

                            <div className="paymentActions">
                                <button
                                className="payBtn"
                                onClick={handlePayNow}
                                disabled={paymentLoading}
                                >
                                {paymentLoading ? 'Processing...' : `Pay NGN ${customAmount}`}
                                </button>
                                <button className="cancelBtn" onClick={() => navigate('/ClientDashboard/Bookings')}>
                                Cancel Payment
                                </button>
                            </div>

                            <div className="paymentSecurity">
                                <span className="securityIcon">🔒</span>
                                <span className="securityText">Secured by <strong>paystack</strong></span>
                            </div>
                            </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './PasswordResetModal.css';

const PasswordResetModal = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:9090/api/v1/auth/forgot-password', {
                email,
            });

            toast.success('Password reset email sent! Check your inbox.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });

            setIsEmailSent(true);

        } catch (error) {
            console.error('Password reset error:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to send reset email');
            } else if (error.request) {
                toast.error('No response received from server. Please try again.');
            } else {
                toast.error('An error occurred during password reset');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login'); // Adjust this path based on your login route
    };

    const handleResendEmail = () => {
        setIsEmailSent(false);
        setEmail('');
    };

    if (isEmailSent) {
        return (
            <div className="password-reset-container">
                <div className="password-reset-modal">
                    <div className="success-content">
                        <div className="success-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50"/>
                            </svg>
                        </div>
                        <h2>Email Sent!</h2>
                        <p>We've sent a password reset link to <strong>{email}</strong></p>
                        <p className="instruction">Check your email and click the link to reset your password.</p>
                        
                        <div className="action-buttons">
                            <button 
                                className="back-to-login-btn"
                                onClick={handleBackToLogin}
                            >
                                Back to Login
                            </button>
                            <button 
                                className="resend-btn"
                                onClick={handleResendEmail}
                            >
                                Resend Email
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />
            </div>
        );
    }

    return (
        <div className="password-reset-container">
            <div className="password-reset-modal">
                <div className="modal-header">
                    <button 
                        className="close-btn"
                        onClick={handleBackToLogin}
                        aria-label="Close"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div className="modal-content">
                    <h2>Reset Your Password</h2>
                    <p>Enter your email address and we'll send you a link to reset your password.</p>

                    <form onSubmit={handlePasswordReset} className="reset-form">
                        <div className="input_container">
                            <label className="input_label" htmlFor="reset_email_field">Email Address</label>
                            <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                                <path strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                            </svg>
                            <input
                                placeholder="Enter your email address"
                                type="email"
                                className="input_field"
                                id="reset_email_field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="reset-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <span>Send Reset Link</span>
                            )}
                        </button>
                    </form>

                    <div className="back-to-login">
                        <p>
                            Remember your password? 
                            <button 
                                className="login-link"
                                onClick={handleBackToLogin}
                            >
                                Back to Login
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    );
};

export default PasswordResetModal;
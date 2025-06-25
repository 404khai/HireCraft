import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './PasswordResetModal.css';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const PasswordResetModal = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState('email'); // 'email', 'reset', 'success'
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:9090/api/v1/auth/forgot-password', {
                email,
            });

            toast.success('OTP sent to your email! Please check your inbox.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });

            setCurrentStep('reset');

        } catch (error) {
            console.error('Send OTP error:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to send OTP');
            } else if (error.request) {
                toast.error('No response received from server. Please try again.');
            } else {
                toast.error('An error occurred while sending OTP');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        if (newPassword.length < 4) {
            toast.error('Password must be at least 4 characters long');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:9090/api/v1/auth/reset-password', {
                email,
                token: otp,
                newPassword,
            });

            toast.success('Password reset successful!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });

            setCurrentStep('success');

        } catch (error) {
            console.error('Password reset error:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to reset password');
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
        navigate('/Login');
    };

    const handleBackToEmail = () => {
        setCurrentStep('email');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleResendOTP = () => {
        setCurrentStep('email');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Success Screen
    if (currentStep === 'success') {
        return (
            <div className="password-reset-container">
                <div className="password-reset-modal">
                    <div className="success-content">
                        <div className="success-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50"/>
                            </svg>
                        </div>
                        <h2>Password Reset Successful!</h2>
                        <p>Your password has been successfully updated.</p>
                        <p className="instruction">You can now login with your new password.</p>
                        
                        <div className="action-buttons">
                            <button 
                                className="back-to-login-btn"
                                onClick={handleBackToLogin}
                            >
                                Back to Login
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

    // Reset Password Screen (OTP + New Password)
    if (currentStep === 'reset') {
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

                    <div className="modal-content-two">
                        <h3>Reset Your Password</h3>
                        <p>Enter the OTP sent to <strong>{email}</strong></p>

                        <form onSubmit={handlePasswordReset} className="reset-form">
                            <div className="input_container">
                                <label className="input_label" htmlFor="email_field">Email Address</label>
                                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                                    <path strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                                </svg>
                                <input
                                    type="email"
                                    className="input_field"
                                    id="email_field"
                                    value={email}
                                    readOnly
                                    style={{ backgroundColor: '#f9f9f9', cursor: 'not-allowed' }}
                                />
                            </div>

                            <div className="input_container">
                                <label className="input_label" htmlFor="otp_field">OTP Code</label>
                                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <input
                                    placeholder="Enter 6-digit OTP"
                                    type="text"
                                    className="input_field"
                                    id="otp_field"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="input_container">
                                <label className="input_label" htmlFor="new_password_field">New Password</label>
                                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                    <path strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                                </svg>
                                <input
                                    placeholder="Enter new password"
                                    type={showPassword ? "text" : "password"}
                                    className="input_field"
                                    id="new_password_field"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                                </span>
                            </div>

                            <div className="input_container">
                                <label className="input_label" htmlFor="confirm_password_field">Confirm New Password</label>
                                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                    <path strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                                </svg>
                                <input
                                    placeholder="Confirm new password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="input_field"
                                    id="confirm_password_field"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <VscEyeClosed /> : <VscEye />}
                                </span>
                            </div>

                            <button 
                                type="submit" 
                                className="reset-submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="spinner"></div>
                                        <span>Resetting Password...</span>
                                    </>
                                ) : (
                                    <span>Reset Password</span>
                                )}
                            </button>
                        </form>

                        <div className="back-to-login">
                            <p>
                                <button 
                                    className="login-link"
                                    onClick={handleBackToEmail}
                                >
                                    ← Back to Email
                                </button>
                                <span style={{ margin: '0 8px' }}>|</span>
                                <button 
                                    className="login-link"
                                    onClick={handleResendOTP}
                                >
                                    Resend OTP
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
    }

    // Email Input Screen (Initial step)
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

                <div className="modal-content-one">
                    <h3>Reset Your Password</h3>
                    <p>Enter your email address and we'll send you an OTP to reset your password.</p>

                    <form onSubmit={handleSendOTP} className="reset-form">
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
                            id='getOTP'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Sending OTP...</span>
                                </>
                            ) : (
                                <span>Send OTP</span>
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
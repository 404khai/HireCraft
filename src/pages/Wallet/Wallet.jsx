import React, { useState, useEffect, useContext } from 'react'
import './Wallet.css'
import DashboardNav from '../../components/DashboardNav/DashboardNav'
import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { IoCartOutline } from "react-icons/io5";
import { MdCurrencyExchange } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const Wallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const API_BASE_URL = 'http://localhost:9090/api/v1/payments';

  // Utility function for getting token and config
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Authentication token not found. Please log in.");
      setLoading(false);
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Function to fetch transactions
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);

    const config = getAuthConfig();
    if (!config) return;

    try {
      // Get provider ID from context or localStorage
      const providerId = user?.providerId || localStorage.getItem('providerId');
      if (!providerId) {
        setError("Provider ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/provider/${providerId}/transactions`, config);
      
      // Sort transactions by created date (most recent first)
      const sortedTransactions = response.data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      
      setTransactions(sortedTransactions);
      console.log("Fetched provider transactions:", sortedTransactions);
    } catch (err) {
      console.error("Error fetching provider transactions:", err);
      if (err.response && err.response.status === 401) {
        setError("Session expired or unauthorized. Please log in again.");
      } else {
        setError("Failed to load transactions. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions on component mount
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  // Function to format currency
  const formatCurrency = (amount, currency = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return <FaCheckCircle className="success-icon" />;
      case 'failed':
        return <FaTimesCircle className="failed-icon" />;
      case 'pending':
        return <FaClock className="pending-icon" />;
      default:
        return <FaClock className="pending-icon" />;
    }
  };

  // Function to get time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Function to calculate total earnings
  const calculateTotalEarnings = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.status.toLowerCase() === 'success') {
        return total + (transaction.providerAmount || 0);
      }
      return total;
    }, 0);
  };

  // Function to calculate daily earnings (today's earnings)
  const calculateDailyEarnings = () => {
    const today = new Date();
    const todayString = today.toDateString();
    
    return transactions.reduce((total, transaction) => {
      if (transaction.status.toLowerCase() === 'success') {
        const transactionDate = new Date(transaction.paidAt || transaction.createdAt);
        if (transactionDate.toDateString() === todayString) {
          return total + (transaction.providerAmount || 0);
        }
      }
      return total;
    }, 0);
  };

  // Function to calculate withdrawable balance (you can modify this logic based on your business rules)
  const calculateWithdrawableBalance = () => {
    // For now, using total earnings as withdrawable balance
    // You can modify this to subtract already withdrawn amounts, pending withdrawals, etc.
    return calculateTotalEarnings();
  };

  // Render loading state
  if (loading) {
    return (
      <div className='walletBox'>
        <DashboardNav/>
        <div className='walletBody'>
          <ProviderSideNav/>
          <div className="wallet">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Wallet</h2>
              </div>
              <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Wallet" link2="/ProviderDashboard/Wallet"/>
            </div>
            <div className="walletOverview">
              <div className="loading-spinner">
                <p>Loading wallet data...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className='walletBox'>
        <DashboardNav/>
        <div className='walletBody'>
          <ProviderSideNav/>
          <div className="wallet">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Wallet</h2>
              </div>
              <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Wallet" link2="/ProviderDashboard/Wallet"/>
            </div>
            <div className="walletOverview">
              <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchTransactions} className="retry-btn">
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='walletBox'>
      <DashboardNav/>
        <div className='walletBody'>
          <ProviderSideNav/>
          <div className="wallet">
            <div className="welcome">
              <div className="welcomeTxt">
                <h2>Wallet</h2>
              </div>

              <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Wallet" link2="/ProviderDashboard/Wallet"/>
            </div>

            <div className="walletOverview">
                <div className="balance">
                    <div className="walletOverviewTxt">
                        <h4><b>{formatCurrency(calculateWithdrawableBalance())}</b></h4>
                        <p>Withdrawable</p>
                        <p>Balance <span className='walletCurrency'>$</span></p>
                    </div>
                    <i><MdCurrencyExchange/></i>
                </div>

                <div className="dailyEarnings">
                    <div className="walletOverviewTxt">
                        <h4><b>{formatCurrency(calculateDailyEarnings())}</b></h4>
                        <p>Daily</p>
                        <p>Earnings <span className='walletCurrency'>$</span></p>
                    </div>
                    <i><IoCartOutline/></i>
                </div>

                <div className="totalEarnings">
                    <div className="walletOverviewTxt">
                        <h4><b>{formatCurrency(calculateTotalEarnings())}</b></h4>
                        <p>Total</p>
                        <p>Earnings <span className='walletCurrency'>$</span></p>
                    </div>
                    <i><TbMoneybag/></i>
                </div>
            </div>

            <div className='walletTypeBox'>
                <div className="earnings">
                    <div className="earningsTitle">
                        <p><b>Earnings</b></p>
                        <button>Fee: <b>10%</b></button>
                    </div>
                    
                    {/* <div className="earningsBody"> */}
                        {loading ? (
                            <div className="loading-state">
                                <i><IoCartOutline /></i>
                                <p>Loading transactions...</p>
                            </div>
                        ) : error ? (
                            <div className="error-state">
                                <i><IoCartOutline /></i>
                                <p>Error loading transactions: {error}</p>
                                <button onClick={fetchTransactions} className="retry-btn">
                                    Retry
                                </button>
                            </div>
                        ) : transactions.length === 0 ? (
                            <div className="no-payouts">
                                <i><IoCartOutline /></i>
                                <p>You don't have payouts yet</p>
                            </div>
                        ) : (
                            <div className="transactions-table-container">
                                <table className="booking-table">
                                    <thead className="booking-table-header">
                                        <tr>
                                            <th>Transaction</th>
                                            <th>Client</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Payment Method</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((transaction) => (
                                            <tr className="booking-table-row" key={transaction.id}>
                                                <td className="booking-table-cell" data-label="Transaction">
                                                    <div className="transaction-info">
                                                        <div className="transaction-details">
                                                            <h4>#{transaction.reference}</h4>
                                                            <p>{transaction.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td className="booking-table-cell" data-label="Client">
                                                    <div className="client-details">
                                                        <h4>{transaction.clientName}</h4>
                                                        <p>Client ID: {transaction.clientId}</p>
                                                    </div>
                                                </td>
                                                
                                                <td className="booking-table-cell" data-label="Amount">
                                                    <div className="amount-info">
                                                        <div className="amount-item">
                                                            <span className="amount-label">Total:</span>
                                                            <span className="amount-value">
                                                                {formatCurrency(transaction.amount, transaction.currency)}
                                                            </span>
                                                        </div>
                                                        <div className="amount-item">
                                                            <span className="amount-label">You received:</span>
                                                            <span className="amount-value provider-amount">
                                                                {formatCurrency(transaction.providerAmount, transaction.currency)}
                                                            </span>
                                                        </div>
                                                        <div className="amount-item platform-fee">
                                                            <span className="amount-label">Platform fee:</span>
                                                            <span className="amount-value">
                                                                {formatCurrency(transaction.platformFee, transaction.currency)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td className="booking-table-cell status-cell" data-label="Status">
                                                    <div className={`bookingStatus ${transaction.status.toLowerCase()}`}>
                                                        {getStatusIcon(transaction.status)}
                                                        {transaction.status}
                                                    </div>
                                                </td>
                                                
                                                <td className="booking-table-cell" data-label="Payment Method">
                                                    <div className="payment-method">
                                                        <p>{transaction.paymentMethod || 'Card Payment'}</p>
                                                        <p className="gateway-response">{transaction.gatewayResponse}</p>
                                                    </div>
                                                </td>
                                                
                                                <td className="booking-table-cell time-cell" data-label="Time">
                                                    <div className="time-info">
                                                        <p>{getTimeAgo(transaction.paidAt || transaction.createdAt)}</p>
                                                        <p className="full-date">
                                                            {formatDate(transaction.paidAt || transaction.createdAt)}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    {/* </div> */}
                </div>
            </div>

           </div>
        </div>
    </div>
  )
}

export default Wallet
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Transactions.css';
import DashboardNav from '../../components/DashboardNav/DashboardNav';
import ClientSideNav from '../../components/ClientSideNav/ClientSideNav';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { IoLocationOutline, IoBriefcaseOutline, IoCalendarOutline } from 'react-icons/io5';
import { LuClock4, LuMessageSquareText } from 'react-icons/lu';
import { MdTaskAlt } from 'react-icons/md';
import { LiaGlobeAmericasSolid } from 'react-icons/lia';
import { SiTicktick } from 'react-icons/si';
import { MdOutlineCancel, MdOutlineRateReview } from 'react-icons/md';
import { BiTask } from 'react-icons/bi';
import { FaCreditCard, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const { user } = useContext(AuthContext);

    const API_BASE_URL = 'http://localhost:9090/api/v1/payments';

    // Filter options for transaction statuses
    const filterOptions = [
        { key: 'ALL', label: 'All Transactions', count: 0 },
        { key: 'SUCCESS', label: 'Successful', count: 0 },
        { key: 'PENDING', label: 'Pending', count: 0 },
        { key: 'FAILED', label: 'Failed', count: 0 },
        { key: 'CANCELLED', label: 'Cancelled', count: 0 }
    ];

    // Function to get counts for each status
    const getFilterCounts = () => {
        const counts = { ALL: transactions.length };
        filterOptions.forEach(option => {
            if (option.key !== 'ALL') {
                counts[option.key] = transactions.filter(transaction => transaction.status === option.key).length;
            }
        });
        return counts;
    };

    // Function to filter transactions based on active filter
    const getFilteredTransactions = () => {
        if (activeFilter === 'ALL') {
            return transactions;
        }
        return transactions.filter(transaction => transaction.status === activeFilter);
    };

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
    const fetchClientTransactions = async () => {
        setLoading(true);
        setError(null);

        const config = getAuthConfig();
        if (!config) return;

        try {
            // Get user ID from context or localStorage
            const clientId = user?.clientId || localStorage.getItem('clientId');
            if (!clientId) {
                setError("ClientID not found. Please log in again.");
                setLoading(false);
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/client/${clientId}/transactions`, config);
            
            // Sort transactions by created date (most recent first)
            const sortedTransactions = response.data.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });
            
            setTransactions(sortedTransactions);
            console.log("Fetched transactions:", sortedTransactions);
        } catch (err) {
            console.error("Error fetching client transactions:", err);
            if (err.response && err.response.status === 401) {
                setError("Session expired or unauthorized. Please log in again.");
            } else {
                setError("Failed to load transactions. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filterKey) => {
        setActiveFilter(filterKey);
    };

    // Format date for display
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

    // Format currency
    const formatCurrency = (amount, currency = 'NGN') => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'SUCCESS':
                return <FaCheckCircle className="status-icon success" />;
            case 'FAILED':
                return <FaTimesCircle className="status-icon failed" />;
            case 'PENDING':
                return <FaHourglassHalf className="status-icon pending" />;
            case 'CANCELLED':
                return <MdOutlineCancel className="status-icon cancelled" />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (user) {
            fetchClientTransactions();
        }
    }, [user]);

    // Get filtered transactions and counts
    const filteredTransactions = getFilteredTransactions();
    const filterCounts = getFilterCounts();

    // Render loading state
    if (loading) {
        return (
            <div className='dashboardBox'>
                <DashboardNav />
                <div className='dashboardBody'>
                    <ClientSideNav />
                    <div className="dashboard">
                        <div className="welcome">
                            <div className="welcomeTxt">
                                <h2>My Transactions</h2>
                            </div>
                            <Breadcrumbs 
                                firstLink="Dashboard" 
                                link="/ClientDashboard" 
                                secondLink="Transactions" 
                                link2="/ClientDashboard/Transactions" 
                            />
                        </div>
                        <div className="jobAlertsBox">
                            <div className="loading-spinner">
                                <p>Loading transactions...</p>
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
            <div className='dashboardBox'>
                <DashboardNav />
                <div className='dashboardBody'>
                    <ClientSideNav />
                    <div className="dashboard">
                        <div className="welcome">
                            <div className="welcomeTxt">
                                <h2>My Transactions</h2>
                            </div>
                            <Breadcrumbs 
                                firstLink="Dashboard" 
                                link="/ClientDashboard" 
                                secondLink="Transactions" 
                                link2="/ClientDashboard/Transactions" 
                            />
                        </div>
                        <div className="jobAlertsBox">
                            <div className="error-message">
                                <p>{error}</p>
                                <button onClick={fetchClientTransactions} className="retry-btn">
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
        <div className='bookingBox'>
            <DashboardNav />
            <div className='bookingBody'>
                <ClientSideNav />
                <div className="bookingDashboard">
                    <div className="welcome">
                        <div className="welcomeTxt">
                            <h2>My Transactions</h2>
                        </div>
                        <Breadcrumbs 
                            firstLink="Dashboard" 
                            link="/ClientDashboard" 
                            secondLink="Transactions" 
                            link2="/ClientDashboard/Transactions" 
                        />
                    </div>

                    <div className="jobAlertsBox">
                        <div className="jobAlerts">
                            <div className="jobAlertsHead">
                                <i><FaCreditCard /></i>
                                My Transactions
                            </div>

                            {/* Transaction Filters */}
                            <div className="bookingFilters">
                                {filterOptions.map(option => (
                                    <button
                                        key={option.key}
                                        className={`filterBtn ${activeFilter === option.key ? 'active' : ''}`}
                                        onClick={() => handleFilterChange(option.key)}
                                    >
                                        {option.label}
                                        <span className="filterCount">{filterCounts[option.key] || 0}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Results Summary */}
                            <div className="filterSummary">
                                <p>
                                    Showing {filteredTransactions.length} of {transactions.length} transactions
                                    {activeFilter !== 'ALL' && ` (${filterOptions.find(f => f.key === activeFilter)?.label})`}
                                </p>
                            </div>

                            {/* Transactions Table */}
                            {filteredTransactions.length === 0 ? (
                                <div className="no-transactions-found">
                                    <FaCreditCard className="empty-icon" />
                                    <p>
                                        {activeFilter === 'ALL' 
                                            ? "No transactions found. Start by making a booking and completing payment!" 
                                            : `No ${filterOptions.find(f => f.key === activeFilter)?.label.toLowerCase()} transactions found.`
                                        }
                                    </p>
                                </div>
                            ) : (
                                <div className="transactions-container">
                                    <table className="transaction-table">
                                        <thead className="transaction-table-header">
                                            <tr>
                                                <th>Provider</th>
                                                <th>Occupation</th>
                                                <th>Location</th>
                                                <th>Status</th>
                                                <th>Amount</th>
                                                <th>Currrency</th>
                                                <th>Paid at</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTransactions.map((transaction) => (
                                                <tr className="transaction-table-row" key={transaction.id}>
                                                    <td className="transaction-table-cell" data-label="Provider">
                                                        <div className="provider-info">
                                                            <h4>{transaction.providerName}</h4>
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="transaction-table-cell" data-label="Provider">
                                                        <div className="provider-info">
                                                            <h4>{transaction.providerName}</h4>
                                                        </div>
                                                    </td>
                                                    
                                                    {/* <td className="transaction-table-cell" data-label="Description">
                                                        <div className="description-info">
                                                            <p>{transaction.description}</p>
                                                            <small>Booking #{transaction.bookingId}</small>
                                                        </div>
                                                    </td>
                                                     */}
                                                    <td className="transaction-table-cell" data-label="Amount">
                                                        <div className="amount-info">
                                                            <div className="total-amount">
                                                                {formatCurrency(transaction.amount, transaction.currency)}
                                                            </div>
                                                            {/* <div className="amount-breakdown">
                                                                <small>
                                                                    Provider: {formatCurrency(transaction.providerAmount, transaction.currency)}
                                                                </small>
                                                                <small>
                                                                    Platform Fee: {formatCurrency(transaction.platformFee, transaction.currency)}
                                                                </small>
                                                            </div> */}
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="transaction-table-cell status-cell" data-label="Status">
                                                        <div className={`transactionStatus ${transaction.status.toLowerCase()}`}>
                                                            {/* {getStatusIcon(transaction.status)} */}
                                                            <span>{transaction.status}</span>
                                                        </div>
                                                        {/* {transaction.gatewayResponse && (
                                                            <small className="gateway-response">
                                                                {transaction.gatewayResponse}
                                                            </small>
                                                        )} */}
                                                    </td>
                                                    
                                                    <td className="transaction-table-cell" data-label="Payment Method">
                                                        <div className="payment-method">
                                                            <span>
                                                                {transaction.paymentMethod || 'Paystack'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="transaction-table-cell" data-label="Date">
                                                        <div className="date-info">
                                                            {/* <div className="created-date">
                                                                <small>Created:</small>
                                                                <span>{formatDate(transaction.createdAt)}</span>
                                                            </div> */}
                                                            {transaction.paidAt && (
                                                                <div className="paid-date">
                                                                    {/* <small>Paid:</small> */}
                                                                    <span>{formatDate(transaction.paidAt)}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="transaction-table-cell" data-label="Actions">
                                                        <div className="actions-cell">
                                                            {transaction.bookingId && (
                                                                <Link to={`/ClientDashboard/Bookings/${transaction.bookingId}`}>
                                                                    <button className="viewBookingBtn">
                                                                        <i><IoBriefcaseOutline /></i>
                                                                        View Booking
                                                                    </button>
                                                                </Link>
                                                            )}
                                                            
                                                            {transaction.status === 'SUCCESS' && (
                                                                <button 
                                                                    className="downloadReceiptBtn"
                                                                    onClick={() => {
                                                                        // You can implement receipt download functionality here
                                                                        toast.info('Receipt download feature coming soon!');
                                                                    }}
                                                                >
                                                                    <i><MdTaskAlt /></i>
                                                                    Receipt
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
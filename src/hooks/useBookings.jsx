// hooks/useBookings.js
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const useBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const API_BASE_URL = 'http://localhost:9090/api/v1/bookings';

    // Filter options
    const filterOptions = [
        { key: 'PENDING', label: 'New Requests', count: 0 },
        { key: 'ACCEPTED', label: 'In Progress', count: 0 },
        { key: 'COMPLETED', label: 'Completed', count: 0 },
        { key: 'DECLINED', label: 'Declined', count: 0 },
        { key: 'CANCELLED', label: 'Cancelled', count: 0 }
    ];

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

    // Function to parse timeAgo and convert to sortable timestamp
    const parseTimeAgo = (timeAgo) => {
        const now = new Date();
        const timeAgoLower = timeAgo.toLowerCase();
        
        if (timeAgoLower.includes('just now') || timeAgoLower.includes('now')) {
            return now;
        }
        
        const match = timeAgoLower.match(/(\d+)\s*(second|minute|hour|day|week|month|year)s?\s*ago/);
        if (!match) return now;
        
        const value = parseInt(match[1]);
        const unit = match[2];
        
        const result = new Date(now);
        
        switch(unit) {
            case 'second':
                result.setSeconds(result.getSeconds() - value);
                break;
            case 'minute':
                result.setMinutes(result.getMinutes() - value);
                break;
            case 'hour':
                result.setHours(result.getHours() - value);
                break;
            case 'day':
                result.setDate(result.getDate() - value);
                break;
            case 'week':
                result.setDate(result.getDate() - (value * 7));
                break;
            case 'month':
                result.setMonth(result.getMonth() - value);
                break;
            case 'year':
                result.setFullYear(result.getFullYear() - value);
                break;
            default:
                return now;
        }
        
        return result;
    };

    // Function to get counts for each status
    const getFilterCounts = () => {
        const counts = { ALL: bookings.length };
        filterOptions.forEach(option => {
            if (option.key !== 'ALL') {
                counts[option.key] = bookings.filter(booking => booking.status === option.key).length;
            }
        });
        return counts;
    };

    // Function to fetch bookings
    const fetchBookings = async () => {
        setLoading(true);
        setError(null);

        const config = getAuthConfig();
        if (!config) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/provider/me`, config);
            // Sort bookings by parsing timeAgo (most recent first)
            const sortedBookings = response.data.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : parseTimeAgo(a.timeAgo);
                const dateB = b.createdAt ? new Date(b.createdAt) : parseTimeAgo(b.timeAgo);
                return dateB - dateA;
            });
            setBookings(sortedBookings);
            console.log("Fetched bookings:", sortedBookings);
        } catch (err) {
            console.error("Error fetching provider bookings:", err);
            if (err.response && err.response.status === 401) {
                setError("Session expired or unauthorized. Please log in again.");
            } else {
                setError("Failed to load bookings. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Function to update booking status
    const updateBookingStatus = async (bookingId, newStatus) => {
        setError(null);

        const config = getAuthConfig();
        if (!config) return;

        try {
            const payload = { newStatus: newStatus };
            await axios.patch(`${API_BASE_URL}/${bookingId}/status`, payload, config);
            
            // Update the state and maintain sorting
            setBookings(prevBookings => {
                const updatedBookings = prevBookings.map(booking =>
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                );
                // Re-sort to maintain newest first order using timeAgo parsing
                return updatedBookings.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt) : parseTimeAgo(a.timeAgo);
                    const dateB = b.createdAt ? new Date(b.createdAt) : parseTimeAgo(b.timeAgo);
                    return dateB - dateA;
                });
            });
            console.log(`Booking ${bookingId} status updated to ${newStatus}`);
        } catch (err) {
            console.error(`Error updating booking ${bookingId} to ${newStatus}:`, err);
            if (err.response) {
                if (err.response.status === 401) {
                    setError("Unauthorized: You don't have permission to perform this action or your session expired.");
                } else if (err.response.status === 400 || err.response.status === 409) {
                    setError(`Error: ${err.response.data.message || 'Invalid status transition or request.'}`);
                } else {
                    setError(`Failed to update status: ${err.response.data.message || 'Server error.'}`);
                }
            } else {
                setError("Failed to connect to the server. Please check your network.");
            }
        }
    };

    // Function to filter bookings based on active filter
    const getFilteredBookings = (activeFilter) => {
        if (activeFilter === 'ALL') {
            return bookings;
        }
        return bookings.filter(booking => booking.status === activeFilter);
    };

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    return {
        bookings,
        loading,
        error,
        filterOptions,
        getFilterCounts,
        getFilteredBookings,
        updateBookingStatus,
        fetchBookings
    };
};

export default useBookings;
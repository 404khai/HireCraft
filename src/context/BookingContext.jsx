import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [pendingBookingsCount, setPendingBookingsCount] = useState(0);

    return (
        <BookingContext.Provider value={{ 
            pendingBookingsCount, 
            setPendingBookingsCount 
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBookingContext = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBookingContext must be used within a BookingProvider');
    }
    return context;
};

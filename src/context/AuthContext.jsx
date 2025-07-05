
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUserState] = useState(null);
//   const [loading, serLoading] = useState(true)
//   const [token, setTokenState] = useState(null);

//   // Function to update both user and token in state and localStorage
//   const login = (userData, access_token) => { // Changed jwtToken to access_token
//     setUserState(userData);
//     setTokenState(access_token);
//     localStorage.setItem('token', access_token);
//     localStorage.setItem('user', JSON.stringify(userData)); // Store user data
//   };

//   const logout = () => {
//     setUserState(null);
//     setTokenState(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     // Optionally, navigate to login page here or show a message
//   };

//   // Check token and fetch user on mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');

//     if (storedToken) {
//       setTokenState(storedToken); // Set token state from localStorage

//       // ONLY parse storedUser if it exists
//       if (storedUser) {
//         try {
//           const parsedUser = JSON.parse(storedUser);
//           setUserState(parsedUser);
//           console.log('User data loaded from localStorage:', parsedUser);
//         } catch (e) {
//           console.error("Error parsing stored user data from localStorage:", e);
//           localStorage.removeItem('user'); // Clear corrupted user data
//           setUserState(null);
//         }
//       }

//       // Always re-validate the token by fetching user data from the backend
//       fetch('http://localhost:9090/api/v1/users/me', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${storedToken}`
//         }
//       })
//       .then(res => {
//         if (!res.ok) {
//           return res.json().then(errorData => {
//             throw new Error(`HTTP ${res.status}: ${errorData.message || res.statusText}`);
//           }).catch(() => {
//             throw new Error(`HTTP ${res.status}`);
//           });
//         }
//         return res.json();
//       })
//       .then(data => {
//         if (data && data.id) {
//           setUserState(data); // Update user state with fresh data from backend
//           localStorage.setItem('user', JSON.stringify(data)); // Update localStorage with fresh user data
//           console.log('User data fetched from /me and validated:', data);
//         } else {
//           console.warn('Invalid user data received from /users/me:', data);
//           logout();
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching user from /me:', err);
//         if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Failed to fetch')) {
//           logout();
//           console.log('Token removed due to 401 Unauthorized or network error.');
//         }
//       });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, setUser: setUserState }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true); // Fixed typo: serLoading -> setLoading
  const [token, setTokenState] = useState(null);

  // Function to update both user and token in state and localStorage
  const login = (userData, access_token) => { // Changed jwtToken to access_token
    setUserState(userData);
    setTokenState(access_token);
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
    setLoading(false); // Set loading to false after successful login
  };

  const logout = () => {
    setUserState(null);
    setTokenState(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoading(false); // Set loading to false after logout
    // Optionally, navigate to login page here or show a message
  };

  // Check token and fetch user on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      setTokenState(storedToken); // Set token state from localStorage

      // ONLY parse storedUser if it exists
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserState(parsedUser);
          console.log('User data loaded from localStorage:', parsedUser);
        } catch (e) {
          console.error("Error parsing stored user data from localStorage:", e);
          localStorage.removeItem('user'); // Clear corrupted user data
          setUserState(null);
        }
      }

      // Always re-validate the token by fetching user data from the backend
      fetch('http://localhost:9090/api/v1/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(errorData => {
            throw new Error(`HTTP ${res.status}: ${errorData.message || res.statusText}`);
          }).catch(() => {
            throw new Error(`HTTP ${res.status}`);
          });
        }
        return res.json();
      })
      .then(data => {
        if (data && data.id) {
          setUserState(data); // Update user state with fresh data from backend
          localStorage.setItem('user', JSON.stringify(data)); // Update localStorage with fresh user data
          console.log('User data fetched from /me and validated:', data);
        } else {
          console.warn('Invalid user data received from /users/me:', data);
          logout();
        }
      })
      .catch((err) => {
        console.error('Error fetching user from /me:', err);
        if (err.message.includes('401') || err.message.includes('403') || err.message.includes('Failed to fetch')) {
          logout();
          console.log('Token removed due to 401 Unauthorized or network error.');
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false after auth check completes
      });
    } else {
      // No token found, set loading to false
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser: setUserState, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
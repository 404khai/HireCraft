// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Check token and fetch user on mount
//   useEffect(() => {
    
//     const token = localStorage.getItem('token'); // This token is now 'access_token'
//     if (token) {
//       fetch('http://localhost:9090/api/v1/users/me', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}` // This uses the access_token
//         }
//       })
//       .then(res => {
//         if (!res.ok) {
//           // If the response is not OK, throw an error
//           // The .json() might fail if the response is empty or not JSON
//           return res.json().then(errorData => {
//             throw new Error(`HTTP ${res.status}: ${errorData.message || res.statusText}`);
//           }).catch(() => {
//             // Catch if res.json() fails (e.g., non-JSON error)
//             throw new Error(`HTTP ${res.status}`);
//           });
//         }
//         return res.json();
//       })
//       .then(data => {
//         // This 'data' should be the actual user object returned by /users/me
//         // For example: { id: "user_id_123", email: "...", name: "..." }
//         if (data && data.id) { // Check if the fetched user data has an 'id'
//           setUser(data); // Set the entire user object
//           console.log('User data fetched from /me:', data);
//         } else {
//           // If /users/me returns something but no ID, or null
//           console.warn('Invalid user data received from /users/me:', data);
//           localStorage.removeItem('token');
//           setUser(null);
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching user from /me:', err);
//         // Only clear token if 401, indicating unauthorized/expired token
//         if (err.message.includes('401')) {
//           localStorage.removeItem('token');
//           setUser(null);
//           console.log('Token removed due to 401 Unauthorized.');
//         } else {
//           // Handle other errors, maybe keep the user as null or show a generic error
//           setUser(null);
//         }
//       });
//     }
//   }, []);

//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   fetch('http://localhost:9090/api/v1/users/me', {
//     //   method: 'GET',
//     //   headers: {
//     //     Authorization: `Bearer ${token}`
//     //   }
//     // })
//     //   .then(res => {
//     //     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     //     return res.json();
//     //   })
//     //   .then(data => {
//     //     if (data && data.id) {
//     //       setUser(data);
//     //       console.log(data);
//     //     } else {
//     //       localStorage.removeItem('token');
//     //       setUser(null);          
//     //     }
//     //   })
//     //   .catch((err) => {
//     //     console.error(err);
//     //     // only clear token if 401
//     //     if (err.message.includes('401')) {
//     //       localStorage.removeItem('token');
//     //       setUser(null);
//     //     }
//     //   });

//       // fetch('http://localhost:9090/api/v1/users/me', {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`
//       //   }
//       // })
//       //   .then(res => res.json())
//       //   .then(data => {
//       //     if (data && data.id) {
//       //       setUser(data);
//       //     } else {
//       //       localStorage.removeItem('token');
//       //       setUser(null);
//       //     }
//       //   })
//       //   .catch(() => {
//       //     localStorage.removeItem('token');
//       //   });
    

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.js
// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);

  // Function to update both user and token in state and localStorage
  const login = (userData, access_token) => { // Changed jwtToken to access_token
    setUserState(userData);
    setTokenState(access_token);
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
  };

  const logout = () => {
    setUserState(null);
    setTokenState(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser: setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};
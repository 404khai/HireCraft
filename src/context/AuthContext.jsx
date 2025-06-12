import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check token and fetch user on mount
  useEffect(() => {
    
    const token = localStorage.getItem('token'); // This token is now 'access_token'
    if (token) {
      fetch('http://localhost:9090/api/v1/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}` // This uses the access_token
        }
      })
      .then(res => {
        if (!res.ok) {
          // If the response is not OK, throw an error
          // The .json() might fail if the response is empty or not JSON
          return res.json().then(errorData => {
            throw new Error(`HTTP ${res.status}: ${errorData.message || res.statusText}`);
          }).catch(() => {
            // Catch if res.json() fails (e.g., non-JSON error)
            throw new Error(`HTTP ${res.status}`);
          });
        }
        return res.json();
      })
      .then(data => {
        // This 'data' should be the actual user object returned by /users/me
        // For example: { id: "user_id_123", email: "...", name: "..." }
        if (data && data.id) { // Check if the fetched user data has an 'id'
          setUser(data); // Set the entire user object
          console.log('User data fetched from /me:', data);
        } else {
          // If /users/me returns something but no ID, or null
          console.warn('Invalid user data received from /users/me:', data);
          localStorage.removeItem('token');
          setUser(null);
        }
      })
      .catch((err) => {
        console.error('Error fetching user from /me:', err);
        // Only clear token if 401, indicating unauthorized/expired token
        if (err.message.includes('401')) {
          localStorage.removeItem('token');
          setUser(null);
          console.log('Token removed due to 401 Unauthorized.');
        } else {
          // Handle other errors, maybe keep the user as null or show a generic error
          setUser(null);
        }
      });
    }
  }, []);

    // const token = localStorage.getItem('token');
    // if (token) {
    //   fetch('http://localhost:9090/api/v1/users/me', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    //   .then(res => {
    //     if (!res.ok) throw new Error(`HTTP ${res.status}`);
    //     return res.json();
    //   })
    //   .then(data => {
    //     if (data && data.id) {
    //       setUser(data);
    //       console.log(data);
    //     } else {
    //       localStorage.removeItem('token');
    //       setUser(null);          
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     // only clear token if 401
    //     if (err.message.includes('401')) {
    //       localStorage.removeItem('token');
    //       setUser(null);
    //     }
    //   });

      // fetch('http://localhost:9090/api/v1/users/me', {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     if (data && data.id) {
      //       setUser(data);
      //     } else {
      //       localStorage.removeItem('token');
      //       setUser(null);
      //     }
      //   })
      //   .catch(() => {
      //     localStorage.removeItem('token');
      //   });
    

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

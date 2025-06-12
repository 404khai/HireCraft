import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check token and fetch user on mount
  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:9090/api/v1/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data && data.id) {
          setUser(data);
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      })
      .catch((err) => {
        console.error(err);
        // only clear token if 401
        if (err.message.includes('401')) {
          localStorage.removeItem('token');
          setUser(null);
        }
      });

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
    }
  }, []);

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

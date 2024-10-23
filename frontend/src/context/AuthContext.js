import React, { createContext, useState, useEffect, useContext } from 'react'; // Tambahkan useContext di sini

// Membuat konteks
export const AuthContext = createContext(null);

// Provider untuk AuthContext
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    // Periksa token dan data pengguna yang ada
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (token && user) {
      setAuth({
        isAuthenticated: true,
        user,
        token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Ekspor useAuth hook untuk mengakses konteks
export const useAuth = () => useContext(AuthContext);

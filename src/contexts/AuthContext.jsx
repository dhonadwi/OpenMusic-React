// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  });

  const login = async (username, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASEURL}/authentications`,
        // 'https://open-music-zeta.vercel.app/authentications',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.data.accessToken && data.data.refreshToken) {
        // Simpan token
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);

        // Update state
        setTokens({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });

        setUser(data.message);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Reset state
    setTokens({
      accessToken: null,
      refreshToken: null,
    });
    setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(
        'https://open-music-zeta.vercel.app/authentications',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: tokens.refreshToken,
          }),
        }
      );

      const data = await response.json();

      if (data.data.accessToken) {
        // Update access token
        localStorage.setItem('accessToken', data.data.accessToken);
        setTokens((prev) => ({
          ...prev,
          accessToken: data.data.accessToken,
        }));
        return data.data.accessToken;
      }

      // Jika refresh token gagal, logout
      logout();
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  };

  // Fungsi untuk membuat API request yang ter-autentikasi
  const authenticatedFetch = async (url, options = {}) => {
    // Ambil access token terbaru
    const token = tokens.accessToken;

    // Tambahkan header authorization
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await fetch(url, { ...options, headers });

      // Jika unauthorized (token expired), coba refresh token
      if (response.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          // Ulangi request dengan token baru
          headers['Authorization'] = `Bearer ${newToken}`;
          response = await fetch(url, { ...options, headers });
        }
      }

      return response;
    } catch (error) {
      console.error('Authenticated fetch error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        login,
        logout,
        refreshAccessToken,
        authenticatedFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

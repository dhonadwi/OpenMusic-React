import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header';
import React, { useEffect, useState } from 'react';

const Layout = ({
  children,
  currentPath,
  user,
  playlists,
  isLoading,
  onHandlePlaylists,
}) => {
  return (
    <div>
      <Header
        currentPath={currentPath}
        user={user}
        playlists={playlists}
        isLoading={isLoading}
        onHandlePlaylists={onHandlePlaylists}
      />
      {children}
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { tokens } = useAuth();
  const location = useLocation();
  const { authenticatedFetch } = useAuth();
  const [user, setUser] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlaylists = async () => {
    try {
      const response = await authenticatedFetch(
        `${import.meta.env.VITE_BASEURL}/playlists`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      const getPlaylists = data.data.playlists;
      setPlaylists(getPlaylists);
      setIsLoading(false);
    } catch (error) {
      console.log('Terjadi kesalahan pada playlists', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await authenticatedFetch(
        `${import.meta.env.VITE_BASEURL}/users`
      );
      const data = await response.json();
      console.log(data);
      const dataUser = data.data.user;
      setUser(dataUser);
    } catch (error) {
      console.log('terjadi kesalahan saat mendapatkan data user', error);
    }
  };

  useEffect(() => {
    getUser();
    handlePlaylists();
    console.log('getUser n playlists');
  }, []);

  // Cek apakah memiliki access token
  if (!tokens.accessToken) {
    // Redirect ke halaman login jika tidak ter-autentikasi
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // return children;
  // Clone children dan tambahkan props
  const childrenWithProps = React.Children.map(children, (child) => {
    // Pastikan child adalah valid React element
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        currentPath: location.pathname,
        user: user,
        playlists: playlists,
        isLoading: isLoading,
        onHandlePlaylists: handlePlaylists,
      });
    }
    return child;
  });

  // Wrap children dengan Layout
  return (
    <Layout
      currentPath={location.pathname}
      user={user}
      playlists={playlists}
      isLoading={isLoading}
      onHandlePlaylists={handlePlaylists}
    >
      {childrenWithProps}
    </Layout>
  );
};

export default PrivateRoute;

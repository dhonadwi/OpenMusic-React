import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header';
import React, { useEffect, useState } from 'react';

const Layout = ({ children, currentPath, user }) => {
  return (
    <div>
      <Header currentPath={currentPath} user={user} />
      {children}
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { tokens } = useAuth();
  const location = useLocation();
  const { authenticatedFetch } = useAuth();
  const [user, setUser] = useState([]);

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
    console.log('getUser');
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
      });
    }
    return child;
  });

  // Wrap children dengan Layout
  return (
    <Layout currentPath={location.pathname} user={user}>
      {childrenWithProps}
    </Layout>
  );
};

export default PrivateRoute;

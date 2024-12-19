import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header';
import React from 'react';
const Layout = ({ children, currentPath }) => {
  return (
    <div>
      <Header currentPath={currentPath} />
      {children}
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { tokens } = useAuth();
  const location = useLocation();

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
      return React.cloneElement(child, { currentPath: location.pathname });
    }
    return child;
  });

  // Wrap children dengan Layout
  return <Layout currentPath={location.pathname}>{childrenWithProps}</Layout>;
};

export default PrivateRoute;

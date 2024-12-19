import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { tokens } = useAuth();
  const location = useLocation();
  console.log(location.pathname);
  // Cek apakah memiliki access token
  if (!tokens.accessToken) {
    // Redirect ke halaman login jika tidak ter-autentikasi
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

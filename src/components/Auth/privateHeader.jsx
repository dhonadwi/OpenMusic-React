// import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateHeader = ({ children }) => {
  const { tokens } = useAuth();

  // Cek apakah memiliki access token
  if (!tokens.accessToken) {
    // Redirect ke halaman login jika tidak ter-autentikasi
    return '';
  }

  return children;
};

export default PrivateHeader;

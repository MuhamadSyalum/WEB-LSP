import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Pastikan ini benar

const ProtectedRoute = ({ children, allowedLevels }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  console.log('Auth state:', auth); // Debugging

  if (!auth.isAuthenticated) {
    // Redirect to login while saving the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedLevels && !allowedLevels.includes(auth.user?.level)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
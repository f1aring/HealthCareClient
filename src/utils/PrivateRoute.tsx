import { RouteProps, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Type alias for flexibility and clarity
type ProtectedComponent = React.FC<any>; // Flexible props

const PrivateRoute = ({ Component, ...rest }: any) => {
  let { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Type assertion for clarity (optional)
  return <Component as ProtectedComponent {...rest} />; // Ensure it's a React component
};

export default PrivateRoute;

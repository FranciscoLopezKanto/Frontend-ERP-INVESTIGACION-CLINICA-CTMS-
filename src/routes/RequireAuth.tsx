import { ReactNode } from 'react'; 
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

interface Props {
  children: ReactNode;
  requiredRole?: string[];
}

export const RequireAuth = ({ children, requiredRole }: Props) => {
  const { user, loading, accessToken } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Cargando sesión...</div>;
  }

  if (!accessToken || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredRole && !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};


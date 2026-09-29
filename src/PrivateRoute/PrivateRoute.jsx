import { useLocation } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 loading loading-spinner text-warning"></span>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

// This component checks if a token is present in sessionStorage. If not, it redirects to /sign-in.
import type { ReactElement } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = !!sessionStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;

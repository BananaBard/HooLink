import { PropsWithChildren } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Pages from "../utils/pages.utils";

function PrivateRoute({ children }: PropsWithChildren) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={Pages.home} />;
  }

  return children;
}

export default PrivateRoute
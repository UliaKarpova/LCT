import { useContext } from "react";
import { AppContext } from "../../context/index.js";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== role) {
    if (user.role === "worker") {
      return <Navigate to="worker" />;
    }

    return <Navigate to="manager/monitoring" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

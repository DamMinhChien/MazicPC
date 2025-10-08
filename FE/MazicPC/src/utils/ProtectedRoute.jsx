import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTERS from "./router";

const ProtectedRoute = ({ component, allowedRoles = [] }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to={ROUTERS.USER.HOME} replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role?.toLowerCase())
  ) {
    return <Navigate to={ROUTERS.COMMON.FORBIDDEN} replace />;
  }

  return component;
};

export default ProtectedRoute;

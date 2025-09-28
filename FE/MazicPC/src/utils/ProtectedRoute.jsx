import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTERS from "./router";

const ProtectedRoute = ({ component, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  console.log("ProtectedRoute - user:", user);

  if (!user) {
    // chưa login
    return <Navigate to={ROUTERS.USER.HOME} replace />;
  }

  if (!allowedRoles.includes(user.role.toLowerCase())) {
    // login nhưng không đúng role
    console.log("Redirect to Forbidden");
    return <Navigate to={ROUTERS.COMMON.FORBIDDEN} replace />;
  }

  return component;
};

export default ProtectedRoute;

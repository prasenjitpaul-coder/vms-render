import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loadings from "../pages/Loading";

const ProtectedRoutes = ({ allowledRole }) => {
  const { Loading, user, IsLogin } = useContext(AuthContext);
const publicRoutes = ["/visitor", "/about", "/contact"];
const location = useLocation();
  if (publicRoutes.includes(location.pathname)) {
  return <Outlet />;
}
  if (Loading) return <Loadings />;
  if (!IsLogin) {
    return <Navigate to="/login" />;
  }

  if (!allowledRole.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;
};
export default ProtectedRoutes;

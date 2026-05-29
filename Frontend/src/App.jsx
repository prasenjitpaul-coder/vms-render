import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "../Component/navbar";
import Sidebar from "../Component/sidebar";
import Footer from "../Component/footer";
import Reg from "../Component/UserLog&Reg/Reg";
import Login from "../Component/UserLog&Reg/Login";
import Admin from "../Component/pages/admin/admin.jsx";
import AdminEmployeeSecurity from "../Component/pages/admin/adminEmployee&Security";
import AdminAppointment from "../Component/pages/admin/adminAppointment";
import Employee from "../Component/pages/employee/employee.jsx";
import EmployeeAppointment from "../Component/pages/employee/employeeAppointment.jsx";
import Security from "../Component/pages/security/security.jsx";
import SecurityAppointment from "../Component/pages/security/securityAppointment.jsx";
import SecurityCheck from "../Component/pages/security/securityCheck.jsx";
import ProtectedRoutes from "../Component/hooks/Protected.jsx";
import Loading from "../Component/pages/Loading.jsx";
import Unauthorized from "../Component/pages/unauthorized.jsx";
import { useContext } from "react";
import { AuthContext } from "../Component/hooks/AuthContext.jsx";

function App() {
  const { IsLogin, user } = useContext(AuthContext);

  return (
    <>
      {IsLogin && <Navbar />}
      {IsLogin && <Sidebar />}

      <Routes>
        {/* Public Routes */}
        {!IsLogin && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Reg />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Admin Routes */}
        <Route element={<ProtectedRoutes allowledRole={["admin"]} />}>
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/allApointments" element={<AdminAppointment />} />
          <Route
            path="/admin/employee-security"
            element={<AdminEmployeeSecurity />}
          />
        </Route>

        {/* Security Routes */}
        <Route element={<ProtectedRoutes allowledRole={["security"]} />}>
          <Route path="/" element={<Navigate to="/security/dashboard" />} />
          <Route path="/security/dashboard" element={<Security />} />
          <Route
            path="/security/allApointments"
            element={<SecurityAppointment />}
          />
          <Route path="/security/check" element={<SecurityCheck />} />
        </Route>
        {/* Employee Routes */}
        <Route element={<ProtectedRoutes allowledRole={"employee"} />}>
          <Route path="/" element={<Navigate to="/employee/dashboard" />} />
          <Route path="/employee/dashboard" element={<Employee />} />
          <Route
            path="/employee/employeeAppointment"
            element={<EmployeeAppointment />}
          />
        </Route>
        {/* Redirect root based on login */}
        <Route
          path="/"
          element={
            IsLogin ? <Navigate to="/loading" /> : <Navigate to="/login" />
          }
        />

        {/* Other */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="*" element={<Unauthorized />} />
      </Routes>

      {IsLogin && <Footer />}
    </>
  );
}
export default App;

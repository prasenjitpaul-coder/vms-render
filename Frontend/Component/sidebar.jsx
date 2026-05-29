import React, { useContext } from "react";
import { AuthContext } from "./hooks/AuthContext";

const sidebar = () => {
  const { user, IsLogin } = useContext(AuthContext);
  return (
    <>
      {IsLogin &&
        user?.role ===
          "admin"&&(
            <>
              <div className="SidebarMain">
                <div className="Sidebar">
                  <a href="/admin/dashboard">
                    {" "}
                    <p>Dashboard</p>{" "}
                  </a>
                  <a href="/admin/employee-security">
                    {" "}
                    <p>Employee & Security</p>{" "}
                  </a>
                  <a href="/admin/allApointments">
                    {" "}
                    <p>All appointment</p>{" "}
                  </a>
                </div>
              </div>
            </>
          )}
          {IsLogin &&
        user?.role ===
          "security"&&(
            <>
              <div className="SidebarMain">
                <div className="Sidebar">
                  <a href="/security/dashboard">
                    {" "}
                    <p>Dashboard</p>{" "}
                  </a>
                  <a href="/security/check">
                    {" "}
                    <p>Visitor Check</p>{" "}
                  </a>
                  <a href="/security/allApointments">
                    {" "}
                    <p>All appointment</p>{" "}
                  </a>
                </div>
              </div>
            </>
          )}
          {IsLogin &&
        user?.role ===
          "employee"&&(
            <>
              <div className="SidebarMain">
                <div className="Sidebar">
                  <a href="/employee/dashboard">
                    {" "}
                    <p>Dashboard</p>{" "}
                  </a>
                  
                  <a href="/employee/employeeAppointment">
                    {" "}
                    <p>All appointment</p>{" "}
                  </a>
                </div>
              </div>
            </>
          )}
    </>
  );
};

export default sidebar;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./hooks/AuthContext";

const navbar = () => {
  const [Time, setTime] = useState("");
  const [open, setopen] = useState(false);
  const {setIsLogin,user}= useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  const handleLogout = async () => {
    try {
      const Responce = await fetch("http://localhost:4550/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const json = await Responce.json();
      if (!Responce.ok) {
        if (json.message === "Allready Logout") {
          console.log("User is already logged out");
        } else {
          console.log("logout failed", json);
        }
      }
  setIsLogin(false)
        console.log("Logout successfully", json);
        setTimeout(() => {
          navigate("/login",{replace: true});
        }, 1000);
  
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <>
      <div className="NavbarMain">
        <div className="NavbarLogo">
          <img src="\public\vms.png" alt="" />
        </div>
        <div className="NavbarProfile">
          <div onClick={() => setopen(!open)} className="NavbarBurger">
            <img src="\public\burger-bar.png" alt="" />
          </div>
        </div>
      </div>
      <div className={`NavbarUser ${open ? "open" : ""}`}>
        <div className="clNavbar"></div>
        <div className="UserText">
          <p>{user.username}</p>
          <p>{user.role}</p>
        </div>

        <div className="UserText">{Time}</div>
        <div className="NavbarEmailBox">
          <p>Email:Test@gmail.com</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="clNavbar"></div>
      </div>
    </>
  );
};

export default navbar;

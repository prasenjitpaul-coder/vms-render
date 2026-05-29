import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Reg = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const navigator = useNavigate();
  const handelRegister = async(e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");
    console.log(role);
    try {
      const res = await fetch("http://localhost:4550/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials:"include",
        body: JSON.stringify({username, email, password, role}),
      });
      const data = await res.json();
      if (data.status) {
        setTimeout(() => {
          navigator("/login");
        }, 1000);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <>
      <div className="RegisterMain">
        <div className="RegisterCard">
          <p className="registerP">Register</p>
          <form onSubmit={handelRegister}>
            <div className="RegisterInputfield">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <label htmlFor="">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="RegisterRadioBtn">
              <div className="radioreg">
                <label htmlFor="">Employee</label>
                <input
                  type="radio"
                  name="role"
                  checked={role === "employee"}
                  value={"employee"}
                  onChange={(e) => setrole(e.target.value)}
                  id=""
                />
              </div>
              <div className="radioreg">
                <label htmlFor="">Security</label>
                <input
                  type="radio"
                  name="role"
                  checked={role === "security"}
                  value={"security"}
                  onChange={(e) => setrole(e.target.value)}
                  id=""
                />
              </div>
            </div>
            <button type="submit" className="registerBTN">
              Register
            </button>
          </form>
          <p className="forOldUser">
            Have an account{" "}
            <Link className="Loginlink" to={"/login"}>
              Login
            </Link>{" "}
          </p>
          <p className="forVisitor">
            For{" "}
            <Link className="Visitorlink" to={"/visitor"}>
              Visitor
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Reg;

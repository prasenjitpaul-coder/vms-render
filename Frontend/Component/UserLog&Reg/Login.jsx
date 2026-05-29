import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin, user, setuser, IsLogin, fetchUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const Response = await fetch("http://localhost:4550/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const json = await Response.json();

    if (!Response.ok) {
      console.log("Login Failed");
      console.log(json);
      return;
    }

    if (!json.success) {
      console.log("User Error");
      console.log(json);
      console.log(user);
      return;
    }
    const userData = await fetchUser();
    console.log("Updated user:", userData);


    if (userData.role === "admin") {
      navigate("/admin/dashboard");
    } 
    if (userData.role === "security") {
      navigate("/security/dashboard");
    } 
    if (userData.role === "employee") {
      navigate("/employee/dashboard");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="LoginMain">
        <div className="LoginCard">
          <p className="loginP">Login</p>
          <form onSubmit={handleLogin}>
            <div className="LoginInputFields">
              <label htmlFor="">Email </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name=""
                id=""
              />
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name=""
                id=""
              />
            </div>

            <div className="loginForgetPassword">
              <p>Forget Password?</p>
            </div>
            <button type="submit" className="loginBTN">
              Login
            </button>
          </form>

          <p className="forNewUser">
            New User{" "}
            <Link className="Rigisterlink" to={"/register"}>
              Register
            </Link>
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

export default Login;

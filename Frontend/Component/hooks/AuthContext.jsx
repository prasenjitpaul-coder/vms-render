import React, { useEffect, useState } from "react";
import { createContext } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [IsLogin, setIsLogin] = useState(false);

  const logout = async () => {
    try {
      await fetch("http://localhost:4550/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setuser(null);
      setIsLogin(false);
      setLoading(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // useEffect(() => {
  //   fetch("http://localhost:4550/api/auth/me", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())

  //     .then((data) => {
  //       if (data.success) {
  //         setuser(data.user);
  //         setIsLogin(true);
  //       } else {
  //         setuser(null);
  //         setIsLogin(false);
  //       }
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     })
  //     .catch((error) => {
  //       setuser(null);
  //       setLoading(false);
  //       setIsLogin(false);
  //     });
  // }, []);
  useEffect(() => {
    console.log("Loading state:", Loading);
  }, [Loading]);
   useEffect(() => {
    console.log("User Update:", user);
  }, [user]);
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:4550/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setuser(data.user);
        setIsLogin(true);
        return data.user;
      } else {
        setuser(null);
        setIsLogin(false);
        return null;
      }
    } catch (error) {
      setuser(null);
      setIsLogin(false);
       return null;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    console.log("Login state:", IsLogin);
  }, [IsLogin]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          Loading,
          IsLogin,
          fetchUser,
          setIsLogin,
          setuser,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;

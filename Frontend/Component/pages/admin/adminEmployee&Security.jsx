import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
import UseFetchUser from "../../hooks/useFetchUser.js";
const AdminEmployeeSecurity = () => {
  const [searchname, setsearchname] = useState("");
  const [searchemail, setsearchemail] = useState("");
  const [searchrole, setsearchrole] = useState([]);
  const [users, setUsers] = useState();
  const { UserData, err, setreloaad } = UseFetchUser(
    "http://localhost:4550/api/user/",
  );

  const displayUser = users || UserData;
  const handelSearch = async () => {
    try {
      let query = [];

      if (searchname) query.push(`username=${encodeURIComponent(searchname)}`);
      if (searchemail)
        query.push(`useremail=${encodeURIComponent(searchemail)}`);
      if (searchrole) query.push(`userrole=${encodeURIComponent(searchrole)}`);

      const queryString = query.join("&");

      const res = await fetch(
        `http://localhost:4550/api/user/search?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Backend Error:", errorData);
        return;
      }

      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.log("Frontend Error:", err.message);
    }
  };

  useEffect(() => {
    handelSearch();
  }, [searchname, searchemail, searchrole]);

  const handelDel = async (id,role) => {
     if (role === "admin") {
      alert(`You cannot Delete,${role}`);
      return;
    }
    const res = await fetch(`http://localhost:4550/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error("Failed to delete data");
    }
   
    setreloaad((prev) => !prev);

    console.log(result);
  };
  return (
    <>
      <div className="adminESMain">
        <div className="UserDetails">
          <div className="UserAdd">
            <button
              onClick={() =>
                window.open("http://localhost:5173/register", "_self")
              }
            >
              <img src="\public\edit.png" alt="" />
              Create User
            </button>
          </div>
          <div className="UserInfo">
            <div className="UserSearch">
              <p>No</p>
              <input
                type="text"
                placeholder="UserName"
                value={searchname}
                onChange={(e) => setsearchname(e.target.value)}
              />
              <input
                type="text"
                placeholder="UserEmail"
                value={searchemail}
                onChange={(e) => setsearchemail(e.target.value)}
              />
              <input
                type="text"
                placeholder="UserRole"
                value={searchrole}
                onChange={(e) => setsearchrole(e.target.value)}
              />
              <p>Delete</p>
            </div>
            <div className="UserInfoBoxOuter">
              {Array.isArray(displayUser) &&
                displayUser.map((user, index) => (
                  <div className={`UserInfoBox ${user.role === "admin"?"adminUser":""}`} key={user._id}>
                    <p className="p1">{index + 1}</p>
                    <p className="p2">{user.username}</p>
                    <p className="p3">{user.email}</p>
                    <p className="p4">{user.role}</p>
                    <p className="p5" onClick={() => handelDel(user._id, user.role)}>
                      <img src="/public/delete.png" alt="" />
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEmployeeSecurity;

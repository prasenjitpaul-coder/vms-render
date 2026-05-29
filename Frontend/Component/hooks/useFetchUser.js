import { useEffect, useState } from "react";

const UseFetchUser = (URL) => {
  const [UserData, setUserData] = useState([]);
  const [relod, setreloaad] = useState(false);
//   const [Loading, setLoading] = useState(false);
  const [err, seterr] = useState(null);
  useEffect(() => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error!! Could Not Fetch Items From DataBase");
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data.user);
      })
      .catch((error) => {
        seterr(error.message);
      });
  },[URL,relod]);
  return {UserData, err, setreloaad}
};
export default UseFetchUser;

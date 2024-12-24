import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import axios from "axios";
import { SetIsLoggedInContext } from "../App";

export default function Home() {
  const SetIsLoggedIn = useContext(SetIsLoggedInContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    axios
      .post("http://localhost:500/api/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          SetIsLoggedIn(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Error logging out: ", err);
      });
  };
  //access user information only if the state is defined
  console.log(location);
  const user = location.state?.user;
  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
      <div>{`Hello ${user && user.firstName}`}</div>
    </>
  );
}

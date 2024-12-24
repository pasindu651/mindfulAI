import React, { useContext } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { SetIsLoggedInContext } from "../App";
import axios from "axios";

export const Logout = () => {
  const navigate = useNavigate();
  const SetIsLoggedIn = useContext(SetIsLoggedInContext);
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
  return <Button onClick={handleLogout}>Logout</Button>;
};

import React, { useContext } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { SetIsLoggedInContext, UserContext } from "../App";
import axios from "axios";

export const Logout = () => {
  const navigate = useNavigate();
  const SetIsLoggedIn = useContext(SetIsLoggedInContext);
  const { setUser } = useContext(UserContext);
  const handleLogout = () => {
    axios
      .post("https://mindfulai.onrender.com/api/logout", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          document.cookie =
            "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          SetIsLoggedIn(false);
          setUser(null);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Error logging out: ", err);
      });
  };
  return (
    <div>
      <Button icon="pi pi-sign-out" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

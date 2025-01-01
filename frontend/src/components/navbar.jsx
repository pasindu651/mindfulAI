import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Logout } from "./logout";
import { IsLoggedInContext } from "../App";
import { Avatar } from "primereact/Avatar";
import { UserContext } from "../App";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";

export default function navbar() {
  const { user, setUser } = useContext(UserContext); // Access user from context
  const IsLoggedIn = useContext(IsLoggedInContext);
  return (
    <nav className="p-d-flex p-ai-center p-jc-between p-p-3 p-shadow-2">
      {IsLoggedIn ? (
        <>
          <div className="p-d-flex p-ai-center p-flex-column p-sm-flex-row p-gap-3 p-w-full p-jc-end">
            <div className="absolute top-0 right-0 m-4">
              <div className="flex gap-2 align-items-center">
                <Logout />
                <Avatar
                  className="flex bg-primary"
                  label={user.firstName.substring(0, 1)} // first letter of first name
                  shape="circle"
                  size="large"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="p-d-flex p-ai-center">
            <Link to="/" className="p-mr-3">
              <Button label="Home" className="p-button-text" />
            </Link>

            <Link to="/register" className="p-mr-3">
              <Button label="Register" className="p-button-text" />
            </Link>

            <Link to="/login">
              <Button label="Login" className="p-button-text" />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

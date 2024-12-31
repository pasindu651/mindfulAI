import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Logout } from "./logout";
import { IsLoggedInContext } from "../App";
import { Avatar } from "primereact/Avatar";
import { UserContext } from "../App";

export default function navbar() {
  const { user, setUser } = useContext(UserContext); // Access user from context
  const IsLoggedIn = useContext(IsLoggedInContext);
  return (
    <nav>
      {IsLoggedIn ? (
        <>
          <div className="absolute top-0 right-0 m-4">
            <div className="flex gap-2 align-items-center">
              <Logout />
              <Avatar
                className="flex bg-primary"
                label={user.firstName.substring(0, 1)} //first letter of first name
                shape="circle"
                size="large"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>

          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

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
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      {IsLoggedIn ? (
        <>
          <div className="flex items-center gap-4">
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
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:flex gap-4">
            <Link
              to="/"
              className="text-dark-500 hover:text-primary no-underline"
            >
              Home
            </Link>

            <Link
              to="/register"
              className="text-dark-500 hover:text-primary no-underline"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-dark-500 hover:text-primary no-underline"
            >
              Login
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

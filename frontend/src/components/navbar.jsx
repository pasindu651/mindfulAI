import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Logout } from "./logout";
import { IsLoggedInContext } from "../App";

export default function navbar() {
  const IsLoggedIn = useContext(IsLoggedInContext);
  return (
    <nav>
      {IsLoggedIn ? (
        <Logout />
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

import React from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  //access user information only if the state is defined
  const user = location.state?.user;
  return <div>{user ? `Hello ${user.firstName}` : "Home"}</div>;
}

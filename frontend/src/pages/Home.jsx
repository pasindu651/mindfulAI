import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import axios from "axios";
import { UserContext } from "../App";
import { IsLoggedInContext } from "../App";
import { Calendar } from "../components/calendar";

export default function Home() {
  const { user, setUser } = useContext(UserContext); // Access user from context
  const IsLoggedIn = useContext(IsLoggedInContext);
  //access user information only if the state is defined
  console.log(user);
  return (
    <>
      {IsLoggedIn && <Calendar />}
      <div>{`Hello ${user ? user.firstName : ""}`}</div>
    </>
  );
}

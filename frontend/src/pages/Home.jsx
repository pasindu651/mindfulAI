import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import axios from "axios";
import { UserContext } from "../App";
import { IsLoggedInContext } from "../App";
import { TasksWithCalendar } from "../components/TasksWithCalendar";

export default function Home() {
  const { user, setUser } = useContext(UserContext); // Access user from context
  const IsLoggedIn = useContext(IsLoggedInContext);
  //access user information only if the state is defined
  console.log(user);
  return (
    <>
      <div>{`Hello ${user ? user.firstName : ""}`}</div>

      {IsLoggedIn && <TasksWithCalendar />}
    </>
  );
}

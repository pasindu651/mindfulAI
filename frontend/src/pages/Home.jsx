import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import axios from "axios";
import { UserContext } from "../App";
import { IsLoggedInContext } from "../App";
import { TasksWithCalendar } from "../components/taskswithcalendar";
import { LandingPage } from "../components/LandingPage";
import { PrimeReactContext } from "primereact/api";

export default function Home() {
  const { user, setUser } = useContext(UserContext); // Access user from context
  const IsLoggedIn = useContext(IsLoggedInContext);
  //access user information only if the state is defined
  console.log(user);
  return (
    <>
      <div className="flex justify-content-center align-items-center m-3">
        {user ? (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Hello, {user.firstName}
          </h2>
        ) : (
          <LandingPage />
        )}
      </div>

      {IsLoggedIn && <TasksWithCalendar />}
    </>
  );
}

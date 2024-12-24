import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IsLoggedInContext, SetIsLoggedInContext } from "../App";

export default function Login() {
  const SetIsLoggedIn = useContext(SetIsLoggedInContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:500/api/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          axios
            .get("http://localhost:500/api/user", {
              withCredentials: true,
            })
            .then((response) => {
              if (response.data.user) {
                SetIsLoggedIn(true);
                console.log(response.data.user);
                //send data to frontend using state
                navigate("/", { state: { user: response.data.user } });
              }
            });
        } else {
          console.log(result.data.success);
          alert(result.data.message || "Login failed");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          alert(`Login failed: ${err.response.data.message}`);
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      });
  };
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <div className="flex justify-content-center">
        <div className="flex flex-column max-w-max">
          <div className="flex align-items-center justify-content-center m-2">
            <h1>Login</h1>
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <div className="flex flex-column gap-2">
              <label htmlFor="email">Email</label>
              <InputText
                value={data.email}
                id="email"
                placeholder="Enter your email..."
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center h-4rem  m-2">
            <div className="flex flex-column gap-2">
              <label htmlFor="password">Password</label>
              <Password
                value={data.password}
                id="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center h-4rem m-2">
            <Button
              onClick={handleSubmit}
              className="justify-content-center w-full"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

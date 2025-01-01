import React, { useContext, useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IsLoggedInContext, SetIsLoggedInContext, UserContext } from "../App";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";

export default function Login() {
  const toast = useRef(null);

  const SetIsLoggedIn = useContext(SetIsLoggedInContext);
  const IsLoggedIn = useContext(IsLoggedInContext);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://mindfulai.onrender.com/api/login",
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
            .get("https://mindfulai.onrender.com/api/user", {
              withCredentials: true,
            })
            .then((response) => {
              console.log(response);
              if (response.data.user) {
                setUser(response.data.user);
                SetIsLoggedIn(true);
                navigate("/");
              }
            });
        } else {
          console.log(result.data.success);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: result.data.message,
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: err.response.data.message,
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "An unexpected error occured. Please try again.",
            life: 3000,
          });
        }
      });
  };
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <Toast ref={toast} />

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
                placeholder="Enter your password..."
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
          {!IsLoggedIn && (
            <div className="flex align-items-center justify-content-center h-4rem m-2">
              <div className="flex flex-column gap-2">
                <span
                  className="p-text-primary cursor-pointer"
                  style={{ textDecoration: "none" }}
                  onClick={() => navigate("/register")} // Navigate to the register page
                >
                  Don't have an account? Create one!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

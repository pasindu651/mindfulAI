import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Toast } from "primereact/toast";

export default function Register() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://mindfulai.onrender.com/api/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
      .then((result) => {
        if (result.status == 201) {
          console.log("User created successfully");
          navigate("/login");
        }
        console.log(result);
      })
      .catch((err) => {
        if (err.response && err.response.status == 400) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Email already exists",
            life: 3000,
          });
        } else {
          console.log(err);
        }
      });
  };

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <>
      <Toast ref={toast} />

      <div className="flex justify-content-center">
        <div className="flex flex-column max-w-max">
          <div className="flex align-items-center justify-content-center m-2">
            <h1>Register</h1>
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <div className="flex flex-column gap-2">
              <label htmlFor="firstName">First Name</label>
              <InputText
                value={data.firstName}
                id="firstName"
                placeholder="Enter your first name..."
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <div className="flex flex-column gap-2">
              <label htmlFor="lastName">Last Name</label>
              <InputText
                value={data.lastName}
                id="lastName"
                placeholder="Enter your last name..."
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
              />
            </div>
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
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center h-4rem m-2">
            <Button
              onClick={handleSubmit}
              className="justify-content-center w-full"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

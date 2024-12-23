import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import axios from "axios";

const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post("/", { firstName, lastName, email, password })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

export default function Register() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <>
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
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center h-4rem m-2">
            <Button className="justify-content-center w-full">Register</Button>
          </div>
        </div>
      </div>
    </>
  );
}

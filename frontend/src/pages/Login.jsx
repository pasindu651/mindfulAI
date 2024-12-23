import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function Login() {
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
            <Button className="justify-content-center w-full">Login</Button>
          </div>
        </div>
      </div>
    </>
  );
}

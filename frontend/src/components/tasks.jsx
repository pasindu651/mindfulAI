import React, { useState } from "react";
import { Calendar } from "./calendar";
import { InputTextarea } from "primereact/InputTextarea";
import { Button } from "primereact/button";

export const Tasks = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [value, setValue] = useState("");

  return (
    <>
      <Calendar />

      <div className="flex justify-content-center">
        <div className="flex flex-column max-w-max">
          <div className="flex align-items-center justify-content-center m-2">
            <h1>Plan with AI</h1>
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <div className="flex flex-column gap-2">
              <InputTextarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={5}
                cols={30}
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center h-4rem  m-2">
            <div className="flex flex-column gap-2">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
          <div className="flex align-items-center justify-content-center h-4rem  m-2">
            <div className="flex flex-column gap-2">
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

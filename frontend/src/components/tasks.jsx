import React, { useEffect, useState } from "react";
import { Calendar } from "./calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { TaskInfo } from "./taskInfo";

export const Tasks = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  //Get the number of days in the current month
  const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:500/api/task/create",
        {
          name: data.name,
          dueDay: data.dueDay,
          dueHour: data.dueHour,
          dueMinute: data.dueMinute,
          durationHours: data.durationHours,
          durationMinutes: data.durationMinutes,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status == 201) {
          console.log("Task created successfully");
        }
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hours = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const days = Array.from({ length: numDays }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const [data, setData] = useState({
    name: "",
    dueDay: null,
    dueHour: null,
    dueMinute: null,
    durationHours: null,
    durationMinutes: null,
  });
  const [tasks, setTasks] = useState([]); //store tasks of selected date

  return (
    <>
      <Calendar
        numDays={numDays}
        currentMonth={currentMonth}
        currentYear={currentYear}
        currentDate={currentDate}
        setTasks={setTasks} //pass setTasks function as a prop so calendar can change tasks state
      />
      {tasks ? (
        tasks.map((task) => (
          <TaskInfo
            key={task._id}
            id={task._id}
            name={task.name}
            dueDay={task.dueDay}
            dueHour={task.dueHour}
            dueMinute={task.dueMinute}
            durationHours={task.durationHours}
            durationMinutes={task.durationMinutes}
          />
        ))
      ) : (
        <p>No tasks yet</p>
      )}
      <div className="flex justify-content-center">
        <div className="flex flex-column max-w-max">
          <div className="flex align-items-center justify-content-center m-2">
            <h1>Use AI</h1>
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <div className="flex flex-column align-items-center gap-2">
              <label htmlFor="email" className="text-center">
                Task name
              </label>
              <InputText
                value={data.name}
                id="email"
                placeholder="Enter your task name..."
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <div className="flex flex-column align-items-center gap-2">
              <label htmlFor="name">Expected Duration</label>
            </div>
          </div>
          <div className="flex align-items-center justify-content-center gap-3 m-2">
            <div className="flex flex-column gap-2">
              <Dropdown
                value={data.durationHours}
                onChange={(e) => setData({ ...data, durationHours: e.value })}
                options={hours}
                placeholder="Hours"
                className="w-full md:w-8rem"
              />
            </div>
            <div className="flex flex-column gap-2">
              <Dropdown
                value={data.durationMinutes}
                onChange={(e) => setData({ ...data, durationMinutes: e.value })}
                options={minutes}
                placeholder="Minutes"
                className="w-full md:w-8rem"
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <div className="flex flex-column align-items-center gap-2">
              <label htmlFor="name">Deadline</label>
            </div>
          </div>
          <div className="flex align-items-center justify-content-center gap-3 m-2">
            <div className="flex flex-column gap-2">
              <Dropdown
                value={data.dueDay}
                onChange={(e) => setData({ ...data, dueDay: e.value })}
                options={days}
                placeholder="Day"
                className="w-full md:w-8rem"
              />
            </div>
            <div className="flex flex-column gap-2">
              <Dropdown
                value={data.dueHour}
                onChange={(e) => setData({ ...data, dueHour: e.value })}
                options={hours}
                placeholder="Hours"
                className="w-full md:w-8rem"
              />
            </div>
            <div className="flex flex-column gap-2">
              <Dropdown
                value={data.dueMinute}
                onChange={(e) => setData({ ...data, dueMinute: e.value })}
                options={minutes}
                placeholder="Minutes"
                className="w-full md:w-8rem"
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <Button
              onClick={handleSubmit}
              className="justify-content-center w-full"
            >
              Optimize
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

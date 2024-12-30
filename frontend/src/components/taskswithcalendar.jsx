import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { TaskInfo } from "./taskInfo";
import { Paginator } from "primereact/paginator";

export const TasksWithCalendar = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  //Get the number of days in the current month
  const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const [day, setDay] = useState(currentDate.getDate());
  const [tasks, setTasks] = useState([]); //store tasks of selected date
  const [DesiredTasks, setDesiredTasks] = useState(null); //store the tasks of the day the created task is due
  const [aiTime, setAiTime] = useState({
    Hours: null,
    Minutes: null,
  });
  //given a day, this function fetches the tasks for that day
  const fetchTasks = async (day, updateStateCallback) => {
    axios
      .post(
        "http://localhost:500/api/task/day",
        { day },
        { withCredentials: true }
      )
      .then((response) => {
        updateStateCallback(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTasks(day, setTasks);
  }, [day]); //run when day changes

  useEffect(() => {
    if (aiTime.Hours && aiTime.Minutes) {
      createTask();
    }
  }, [aiTime]); // This effect will run every time aiTime changes

  useEffect(() => {
    if (DesiredTasks) {
      console.log("Desired tasks: ", DesiredTasks);
      axios
        .post(
          "http://localhost:500/api/chat", //JSON.stringify(DesiredTasks)
          {
            prompt: `Here are the tasks for today: ${JSON.stringify(
              DesiredTasks
            )}. 
               The task to be added is: ${JSON.stringify({
                 name: data.name,
                 dueDay: data.dueDay,
                 dueHour: data.dueHour,
                 dueMinute: data.dueMinute,
                 durationHours: data.durationHours,
                 durationMinutes: data.durationMinutes,
               })}.`,
          },
          { withCredentials: true }
        )
        .then((result) => {
          try {
            console.log("ChatGPT called", result);
            const timeString = result.data.data;
            const [resultHours, resultMinutes] = timeString.split(":");
            setAiTime({
              Hours: resultHours,
              Minutes: resultMinutes,
            });
          } catch (error) {
            console.log(error);
          }
        });
    }
  }, [DesiredTasks]);

  const createTask = () => {
    //create task
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
          startHour: aiTime.Hours,
          startMinutes: aiTime.Minutes,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status == 201) {
          console.log("Task created successfully");
          //reset the form once submitted
          setData({
            name: "",
            dueDay: null,
            dueHour: null,
            dueMinute: null,
            durationHours: null,
            durationMinutes: null,
          });
        }
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setDay((event.first + 10) / 10); // the selected day of the month
    setWeekday(dates[first / 10].dayOfWeek); //the selected weekday
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTasks(data.dueDay, setDesiredTasks);
  };

  const hours = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //array of all the days of the month
  const dates = Array.from({ length: numDays }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1); // i+1 ensures days start from 1
    return {
      dayOfWeek: daysOfWeek[date.getDay()], // Get the weekday
      dayOfMonth: i + 1, // Day of the month
    };
  });
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

  const [first, setFirst] = useState((currentDate.getDate() - 1) * 10); //index goes up by 10
  const [rows, setRows] = useState(10);
  const [weekday, setWeekday] = useState(dates[first / 10].dayOfWeek);

  return (
    <>
      <h2>{dates[first / 10].dayOfWeek}</h2>
      <h2>{day}</h2>
      <div className="card">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={numDays * 10}
          onPageChange={onPageChange}
        />
      </div>
      {tasks.length === 0 ? (
        <p>No tasks yet 😔</p>
      ) : (
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

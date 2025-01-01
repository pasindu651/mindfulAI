import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { TaskInfo } from "./taskInfo";
import { Paginator } from "primereact/paginator";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Accordion, AccordionTab } from "primereact/accordion";
import { TaskForm } from "./TaskForm";
import { Toast } from "primereact/toast";

//given a day, this function fetches the tasks for that day
const fetchTasks = async (day, updateStateCallback) => {
  axios
    .post(
      "https://mindfulai.onrender.com/api/task/day",
      { day },
      { withCredentials: true }
    )
    .then((response) => {
      updateStateCallback(response.data.data);
    })
    .catch((error) => {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      });
    });
};

export const TasksWithCalendar = () => {
  const toast = useRef(null);

  const createTask = () => {
    //create task
    axios
      .post(
        "https://mindfulai.onrender.com/api/task/create",
        {
          name: data.name,
          dueDay: data.dueDay,
          dueHour: data.dueHour,
          dueMinute: data.dueMinute,
          suffix: data.suffix,
          durationHours: data.durationHours,
          durationMinutes: data.durationMinutes,
          startHour: aiTime.Hours,
          startMinutes: aiTime.Minutes,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status == 201) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Task Created Successfully",
            life: 3000,
          });
          if (data.dueDay == day) {
            //immediately rerender if the paginator is on the page where the task should be added
            setTasks([
              ...tasks,
              {
                _id: result.data.data,
                name: data.name,
                dueDay: data.dueDay,
                dueHour: data.dueHour,
                dueMinute: data.dueMinute,
                suffix: data.suffix,
                durationHours: data.durationHours,
                durationMinutes: data.durationMinutes,
                startHour: aiTime.Hours,
                startMinutes: aiTime.Minutes,
                done: false,
              },
            ]);
          }

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
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      });
  };

  const handleDelete = async (id) => {
    axios
      .delete(`https://mindfulai.onrender.com/api/task/${id}`)
      .then((result) => {
        if (result.status == 200) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Task Deleted Successfully",
            life: 3000,
          });
          const taskRemoved = tasks.filter((task) => task._id !== id);

          // Update the state with the tasks array excluding the deleted task
          setTasks(taskRemoved);
        }
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      });
  };

  const handleMarkDone = async (id) => {
    axios
      .put(
        `https://mindfulai.onrender.com/api/task/${id}`,
        { done: true },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status == 200) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Task Completed",
            life: 3000,
          });
          //update the task array so that the task that was updated has its 'done' changed to true
          let updatedTasks = tasks.map((task) => {
            if (task._id === id) {
              //if a task with the id is found, mark it as done
              return { ...task, done: true }; //immutable way of changing variable
            }
            return task;
          });
          setTasks(updatedTasks);
        }
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      });
  };
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
          "https://mindfulai.onrender.com/api/chat",
          {
            prompt: `Here are the tasks for today: ${JSON.stringify(
              DesiredTasks
            )}. 
               The task to be added is: ${JSON.stringify({
                 name: data.name,
                 dueDay: data.dueDay,
                 dueHour: data.dueHour,
                 dueMinute: data.dueMinute,
                 suffix: data.suffix,
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
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: error.message,
              life: 3000,
            });
          }
        });
    }
  }, [DesiredTasks]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setDay((event.first + 10) / 10); // the selected day of the month
    setWeekday(dates[first / 10].dayOfWeek); //the selected weekday
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //array of all the days of the month
  const dates = Array.from({ length: numDays }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1); // i+1 ensures days start from 1
    return {
      dayOfWeek: daysOfWeek[date.getDay()], // Get the weekday
      dayOfMonth: i + 1, // Day of the month
    };
  });

  const [data, setData] = useState({
    name: "",
    dueDay: null,
    dueHour: null,
    dueMinute: null,
    suffix: null,
    durationHours: null,
    durationMinutes: null,
  });

  const [first, setFirst] = useState((currentDate.getDate() - 1) * 10); //index goes up by 10
  const [rows, setRows] = useState(10);
  const [weekday, setWeekday] = useState(dates[first / 10].dayOfWeek);

  return (
    <>
      <Toast ref={toast} />

      <h1 className="flex justify-content-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        {dates[first / 10].dayOfWeek + " " + months[currentMonth] + " " + day}
      </h1>
      <div className="card">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={numDays * 10}
          onPageChange={onPageChange}
        />
      </div>
      {tasks.length === 0 ? (
        <h3 className="flex justify-content-center text-gray-400">
          No tasks yet 😔
        </h3>
      ) : (
        tasks
          .filter((task) => task.done === false) //show tasks that are not completed by default
          .map((task) => (
            <TaskInfo
              key={task._id}
              task={task}
              buttons={
                <Button
                  label="Mark Done"
                  icon="pi pi-check"
                  size="small"
                  onClick={() => handleMarkDone(task._id)}
                />
              }
            />
          ))
      )}
      <Accordion activeIndex={0}>
        <AccordionTab header="Completed">
          {tasks
            .filter((task) => task.done === true) //show only completed tasks
            .map((task) => (
              <TaskInfo
                key={task._id}
                task={task}
                buttons={
                  <Button
                    label="Delete"
                    icon="pi pi-trash"
                    size="small"
                    onClick={() => handleDelete(task._id)}
                  />
                }
              />
            ))}
        </AccordionTab>
      </Accordion>
      <TaskForm
        data={data}
        setData={setData}
        fetchTasks={fetchTasks}
        DesiredTasks={DesiredTasks}
        setDesiredTasks={setDesiredTasks}
        numDays={numDays}
      />
    </>
  );
};

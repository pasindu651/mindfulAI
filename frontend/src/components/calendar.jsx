import React, { useEffect } from "react";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import axios from "axios";

export const Calendar = ({
  numDays,
  currentYear,
  currentMonth,
  currentDate,
  setTasks,
}) => {
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

  const [first, setFirst] = useState((currentDate.getDate() - 1) * 10); //index goes up by 10
  const [rows, setRows] = useState(10);
  const [day, setDay] = useState(currentDate.getDate());
  const [weekday, setWeekday] = useState(dates[first / 10].dayOfWeek);

  //given a day, this function fetches the tasks for that day
  const fetchTasks = async (day) => {
    axios
      .post(
        "http://localhost:500/api/task/day",
        { day },
        { withCredentials: true }
      )
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTasks(day);
  }, [day]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setDay((event.first + 10) / 10); // the selected day of the month
    setWeekday(dates[first / 10].dayOfWeek); //the selected weekday
  };

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
    </>
  );
};

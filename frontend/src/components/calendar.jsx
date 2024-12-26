import React from "react";
import { Paginator } from "primereact/paginator";
import { useState } from "react";

export const Calendar = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  //Get the number of days in the current month
  const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  //console.log(currentDate.getDate());

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

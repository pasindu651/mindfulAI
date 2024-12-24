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
  console.log(currentDate.getDate());

  const [first, setFirst] = useState((currentDate.getDate() - 1) * 10); //index goes up by 10
  const [rows, setRows] = useState(10);
  //array of all the days of the month
  const dates = Array.from({ length: numDays }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1); // i+1 ensures days start from 1
    return {
      dayOfWeek: daysOfWeek[date.getDay()], // Get the weekday
      dayOfMonth: i + 1, // Day of the month
    };
  });
  console.log(dates);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="card">
      <Paginator
        first={first}
        rows={rows}
        totalRecords={numDays * 10}
        onPageChange={onPageChange}
      />
    </div>
  );
};

import React from "react";
import "primeicons/primeicons.css";

import { Button } from "primereact/button";
import { Card } from "primereact/Card";
import { Panel } from "primereact/Panel";
import axios from "axios";

//function to add duration time to start time and deal with overflow
function addTime(startHour, startMinute, durationHour, durationMinute) {
  let startTotalMinutes = startHour * 60 + startMinute;
  let durationTotalMinutes = durationHour * 60 + durationMinute;

  let newTotalMinutes = startTotalMinutes + durationTotalMinutes;

  let newHour = Math.floor(newTotalMinutes / 60) % 24;
  let newMinute = newTotalMinutes % 60;

  return { hour: newHour, minute: newMinute };
}

function convertTo12Hour(hour, minute) {
  if (minute === undefined || hour === undefined) {
    return ""; // or some default value
  }
  let newHour = hour % 12 || 12;
  let suffix = hour < 12 ? "AM" : "PM";
  return `${newHour}:${minute.toString().padStart(2, "0")} ${suffix}`;
}

export const TaskInfo = ({ task, buttons }) => {
  return (
    <>
      <div className="flex flex-column md:flex-row align-items-center justify-content-between gap-3 my-3 p-3 border-round shadow-2">
        <Panel header={task.name} className="flex-grow-1 w-full md:w-auto">
          <p className="m-0 text-center md:text-left">
            {convertTo12Hour(task.startHour, task.startMinutes) +
              " to " +
              (() => {
                const endTime = addTime(
                  task.startHour,
                  task.startMinutes,
                  task.durationHours,
                  task.durationMinutes
                );
                console.log(endTime);
                return convertTo12Hour(endTime.hour, endTime.minute);
              })() +
              `(${task.durationHours} hours and ${task.durationMinutes} minutes)`}
          </p>
          <p style={{ marginTop: "1rem" }}>
            Due at: {convertTo12Hour(task.dueHour, task.dueMinute)}
          </p>
        </Panel>
        <div className="flex flex-row md:flex-column gap-2">{buttons}</div>
      </div>
    </>
  );
};

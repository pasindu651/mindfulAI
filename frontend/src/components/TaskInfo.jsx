import React from "react";
import "primeicons/primeicons.css";

import { Button } from "primereact/button";
import { Card } from "primereact/Card";
import axios from "axios";

const handleDelete = async (id) => {
  console.log(id);
  axios.delete(`http://localhost:500/api/task/${id}`).catch((error) => {
    console.log(error);
  });
};

function convertTo12Hour(time) {
  hour, (minute = time.split(":").map(Number));
  newHour = hour % 12 || 12;
  suffix = hour < 12 ? "AM" : "PM";
  return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
}

export const TaskInfo = ({
  id,
  name,
  dueDay,
  dueHour,
  dueMinute,
  durationHours,
  durationMinutes,
  startHour,
  startMinutes,
}) => {
  return (
    <>
      <Card title={name}>
        <p className="m-0">{}</p>
      </Card>
      <div>
        <h3>{name}</h3>
        <p>
          Due on Day {dueDay} at {dueHour}:{dueMinute}
          Completion time: {durationHours}:{durationMinutes}
        </p>
        <Button
          label="Mark Done"
          icon="pi pi-check"
          size="small"
          onClick={() => handleMarkDone(id)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          size="small"
          onClick={() => handleDelete(id)}
        />
      </div>
    </>
  );
};

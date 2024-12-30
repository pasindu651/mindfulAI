import React from "react";
import "primeicons/primeicons.css";

import { Button } from "primereact/button";
import axios from "axios";

const handleDelete = async (id) => {
  console.log(id);
  axios.delete(`http://localhost:500/api/task/${id}`).catch((error) => {
    console.log(error);
  });
};

export const TaskInfo = ({
  id,
  name,
  dueDay,
  dueHour,
  dueMinute,
  durationHours,
  durationMinutes,
}) => {
  return (
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
  );
};

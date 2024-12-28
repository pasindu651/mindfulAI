import React from "react";

export const TaskInfo = ({ id, name, dueDay, dueHour, dueMinute }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>
        Due on Day {dueDay} at {dueHour}:{dueMinute}
      </p>
      <button onClick={() => handleMarkDone(task.id)}>Mark Done</button>
    </div>
  );
};

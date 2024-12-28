import React from "react";

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
      <button onClick={() => handleMarkDone(id)}>Mark Done</button>
    </div>
  );
};

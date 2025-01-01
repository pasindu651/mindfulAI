import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export const TaskForm = ({
  data,
  setData,
  fetchTasks,
  desiredTasks,
  setDesiredTasks,
  numDays,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTasks(data.dueDay, setDesiredTasks);
  };
  const hours = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const days = Array.from({ length: numDays }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  return (
    <>
      <div className="flex justify-content-center">
        <div className="flex flex-column max-w-max">
          <div className="flex align-items-center justify-content-center m-2">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              Create task with AI
            </h1>
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
                options={hours.slice(0, 12)} //get hours 1-12
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
            <div className="flex flex-column gap-2">
              <Dropdown
                value={data.suffix}
                onChange={(e) => setData({ ...data, suffix: e.value })}
                options={["AM", "PM"]} //get hours 1-12
                placeholder="Time of Day"
                className="w-full md:w-8rem"
              />
            </div>
          </div>
          <div className="flex align-items-center justify-content-center m-2">
            <Button
              icon="pi pi-sparkles"
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

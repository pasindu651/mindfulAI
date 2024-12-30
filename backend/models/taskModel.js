import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  dueDay: Number,
  dueHour: Number,
  dueMinute: Number,
  durationHours: Number,
  durationMinutes: Number,
  done: mongoose.SchemaTypes.Boolean,
  user: mongoose.SchemaTypes.ObjectId,
  startHour: Number,
  startMinutes: Number,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;

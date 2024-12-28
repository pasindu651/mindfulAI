import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  dueDay: Number,
  dueHour: Number,
  dueMinute: Number,
  done: mongoose.SchemaTypes.Boolean,
  user: mongoose.SchemaTypes.ObjectId,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;

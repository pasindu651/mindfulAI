import OpenAI from "openai";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import Task from "../models/taskModel.js";
import mongoose from "mongoose";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.user = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
        res.json({ success: true, message: "Success!" });
      } else {
        console.log("wrong password");
        res
          .status(401)
          .json({ success: false, message: "Password does not match!" });
      }
    } else {
      res
        .status(401)
        .json({ success: false, message: "Account does not exist" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName + " " + lastName + " " + email + " " + password);
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: " Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log("Error in create user: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ success: false, message: "Failed to logout" });
      } else {
        res.clearCookie("connect.sid");
        console.log(" destroy successfully and cookie cleared");
        res
          .status(200)
          .json({ success: true, message: "Logged out successfully" });
      }
    });
  } else {
    res.status(400).json({ success: false, message: "No session found" });
  }
};

export const getUser = (req, res) => {
  console.log("HI");
  console.log("DEBUG IN getUser, request", req);
  //if the session is successfully created, send user information to frontend
  if (req.session.user) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
};

export const chat = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);

    const systemMessage = {
      role: "system",
      content: `
      You are a task scheduler. You will be provided with a list of existing tasks, including their start times, durations, and due times with the suffix AM/PM. Your goal is to find the optimal start time for a new task.
    
      Your response should only include the optimal start time in 24-hour format (Hour:Minute) with no spaces. You should schedule tasks to avoid overlaps if possible. However, if avoiding overlaps is not feasible, schedule the new task earlier or later to minimize conflicts while still respecting the task's due time and duration.
    
      Here’s how you should handle the input:
      - Attempt to schedule the new task without conflicts, ensuring it does not overlap with any existing tasks.
Overlap occurs when the new task's start time and duration result in an end time that falls within the duration of an existing task, or if the new task's start time itself falls within the duration of another task.
      - Overlap occurs when the new task's start time and duration result in an end time that falls within the duration of an existing task, or if the new task's start time itself falls within the duration of another task.
      - Consider two existing tasks: 
          1. Task one starts at 9:30 and has a duration of 2 hours 30 minutes. The end time for task one is calculated as 9:30 + 2:30 = 12:00.
          2. Task two starts at 11:00 and has a duration of 2 hours 30 minutes. The end time for task two is calculated as 11:00 + 2:30 = 13:30.
          To check for overlaps:
            - Task two’s start time (11:00) falls within the duration of task one, which is 9:30 to 12:00.
            - Similarly, task one’s end time (12:00) falls within the duration of task two, which is 11:00 to 13:30.
      Thus, the two tasks overlap, as the time intervals 9:30 to 12:00 and 11:00 to 13:30 intersect.
When scheduling a new task, ensure that its start time and end time do not fall within the time interval of any existing task.
      - If no conflict-free times are available, prioritize scheduling it earlier or later, minimizing the overlap and ensuring the task still fits within its due time and duration.
    
      Example:
      - Task 1: Start at 10:00, Duration: 2 hours
      - Task 2: Start at 12:00, Duration: 3 hours 40 minutes
      - Task 3: Start at 15:20, Duration: 3 hours 20 minutes
    
      If a new task must be scheduled but there is no conflict-free slot, adjust its start time earlier or later to ensure it fits best with minimal disruption.
    
      Remember:
      - Return **only** the time in the format Hour:Minute.
      - Minimize overlap if avoiding it completely is not possible.
      - Ensure the task still respects its due time and duration.
    
      You are not allowed to return anything other than the optimal start time.
      `,
    };

    const userMessage = {
      role: "user",
      content: prompt,
    };

    const messages = [systemMessage, userMessage];
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages, //has role and content
      response_format: {
        type: "text",
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res
      .status(200)
      .json({ success: true, data: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

export const createTask = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      dueDay,
      dueHour,
      dueMinute,
      suffix,
      durationHours,
      durationMinutes,
      startHour,
      startMinutes,
    } = req.body;
    if (req.session) {
      const newTask = await new Task({
        name,
        dueDay,
        dueHour,
        dueMinute,
        suffix,
        durationHours,
        durationMinutes,
        startHour,
        startMinutes,
        done: false,
        user: req.session.user.id,
      });
      await newTask.save();
      res.status(201).json({ success: true, data: newTask._id });
    } else {
      res.status(400).json({ success: false, message: "Not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

//given a certain date, fetch all the tasks for that date

export const getDayTask = async (req, res) => {
  try {
    if (req.session) {
      const { day } = req.body;
      const tasks = await Task.find({ user: req.session.user.id, dueDay: day });
      res.status(200).json({ success: true, data: tasks });
    } else {
      res.status(401).json({ success: false, message: "Not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Task Id" });
  }
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    console.log("Error in deleting products", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Task Id" });
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
    res.status(200).json({ success: true, data: updateTask });
  } catch (error) {
    console.log("Error in updating products", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

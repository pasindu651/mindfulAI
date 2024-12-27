import OpenAI from "openai";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import Task from "../models/taskModel.js";

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

    const systemMessage = {
      role: "system",
      content:
        "You are a task scheduler. Given a task name, deadline, and expected duration, calculate the optimal time to start the task, ensuring it fits before the deadline.",
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
  try {
    const { name, dueDay, dueTime } = req.body;
    if (req.session) {
      const newTask = await new Task({
        name,
        dueDay,
        dueTime,
        done: false,
        user: req.session.user.id,
      });
      await newTask.save();
      res
        .status(201)
        .json({ success: true, message: "Task created successfully" });
    } else {
      res.status(400).json({ success: false, message: "Not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

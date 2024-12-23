import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 500;

app.post("/api/register", async (req, res) => {
  const user = req.body;
  if (!user.firstName || !user.lastName || !user.email || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newUser = await new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log("Error in create user: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

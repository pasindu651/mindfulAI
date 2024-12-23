import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import cors from "cors";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 500;

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
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
});

app.post("/api/register", async (req, res) => {
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
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

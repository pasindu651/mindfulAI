import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

//configure session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "651pmd",
    resave: false,
    saveUninitialized: true,
    //create session collection in database
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    //cookie will last a day
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

const PORT = process.env.PORT || 500;

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.user = {
          id: user.id_,
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

app.post("/api/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ success: false, message: "Failed to logout" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Logged out successfully" });
      }
    });
  } else {
    res.status(400).json({ success: false, message: "No session found" });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

app.get("/api/user", (req, res) => {
  //if the session is successfully created, send user information to frontend
  if (req.session.user) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

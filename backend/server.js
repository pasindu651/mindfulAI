import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import session from "express-session";
import routes from "./routes/routes.js";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const MongoStore = new connectMongo(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use a strong secret
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection, // Use the mongoose connection
      collection: "sessions", // Custom collection for storing sessions
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set secure cookies in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use("/api", routes);

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import session from "express-session";
import Memorystore from "memorystore";

import MongoStore from "connect-mongo";
import routes from "./routes/routes.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const MemoryStore = Memorystore(session);

app.use(
  session({
    store: new MemoryStore({
      checkPeriod: 86400000, // Optional: Time interval (in ms) to check for expired sessions
    }),
    secret: process.env.SESSION_SECRET, // Your session secret
    resave: false, // Don't resave session if it hasn't changed
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      httpOnly: true, // Prevent access to cookies via JavaScript
      maxAge: 3600000, // Session cookie expiration time (1 hour)
    },
  })
);

app.use("/api", routes);

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

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

//configure session middleware
app.use(
  session({
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

app.use("/api", routes);

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

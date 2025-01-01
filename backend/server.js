import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes/routes.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

//configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "125amd",
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

app.use("/api", routes);

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

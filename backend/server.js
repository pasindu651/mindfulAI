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

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173", // Local development
  "https://enchanting-malasada-228ebc.netlify.app", // Netlify deployment
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from allowed origins or no origin (e.g., Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies/session headers
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
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      httpOnly: true, // Prevent client-side access to the cookie
      sameSite: "none", // Allow cross-origin requests (important for cross-domain cookies)
    },
  })
);

app.use("/api", routes);

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

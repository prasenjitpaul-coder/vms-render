import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Userroute from "./routes/userRoute.js";
import Visitorroute from "./routes/visitorRoute.js";
import UserDetailsRoute from "./routes/userDetails.js"

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", UserDetailsRoute)
app.use("/api/auth", Userroute)

app.use("/api/v", Visitorroute)
export default app
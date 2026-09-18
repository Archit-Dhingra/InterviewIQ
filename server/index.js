import express from 'express';
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookiesParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from './routes/interview.route.js';
import paymentRouter from './routes/payment.route.js';
dotenv.config();

const app = express();

const allowedOrigins = [
    "https://interviewiq-ai-eiwd.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".onrender.com")) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true
}));

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});

app.get("/", (req, res) => {
    res.status(200).send("InterviewIQ Server is running");
});

app.use(express.json());
app.use(cookiesParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
    connectDb();
});
import express from "express";
import cors from "cors";
import { config } from "dotenv"; // instead of importing all of dotenv
import { dbConnect } from "./config/mongoose.config.js";
import userRouter from "./routes/user.routes.js"
import quizRouter from "./routes/quiz.routes.js";
import uploadRouter from "./routes/upload.js";
import cookieParser from "cookie-parser";
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json(), cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json())
app.use(cookieParser())
app.use("/v1/user", userRouter);
app.use("/v1/quiz", quizRouter);
app.use("/v1/upload", uploadRouter);

// ⬇️ This line serves files from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

config(); // instead of dotenv.config
const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () => {
    console.log("port:", PORT);
});

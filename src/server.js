import express from "express";
import { config } from "dotenv";
import ConnectToDb from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import auth from "./middlewares/auth.js";
import cors from "cors";
config();
const app = express();
const port = process.env.PORT;
const db_uri = process.env.DB_URI;

app.use(cors({ origin: process.env.FRONTEND_URL, Credentials: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("this is a home route");
});
app.use("/users", userRouter);
app.use("/tasks", auth, taskRouter);

app.listen(port, async () => {
  try {
    await ConnectToDb(db_uri);
    console.log("connected to database successfully");
    console.log(`server is running at port ${port}`);
  } catch (err) {
    console.log(err);
  }
});

import { Router } from "express";
import taskModel from "../models/taskModel.js";
import role from "../middlewares/role.js";

const taskRouter = Router();

taskRouter.get("", role(["manager"]), async (req, res) => {
  const todos = await taskModel.find();

  res.json({ todos: todos });
  try {
  } catch (err) {
    res.status(500).send(err);
  }
});

taskRouter.get("/member", role(["member"]), async (req, res) => {
  const todos = await taskModel.find({user_id:req.result.id});
  res.json({ todos: todos });
  try {
  } catch (err) {
    res.status(500).send(err);
  }
});

taskRouter.post("", async (req, res) => {
  const { title, desc } = req.body;
  try {
    const tasks = new taskModel({ title, desc, user_id: req.result.id });
    await tasks.save();

    res.status(201).json({ message: "task is created successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

taskRouter.patch("", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err);
  }
});

taskRouter.delete("", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err);
  }
});

export default taskRouter;

import { Router } from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  console.log("user register route");
  try {
    if (!userName || !email || !password) {
      res.status(400).json({ message: "this is a not a valid body." });
    }

    // we have to check is email is present or not
    const existUser = await userModel.findOne({ email: email });

    if (existUser) {
      res
        .status(400)
        .json({ message: "this emial is already registered try to login." });
    }

    const hashPassword = bcrypt.hashSync(password, 12);

    const user = new userModel({ email, password: hashPassword, userName });
    await user.save();
    res.status(201).json({ message: "user is registered successfully" });

    // -> case-1 this  email is already present
    // case-2 -> this email is new.

    //->
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "this is a not a valid body." });
    }

    const existUser = await userModel.findOne({ email: email });

    if (!existUser) {
      res
        .status(400)
        .json({ message: "this email is not registered try to register." });
    }

    //now we have to compare the password

    bcrypt.compare(password,existUser.password, (err, result) => {
      if (err) console.log(err);

      if (result) {
        const payload = { email: existUser.email, id: existUser._id };
        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
          if (err) console.log(err);
          return res.status(200).json({ accessToken: token });
        });
      } else {
        return res.status(400).json({
          message: "user information is not correct try to check your detials",
        });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.get("/logout", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err);
  }
});

export default userRouter;

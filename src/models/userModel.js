import { Schema, model } from "mongoose";

const userSchema = new Schema({
  role: {
    type: String,
    enum: ["admin", "managers", "members"],
    default: "members",
  },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = model("users", userSchema);

export default userModel;

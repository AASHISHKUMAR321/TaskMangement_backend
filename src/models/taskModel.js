import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    user_id: { type: Schema.Types.ObjectId, ref: "users" },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    compltedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const taskModel = model("tasks", taskSchema);

export default taskModel;

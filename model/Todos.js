import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ToDo = mongoose.model("todo", todoSchema);

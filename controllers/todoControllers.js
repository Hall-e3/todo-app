import mongoose from "mongoose";
import { ToDo } from "../model/Todos.js";

export const getTodos = async (req, res, next) => {
  try {
    const todos = await ToDo.find();
    res.send(todos);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  const { name, isCompleted } = req.body;
  const newTodo = new ToDo({ name, isCompleted });
  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, isCompleted } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No todos with id: ${id}`);

    const updatedTodo = await ToDo.findByIdAndUpdate(
      id,
      { name, isCompleted },
      {
        new: true,
      }
    );
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No todos with id: ${id}`);
    await ToDo.findByIdAndDelete(id);
    res.json("Todo is deleted successfully");
  } catch (error) {
    next(error);
  }
};

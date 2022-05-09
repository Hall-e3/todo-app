import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../../controllers/todoControllers.js";
const router = express.Router();

router.get("", getTodos);
router.post("", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;

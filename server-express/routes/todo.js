//todo.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { models } = require("mongoose");
const Todo = require("../models/Todo");
const privateKey = ``;
router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    completed: req.body.completed,
    dateCompleted: req.body.dateCompleted,
  });
  return todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        id: savedTodo._id,
        title: savedTodo.title,
        description: savedTodo.description,
        author: savedTodo.author,
        dateCreated: savedTodo.dateCreated,
        completed: savedTodo.completed,
        dateCompleted: savedTodo.dateCompleted,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res, next) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todos: todos });
});

router.delete("/:id", async function (req, res) {
  const todoId = req.params.id;
  const userId = req.payload.id; 

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    if (todo.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this todo." });
    }

    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({ message: "Todo successfully deleted." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async function (req, res) {
  const todoId = req.params.id;
  const userId = req.payload.id;
  const { completed } = req.body;
  let updateData = {
    completed: completed
  };

  // If the todo is being marked as completed, set the dateCompleted
  if (completed) {
    updateData.dateCompleted = new Date();
  } else {
    updateData.dateCompleted = null;
  }

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    if (todo.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this todo." });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, updateData, { new: true });
    return res.status(200).json({
      id: updatedTodo._id,
      title: updatedTodo.title,
      description: updatedTodo.description,
      author: updatedTodo.author,
      dateCreated: updatedTodo.dateCreated,
      completed: updatedTodo.completed,
      dateCompleted: updatedTodo.dateCompleted
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;
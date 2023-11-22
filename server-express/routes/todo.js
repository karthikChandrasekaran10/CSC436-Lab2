//todo.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { models } = require("mongoose");
const Todo = require("../models/Todo");
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAkzN1PG1FPWNEKDUI9conSDTeHrMq4HDaxbOiuip8RZKmkZsh
vnS5K2960oOddEHrMw0IEC7zfNARfCieZyLgg9xO/ecffiw+FQHLYj/NGD6jgQek
fxYIA5+dhNe0aTHAxC1PWue3O8jNgWGNooKpAH38WeDugk8Hchl3nrIg6CzRXRb5
QF/0mQPUrPrK31uJaTGQy5Veq7N7z5ynOYQzsxF36oGDL/xKD+0KSauSaVh4xLZz
/q2LnkRJ67ULQWkTB4pJ83srkkyB1+yVQjS/nz75nwp7TW1EEydASVpz2ad58tlA
NxOnm/HDdkUzeffIr987BRXHH+vZj+fDGMlJoQIDAQABAoIBAHOEAE6JWbrQ+Z2r
8PohyC3r/xuMcutq5OQdEmiSCq/2Y+0EFrkFlIK3m2U0kA255T9MzLUWg1HBXtdW
cOhzAEm6S+sIwzgatCV8IQVbGDIchect/jMVMPjW+6BSPmwG9UV+YTXvfWXXMR6F
VcbgTovqUmyeDc4JAsjRn4PUOeq4f+yRAgqalrECwp4bOgqVflAtfKTN5ibIDjo1
3tCHqy6x1mXZdpyiPHvSfBerZPX3TJRhOLa/7yWpyWPqLvDDM/k9xC8hWqhf1ggL
5OFaEvIW0L6rKW+YZ8QEEVoY+WKLTuYkzE/bOFcbQ9ESzSnWGrAh51n/qOi772F3
pJFZKSECgYEAzaj0bIDhFnNvH4Dcfoj3s0BKTpb6xTMEHr+Ieez9C6C7vlUWnz+t
6hpjHUfQDciiiTV3TKdWbCtxj+nKHwiFx9+OV13+i0we1xJylNr/XIylKWi+gfo9
1WsSexWP/lxBP3SSAqxgOmJ4JwROGcCLDchiBxVs3rPDu0RwT6y2Op0CgYEAtzta
Vg4/p75B/btnzBq9gl4qQ3VZr7K7s/skct/YATlsljbQLtyUnR03N8AvYNJi4Ey5
/IYOpiAj0So6jP7Jw7t5EYKxjKTH7A8Gy2KVpKMnFaSNTMlGjTUMeIQWqMMNj0FX
8W4w+MGOQ4NS/I1bOeH2ALd8sSYY4t1gQ80XCdUCgYBV35d3+vSBsF+VEvR+rWho
Y47jc+1wDBZLVISDDK64fTwHhHX2tttCphP+tO6t4rnjevy+eB0A+77mbaNlA+UA
iVthJbFUrsst2NkZSLxaA6wvNzpdAYVyKMxFssI2XoUsHtuc3CcuGdG70PNfk2M8
tRAhjxOvhfZTqocO7boFjQKBgQC0v8bwRyQCDAu7CYht7h7toIhefT+Ys164P9EH
xMqnAoeccrvQzmWHy08yHtJd14wUKXv6oB+JPwE2D0ss1RYhkCjw3hTZYZ+ZvIT+
UuS9QPiIQAfnLFH9b8w6gkp79dXFcDcZgZKrgPwem0hcu/C227E5qcdGVQeNm8Wf
fIvydQKBgQCPSuFfuJezQ9Jefob+BpthVvGPbqIkSdCvhuLj/wZm3OAN1WmEKEa3
99AWvTkWFLKXUwuYf8dUamfZ9md4heiQPzXNHefEOj2QJleBiw/s6fDU5ClBJYM0
wLhWWtAnaNj4KJNwm+bUp/IR5jSVpe1M+Xi99jTu5fRumRWeYPiTvA==
-----END RSA PRIVATE KEY-----
`;
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
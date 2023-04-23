var express = require("express");
var router = express.Router();
var Task = require("../models/tasks");

router.get("/", async (req, res, next) => {
    try {
        const tasks = await Task.find();
        console.log(tasks);
        res.render("tasks", { tasks: tasks });
    } catch (err) {
        console.error(err);
    }
});

router.post("/", async (req, res, next) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        const newTask = await task.save();
    } catch (err) {
        console.error(err);
    }
    res.redirect("/tasks");
});

const getTaskByID = async (req, res, next) => {};

module.exports = router;

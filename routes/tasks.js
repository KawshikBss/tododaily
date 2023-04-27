var express = require("express");
var router = express.Router();
var Task = require("../models/tasks");

router.get("/", async (req, res, next) => {
    try {
        var user = req.user;
        const tasks = await Task.find({ user_id: user.id });
        res.render("tasks", { user: user, tasks: tasks });
    } catch (err) {
        console.error(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        var user = req.user;
        const task = new Task({
            user_id: user.id,
            title: req.body.title,
            description: req.body.description,
        });
        const newTask = await task.save();
    } catch (err) {
        console.error(err);
    }
    res.redirect("/tasks");
});

const getTaskByID = async (req, res, next) => {};

module.exports = router;

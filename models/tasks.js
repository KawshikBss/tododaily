var mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Task", tasksSchema);

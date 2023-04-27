var mongoose = require("mongoose");

var usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model("User", usersSchema);

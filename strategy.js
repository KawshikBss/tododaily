var LocalStrategy = require("passport-local");
var User = require("./models/users");
var bcrypt = require("bcrypt");

var strategy = new LocalStrategy(async (username, password, cb) => {
    try {
        var user = await User.findOne({ username: username });
        if (!user) {
            return cb(null, false, {
                message: "Incorrect username or password.",
            });
        }
        var validUser = await bcrypt.compare(password, user.password);
        if (!validUser) {
            return cb(null, false, {
                message: "Incorrect username or password.",
            });
        }
        return cb(null, user);
    } catch (err) {
        return cb(err);
    }
});

module.exports = strategy;

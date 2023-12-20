const { default: mongoose, Schema } = require("mongoose");

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('User', UserSchema);
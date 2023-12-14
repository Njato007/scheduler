const { default: mongoose, Schema } = require("mongoose");

const CalendarSchema = new Schema({
    name: String,
    color: String,
    backgroundColor: String,
    dragBackgroundColor: String,
    borderColor: String,
    isChecked: {
        type: Boolean,
        default: true
    },
    owner: String
});

module.exports = mongoose.model('Calendar', CalendarSchema);
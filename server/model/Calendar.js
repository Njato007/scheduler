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
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Calendar', CalendarSchema);
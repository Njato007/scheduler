const { default: mongoose, Schema } = require("mongoose");

const EventSchema = new Schema({
    calendarId: String,
    title: String,
    location: String,
    start: String,
    end: String,
    isAllday: {
        type: Boolean,
        default: false
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: 'time'
    },
    attendees: {
        type: Array,
        default: []
    },
    state: String,
    owner: String
});

module.exports = mongoose.model('CalendarEvent', EventSchema);
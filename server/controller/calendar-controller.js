const Calendar = require("../model/Calendar");
const CalendarEvent = require("../model/CalendarEvent");

const getCalendars = async (req, res) => {
    Calendar.find()
    .then(events => {
      res.json(events);
    }).catch(err => {
      console.log('Error while Getting calendar data:', err);
      res.status(500)
      .json({
        message: 'Failed to retrieve calendar data',
        ok: false
      });
    });
};


// save an event
const addCalendar = async (req, res) => {
    try {
      const savedCalendar = await Calendar.create(req.body);
      res.json({
        calendar: savedCalendar,
        ok: true
      });
    } catch (err) {
      console.log('Error while trying to create calendar data:', err);
      res.status(500)
      .json({
        message: 'Failed to create a calendar',
        ok: false
      });
    }
};


const udpateCalendar = async (req, res) => {
  const calendarId = req.params.id;
  try {
      const updatedCalendar = await Calendar.findByIdAndUpdate(calendarId, req.body, { new: true });
      res.json({
        calendar: updatedCalendar,
        ok: true
      });
  } catch (err) {
      console.log('Error while trying to update calendar:', err);
      res.status(500)
      .json({
        message: 'Failed to update a calendar',
        ok: false
      });
  }
};


const deleteCalendar = async (req, res) => {
  const calendarId = req.params.id;
  try {
    // delete events within calendar
    const deletedeEvents = await CalendarEvent.deleteMany({calendarId: calendarId }, { new: true });
    const deleted = await Calendar.findByIdAndDelete(calendarId, { new: true });
    
    res.json({
      deletedCalendar: deleted,
      deletedeEvents: deletedeEvents,
      ok: deleted !== null
    });
    
  } catch (err) {
    console.log('Error while trying to delete calendar:', err);
    res.status(500)
    .json({
      message: 'Failed to delete a calendar',
      ok: false
    });
  }
};

module.exports = { getCalendars, addCalendar, udpateCalendar, deleteCalendar };
const CalendarEvent = require("../model/CalendarEvent");

const getEvents = async (req, res) => {

  CalendarEvent.find()
  .then(events => {
    res.json(events);
  }).catch(err => {
    console.log('Error while Getting data:', err);
    res.status(500)
    .json({
      message: 'Failed to retrieve events data',
      ok: false
    });
  });
};

// save an event
const addEvent = async (req, res) => {
  try {
    const savedEvent = await CalendarEvent.create(req.body);
    res.json({
      event: savedEvent,
      ok: true
    });
  } catch (err) {
    console.log('Error while Posting data:', err);
    res.status(500)
    .json({
      message: 'Failed to create an event',
      ok: false
    });
  }
};

const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    try {
        
        const updatedEvent = await CalendarEvent.findByIdAndUpdate(eventId, req.body, { new: true });
        res.json({
        event: updatedEvent,
        ok: true
        });

    } catch (err) {
        // console.log('Error while trying to update data:', err);
        res.status(500)
        .json({
        message: 'Failed to update an event',
        ok: false
        });
    }
};


const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    
    const deleted = await CalendarEvent.findByIdAndDelete(eventId, { new: true });
    res.json({
      event: deleted,
      ok: deleted !== null
    });
    
  } catch (err) {
    console.log('Error while trying to delete data:', err);
    res.status(500)
    .json({
      message: 'Failed to delete an event',
      ok: false
    });
  }
};

module.exports = { getEvents, addEvent, updateEvent, deleteEvent };
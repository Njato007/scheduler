const express = require('express');
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controller/event-controller');

const EventRouter = express.Router();

EventRouter.route('/').get(getEvents);
EventRouter.route('/add').post(addEvent);
EventRouter.route('/update/:id').put(updateEvent);
EventRouter.route('/delete/:id').delete(deleteEvent);

module.exports = EventRouter;
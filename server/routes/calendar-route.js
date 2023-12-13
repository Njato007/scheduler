const express = require('express');
const { getCalendars, addCalendar, deleteCalendar, udpateCalendar } = require('../controller/calendar-controller');

const CalendarRouter = express.Router();

CalendarRouter.route('/').get(getCalendars);
CalendarRouter.route('/add').post(addCalendar);
CalendarRouter.route('/update/:id').put(udpateCalendar);
CalendarRouter.route('/delete/:id').delete(deleteCalendar);

module.exports = CalendarRouter;
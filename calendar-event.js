/**
 * Event CRUD in Calendar
 * 
 */

// Creating an event through popup
calendar.on('beforeCreateEvent', (eventObj) => {
    // send data to server 
    console.log(eventObj)
    // populate data in the calendar
    calendar.createEvents([
      {
        ...eventObj,
        id: new Date().getTime(), // uuid()
      },
    ]);
    // remove selection in the calendar
    calendar.clearGridSelections();
});


// Updating an event through popup
calendar.on('beforeUpdateEvent', ({ event, change }) => {
    calendar.updateEvent(event.id, event.calendarId, change);
});


// Deleting an event
calendar.on('beforeDeleteEvent', (eventObj) => {
    calendar.deleteEvent(eventObj.id, eventObj.calendarId);
});
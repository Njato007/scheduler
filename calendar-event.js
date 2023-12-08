/**
 * Event CRUD in Calendar
 * 
 */

// Creating an event through popup
calendar.on('beforeCreateEvent', (eventObj) => {
    // send data to server to add an event (POST)
    
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
calendar.on('beforeUpdateEvent', ({ event, changes }) => {
  // send request date to update the events in the server (PUT)
  calendar.updateEvent(event.id, event.calendarId, changes);
});

// Deleting an event
calendar.on('beforeDeleteEvent', (eventObj) => {
  // send delete request to the server (DELETE)
    calendar.deleteEvent(eventObj.id, eventObj.calendarId);
});
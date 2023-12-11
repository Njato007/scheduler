/**
 * Event CRUD in Calendar
 * 
 */

// Populate calendar
const getLocaleEvents = () => {
  const events = localStorage.getItem('calendar-events'); 
  const parsed = events ? JSON.parse(events) : [];
  return parsed;
}

const eventsData = (events) => {
  return events.map(item => ({
    ...item,
    start: new Date(item.start.d.d).toISOString(),
    end: new Date(item.end.d.d).toISOString(),
  })); 
}

calendar.clear();
calendar.createEvents(eventsData(getLocaleEvents()));

// function to add event using localstorage
const addEvent = (eventObj) => {

  const prevEvents = getLocaleEvents();
  prevEvents.push({
    ...eventObj
  });
  localStorage.setItem('calendar-events', JSON.stringify(prevEvents))
}

// Creating an event through popup
calendar.on('beforeCreateEvent', (eventObj) => {
  const eventId = new Date().getTime();
    // send data to server to add an event (POST)
    addEvent({...eventObj, id: eventId});    
    // populate data in the calendar
    calendar.createEvents([
      {
        ...eventObj,
        id: eventId, // uuid()
      },
    ]);
    // remove selection in the calendar
    calendar.clearGridSelections();
});


// Updating an event through popup
calendar.on('beforeUpdateEvent', ({ event, changes }) => {
  // send request date to update the events in the server (PUT)
  const prevEvents = getLocaleEvents();
  const newEvents = prevEvents.map(item => item.id === event.id ? {...item, ...changes} : item);
  localStorage.setItem('calendar-events', JSON.stringify(newEvents));

  calendar.updateEvent(event.id, event.calendarId, changes);
});

// Deleting an event
calendar.on('beforeDeleteEvent', (eventObj) => {
  // send delete request to the server (DELETE)
    const prevEvents = getLocaleEvents();
    const newEvents = prevEvents.filter(item => item.id !== eventObj.id);
    localStorage.setItem('calendar-events', JSON.stringify(newEvents));

    calendar.deleteEvent(eventObj.id, eventObj.calendarId);
});
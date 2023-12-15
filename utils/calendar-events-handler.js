/**
 * Event CRUD in Calendar
 * 
 */
const BaseUrl = 'http://localhost:3000';

// const BaseUrl = window.location.origin;

// Populate calendar
const getLocaleEvents = () => {
  const events = localStorage.getItem('calendar-events'); 
  const parsed = events ? JSON.parse(events) : [];
  return parsed;
}

// change start and end of the event objects to iso string
const eventsData = (events) => {
  return events.map(item => ({
    ...item,
    start: new Date(item.start.d.d).toISOString(),
    end: new Date(item.end.d.d).toISOString(),
  })); 
}
const eventData = (event) => {
  return ({
    ...event,
    start: new Date(event.start.d.d).toISOString(),
    end: new Date(event.end.d.d).toISOString(),
  }); 
}
const withId = (events) => events.map(event => ({...event, id: event._id}));

calendar.clear();

// GET CALENDAR EVENTS FROM SERVER
axios.get(`${BaseUrl}/events`)
  .then(function (response) {
    // handle success
    const events = withId(response.data);
    calendar.createEvents(events);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
});

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
    // send data to server to add an event (POST)
    axios({
      method: 'post',
      url: `${BaseUrl}/events/add`,
      data: eventData(eventObj)
    })
    .then(function (response) {
      // handle success
      const event = response.data.event;
      // populate data in the calendar
      calendar.createEvents([
        {
          ...eventObj,
          id: event._id,
        },
      ]);
      // remove selection in the calendar
      calendar.clearGridSelections();
      toast(Words[Lang].event_added);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});


// Updating an event through popup
calendar.on('beforeUpdateEvent', ({ event, changes }) => {
  // send request date to update the events in the server (PUT)
  // const prevEvents = getLocaleEvents();
  // const newEvents = prevEvents.map(item => item.id === event.id ? {...item, ...changes} : item);
  // localStorage.setItem('calendar-events', JSON.stringify(newEvents));

  // check end and start and change to iso string (end.d.d)
  const changesObj = {...changes};
  const {end, start} = changesObj;
  if (start) changesObj.start = new Date(start.d.d).toISOString();
  if (end) changesObj.end = new Date(end.d.d).toISOString();
  // update calendar event first to avoid timeout
  calendar.updateEvent(event.id, event.calendarId, changes);

  axios({
    method: 'put',
    url: `${BaseUrl}/events/update/${event.id}`,
    data: changesObj,
  })
  .then(function (response) {
    // handle success
    if (response.data.ok) {
      console.log('Event updated!')
      toast(Words[Lang].event_updated);
    } else {
      // dont change the event to previous in the graphic if the update is failed
      calendar.updateEvent(event.id, event.calendarId, event);
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    // dont change the event to previous in the graphic if the update is failed
    calendar.updateEvent(event.id, event.calendarId, event);
  })
  .finally(function () {
    // always executed
  });
});

// Deleting an event
calendar.on('beforeDeleteEvent', (eventObj) => {
  // send delete request to the server (DELETE)
    // const prevEvents = getLocaleEvents();
    // const newEvents = prevEvents.filter(item => item.id !== eventObj.id);
    // localStorage.setItem('calendar-events', JSON.stringify(newEvents));

    axios({
      method: 'delete',
      url: `${BaseUrl}/events/delete/${eventObj.id}`,
    })
    .then(function (response) {
      // handle success
      if (response.data.ok) {
        console.log('Event deleted!')
        toast(Words[Lang].event_deleted);
        calendar.deleteEvent(eventObj.id, eventObj.calendarId);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});


// modal add form
const ModalAddCalendar = getById('add-calendar-modal');
// my calendar div tag
const myCalendarList_div = getById('my-calendars-list');


ModalAddCalendar.style.display = 'none';
// Add calendar
getById('add-calendar-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const theme = getById('calendar-theme-selected').style.backgroundColor;
  const calendarObj = {
    name: getById('calendar-name-input').value,
    color: getTextColorForBackground(theme),
    backgroundColor: theme,
    dragBackgroundColor: theme,
    borderColor: theme,
  }
  // send send request
  axios({
    method: 'post',
    url: `${BaseUrl}/calendars/add`,
    data: calendarObj
  })
  .then(function (response) {
    // handle success
    const calendar = response.data.calendar;
    // populate data in my calendar
    myCalendarList_div.appendChild(CalendarTemplate(calendar));
    // show toast
    toast(Words[Lang].calendar_added);
    // close modal
    qAll('[modal-close]').forEach(button => button.click()); 
    // add calendar in the graphic
    CURRENT_CALENDARS.push({...calendar, id: calendar._id});
    populateCalendar(CURRENT_CALENDARS);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    initModal();
  });

});

// update calendar
getById('edit-calendar-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const theme = getById('edit-calendar-theme-selected').style.backgroundColor;
  const calendarId = getById('edit-calendar-id').value
  const calendarObj = {
    name: getById('edit-calendar-name-input').value,
    color: getTextColorForBackground(theme),
    backgroundColor: theme,
    dragBackgroundColor: theme,
    borderColor: theme,
  }
  // send send request
  axios({
    method: 'put',
    url: `${BaseUrl}/calendars/update/${calendarId}`,
    data: calendarObj
  })
  .then(function (response) {
    // handle success
    const calendar = response.data.calendar;
    // replace calendar displayed in the html
    const prevTemplate = getById(`c_${calendar._id}`);
    prevTemplate.replaceWith(CalendarTemplate(calendar));
    // show toast
    toast(Words[Lang].calendar_updated);
    // close modal
    qAll('[modal-close]').forEach(button => button.click()); 
    // update calendar in the graphic
    CURRENT_CALENDARS = CURRENT_CALENDARS.map(
      c => c.id === calendar._id ? ({
        ...calendar,
        id: calendar._id
      }) : c);
    populateCalendar(CURRENT_CALENDARS);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    initModal();
  });
});

// while clicking on check
function updateCalendarCheck(calendarId, isChecked) {
  const calendarObj = {
    isChecked: isChecked,
  }
  // send send request
  axios({
    method: 'put',
    url: `${BaseUrl}/calendars/update/${calendarId}`,
    data: calendarObj
  })
  .then(function (response) {
    // update calendar visibility
    const updatedCalendar = response.data.calendar;
    calendar.setCalendarVisibility(updatedCalendar._id, updatedCalendar.isChecked);
    // replace calendar displayed in the html
    const prevTemplate = getById(`c_${updatedCalendar._id}`);
    prevTemplate.replaceWith(CalendarTemplate(updatedCalendar));
    
    toast(Words[Lang].calendar_visibility_change);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    initModal();
  });
}


// update calendar
getById('delete-calendar-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const calendarId = getById('delete-calendar-id').value
  // send send request
  axios({
    method: 'delete',
    url: `${BaseUrl}/calendars/delete/${calendarId}`,
  })
  .then(function (response) {
    // handle success
    const deletedCalendar = response.data.deletedCalendar;
    // remove calendar displayed in the html
    const prevTemplate = getById(`c_${deletedCalendar._id}`);
    prevTemplate.remove();
    // show toast
    toast(Words[Lang].calendar_deleted);
    // update calendar in the graphic
    CURRENT_CALENDARS = CURRENT_CALENDARS.filter(c => c.id !== deletedCalendar._id);
    populateCalendar(CURRENT_CALENDARS);
    // hidde all event within calendar
    calendar.setCalendarVisibility(deletedCalendar._id, false);
    // close modal
    qAll('[modal-close]').forEach(button => button.click()); 
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    initModal();
  });
});

// Populate calendar owned by the active user
// GET CALENDARS FROM SERVER
axios.get(`${BaseUrl}/calendars`)
  .then(function (response) {
    // handle success
    const calendars = response.data;
    myCalendarList_div.innerHTML = '';
    calendars.map(calendar => myCalendarList_div.appendChild(CalendarTemplate(calendar)));
    // Populate calendars to be with the defaults
    CURRENT_CALENDARS = calendars.map(c => ({...c, id: c._id}));
    populateCalendar(CURRENT_CALENDARS);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    initModal();
});




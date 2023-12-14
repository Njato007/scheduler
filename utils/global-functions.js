const q = (string) => document.querySelector(string);
const qAll = (string) => document.querySelectorAll(string);
const getById = (string) => document.getElementById(string);

const DEFAULT_CALENDARS = [
    {
        id: 'cal1',
        name: 'Personal',
        color: '#ffffff',
        backgroundColor: '#00A9FF',
        dragBackgroundColor: '#00A9FF',
        borderColor: '#00A9FF',
    },
    {
        id: 'cal2',
        name: 'Work',
        color: '#ffffff',
        backgroundColor: '#D41C62',
        dragBackgroundColor: '#D41C62',
        borderColor: '#D41C62',
    },
    {
        id: 'cal3',
        name: 'Study',
        color: '#ffffff',
        backgroundColor: '#0D7F42',
        dragBackgroundColor: '#0D7F42',
        borderColor: '#0D7F42',
    },
    {
        id: 'cal4',
        name: 'Birthday',
        color: '#ffffff',
        backgroundColor: '#E77E72',
        dragBackgroundColor: '#E77E72',
        borderColor: '#E77E72',
        allday: true
    },
];

// use with fetched calendars
var CURRENT_CALENDARS = [];

// Use display time format
const customTime = (time, is12 = true) => {
    const date = new Date(time);
    const convertedTime = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: is12 // false for 24-hour format
    });
    return convertedTime;
}

// localstorage 
// functions use to save options setting

// calendar view
const CalendarView = {
    set(view) {
        localStorage.setItem('calendar-view', view);
    },
    get() {
        const view = localStorage.getItem('calendar-view') || 'day';
        return view;
    }
}

// Tasks view
const TasksView = {
    set(view) {
        localStorage.setItem('tasks-visibility', view);
    },
    get() {
        const view = localStorage.getItem('tasks-visibility') || 'false';
        return JSON.parse(view);
    }
}

// Current Time
const CurrentTimeVisibility = {
    set(visiblity) {
        localStorage.setItem('currenttime-visibility', new String(visiblity));
    },
    get() {
        const visibility = localStorage.getItem('currenttime-visibility') || 'false';
        return JSON.parse(visibility);
    }
}

// Current Time
const NarrowWeekend = {
    set(is_narrow) {
        localStorage.setItem('narrow-weekend', new String(is_narrow));
    },
    get() {
        const is_narrow = localStorage.getItem('narrow-weekend') || 'false';
        return JSON.parse(is_narrow);
    }
}


const CalendarTemplate = (calendar) => {
    const div = document.createElement('div');
    div.className = 'calendars-item my-calendars-item';
    div.id = `c_${calendar._id}`;
    div.innerHTML = `
        <div class="checkbox-wrapper-18">
          <div class="round">
            <input type="checkbox" id="checkbox-${calendar._id}" ${calendar.isChecked && 'checked'} onChange="updateCalendarCheck('${calendar._id}', ${!calendar.isChecked})" />
            <label for="checkbox-${calendar._id}" style="background-color: ${calendar.backgroundColor};border-color: ${calendar.backgroundColor}"></label>
          </div>
        </div>
        <label for="checkbox-${calendar._id}" class="one-line">${calendar.name}</label>
        <div class="calendars-item-button">
            <i class="fas fa-pencil calendars-item-icon calendars-item-edit" modal-target="#edit-calendar-modal" onClick="setEditCalendarModal('${calendar._id}')"></i>
            <i class="fas fa-trash-alt calendars-item-icon calendars-item-delete" modal-target="#delete-calendar-modal" onClick="setDeleteCalendarModal('${calendar._id}')"></i>
        </div>
    `;
    return div;
}


// get edit modal data
function setEditCalendarModal(calendarId) {  
    // find the calendar data by id
    const calendar = CURRENT_CALENDARS.find(calendar => calendar.id === calendarId);
    if (calendar) {
        // set hidden id
        getById('edit-calendar-id').value = calendar.id;
        // set name
        getById('edit-calendar-name-input').value = calendar.name;
        // set theme color
        getById('edit-calendar-theme-selected').style.backgroundColor = calendar.backgroundColor;
    }
}

// get delete modal data
function setDeleteCalendarModal(calendarId) {  
    // find the calendar data by id
    const calendar = CURRENT_CALENDARS.find(calendar => calendar.id === calendarId);
    if (calendar) {
        // set hidden id
        getById('delete-calendar-id').value = calendar.id;
        // set name
        getById('delete-calendar-name').textContent = calendar.name;
    }
}

const populateCalendar = (newCalendars) => {
    // hide events visibility for the unchecked calendar
    newCalendars.map(cal => {
        if (!cal.isChecked)
            calendar.setCalendarVisibility(cal.id, cal.isChecked);
    })
    calendar.setCalendars([
        ...DEFAULT_CALENDARS,
        ...newCalendars
    ]);
}

const initModal = () => {
    // open modal
    qAll('[modal-target]').forEach(button => {
        button.addEventListener('click', () => {
          const modal = document.querySelector(`${button.getAttribute('modal-target')}`);
          modal.style.display = 'flex';
        });
      });
      // close modal
      qAll('[modal-close]').forEach(button => {
        button.addEventListener('click', () => {
          const modal = document.querySelector(`${button.getAttribute('modal-close')}`);
          modal.style.display = 'none';
          qAll('.calendar-theme-list').forEach(ul => ul.setAttribute('hidden', ''));
        });
    });
}

function rgbToHex(rgbColor) {
    // Extract individual RGB values
    const rgbValues = rgbColor
      .substring(rgbColor.indexOf('(') + 1, rgbColor.indexOf(')'))
      .split(',')
      .map(value => parseInt(value.trim(), 10));
  
    // Convert each RGB value to hex and concatenate
    const hexColor = rgbValues
      .map(value => {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  
    return '#' + hexColor.toUpperCase();
}

// Convert hex color to RGB
const hexToRgb = (hex) =>
    hex
    .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

function getTextColorForBackground(backgroundColor = "#000000") {
    var rgb = null;

    if (backgroundColor.includes('#')) {
        rgb = hexToRgb(backgroundColor);
    } else {
        // Extract individual RGB values
        rgb = backgroundColor
        .substring(backgroundColor.indexOf('(') + 1, backgroundColor.indexOf(')'))
        .split(',')
        .map(value => parseInt(value.trim(), 10));
    }
  
    // Calculate relative luminance
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  
    // Decide text color based on luminance
    return luminance > 128 ? 'black' : 'white';
}

function searchMyCalendar(input) {
    const key = `${input.value}`.toLowerCase();
    const items = [...qAll('.my-calendars-item')];
    // items.map(item => item.style.display = 'flex')
    items.map(item => {
        const name = new String(item.firstElementChild.nextElementSibling.textContent).toLowerCase();
        item.style.display = name.includes(key) ? 'flex' : 'none';
    })
}

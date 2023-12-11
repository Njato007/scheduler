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

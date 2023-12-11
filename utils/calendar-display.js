

// get calendars
const calendars = calendar.getCalendars();

var calendarInnerHTML = calendars.map(calendar => {
    return `
    <div class="calendars-item">
        <div class="checkbox-wrapper-18">
            <div class="round">
            <input type="checkbox" id="checkbox-18" />
            <label for="checkbox-18"></label>
            </div>
        </div>
        <label for="checkbox-18">${calendar.title}</label>
    </div>`;
}).join('')

document.querySelector('#calendars-list').innerHTML = calendarInnerHTML;
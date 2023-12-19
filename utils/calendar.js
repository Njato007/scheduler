const date = new Date();

var currentDate = new Date();

const renderCalendar = (date) => {
    
    const month = date.getMonth();

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();


    // set day to first day
    date.setDate(1);
    const firstDayIndex = date.getDay();
    const monthDays_div = document.querySelector('.days');

    // set day to last day
    date.setDate(lastDay);
    const lastDayIndex = date.getDay();
    const nextDays = 7 - lastDayIndex - 1;

    // display date
    document.querySelector('#c-month').innerHTML = Words[Lang].monthNames[month];

    document.querySelector('#c-year').innerHTML = date.getFullYear();

    document.querySelector('#c-date').innerHTML = Words[Lang].todaysDate();

    // render weeks name
    document.querySelector('.weekdays').innerHTML = Words[Lang].dayNames.map(week => `<div>${week.substring(0, 3)}</div>`).join('');

    let days = "";
    var counter = 0;
    // display prev days
    for (let x = firstDayIndex; x > 0; x--) {
        counter++;
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    // display all days
    for (let i = 1; i <= lastDay; i++) {
        // current date class
        var activeClass = currentDate.getDate() === i && date.getMonth() === currentDate.getMonth() ? 'active' : '';
        // show to day date
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today ${activeClass}">${i}</div>`;
        } else {
            days += `<div class="${activeClass}">${i}</div>`;
        }
        
        counter++;
    }
    // this logic is used to fill calendar displayed
    let newNextDays = nextDays;
    if (counter === 28) {
        newNextDays += 7 * 2;
    } else if (counter >= 29 && counter <= 35) {
        newNextDays += 7;
    }

    console.log(counter, nextDays, (counter => 28 && counter <= 35))
    // display next days
    for (let j = 1; j <= newNextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }


    monthDays_div.innerHTML = days;

    const daysDiv = [...document.querySelectorAll('.days > div')];
    // event in days list
    daysDiv.forEach((_div) => {
        const selectedDay = parseInt(_div.textContent);
        var selectedMonth = date.getMonth();

        _div.addEventListener('click', () => {
            // remove active class
            daysDiv.map(_dayDiv => _dayDiv.classList.remove('active'));
            // add active class in the button
            _div.classList.add('active');

            // prev date
            if (_div.classList.contains('prev-date')) {
                selectedMonth -= 1;
            } else if (_div.classList.contains('next-date')) {
                selectedMonth += 1;
            }

            const selectedDate = new Date(date.getFullYear(), selectedMonth, selectedDay);
            
            // set selected date to current date
            currentDate = selectedDate;
            
            // change the today displayed above the right calendar
            renderTodayName();

            // change days in tui calendar
            if (calendar) {
                calendar.setDate(selectedDate)
                calendar.setOptions({
                    week: { startDayOfWeek: selectedDate.getDay() }
                });
            }
            // render calendar if user clicked in prev or next date
            if (_div.classList.contains('prev-date') || _div.classList.contains('next-date')) {
                renderCalendar(selectedDate);
            }
        })
    })
}

// prev event handler
document.querySelector('#prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1, 1)
    renderCalendar(date);
});

// next event handler
document.querySelector('#next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1, 1);
    renderCalendar(date);
    // change the today displayed above the right calendar
    renderTodayName();
});


// day next and prev
document.querySelector('#day-prev').addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    if (currentDate.getMonth() !== date.getMonth())
        date.setMonth(date.getMonth() - 1, 1);
    renderCalendar(date);
    calendar.setDate(currentDate);
    calendar.setOptions({
        week: { startDayOfWeek: currentDate.getDay() }
    });
    // change the today displayed above the right calendar
    renderTodayName();
});

document.querySelector('#day-next').addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1);
    // 
    if (currentDate.getMonth() !== date.getMonth())
        date.setMonth(date.getMonth() + 1, 1);
    renderCalendar(date);
    calendar.setDate(currentDate);
    calendar.setOptions({
        week: { startDayOfWeek: currentDate.getDay() }
    });
    // change the today displayed above the right calendar
    renderTodayName();
});

function renderTodayName() {
    const activeDayName_h1 = document.querySelector('.day-switcher h1');
    // change the today displayed above the right calendar
    let today = new Date();
    activeDayName_h1.textContent = (today.getDate() === currentDate.getDate()
        && today.getMonth() === currentDate.getMonth()) ? Words[Lang].today
    : Words[Lang].dayNames[currentDate.getDay()];
}

renderCalendar(date);
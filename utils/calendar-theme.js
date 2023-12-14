calendar.setTheme({
    week: {
        today: {
            color: '#279e27',
            backgroundColor: 'rgba(229, 229, 229, 0.05)',
        }
    },
    // common: {
    //     gridSelection: {
    //       backgroundColor: 'rgba(81, 230, 92, 0.05)',
    //       border: '1px dotted #515ce6',
    //       boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)'
    //     },
    // },
});

// calendar theme list color
// Calendars theme
const CALENDAR_THEME_COLORS = [
    "#EC148F",
    "#B3D334",
    "#F4783C",
    "#00ADEF",
    "#39B54A",
    "#AA4B9D",
    "#EC1163",
    "#343392",
    "#0D7F42",
];

const ul_calendarList = document.querySelectorAll('.calendar-theme-list');
ul_calendarList.forEach(ul => {
    ul.setAttribute('hidden', '');
    ul.innerHTML += 
        CALENDAR_THEME_COLORS.map(color => `
        <li class="toastui-calendar-dropdown-menu-item color-container" onClick="selectThemeColor(this, '${color}')">
            <div class="color-item" style="background-color: ${color} !important;"></div>
        </li>
        `).join('');
    
        qAll('.calendar-theme-dropdown').forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (ul.hasAttribute('hidden')) 
                    ul.removeAttribute('hidden');
                else
                    ul.setAttribute('hidden', '')
            }); 
        });
})

//  color picker
qAll('.calendar-color_picker').forEach(inputColor => {
    inputColor.addEventListener('input', () => {
        var textColor = getTextColorForBackground(inputColor.value);
        inputColor.style.color = textColor;
        const selectedTheme = inputColor.parentElement.parentElement.previousElementSibling.firstElementChild;
        selectedTheme.style.backgroundColor = inputColor.value;
    })
})

function selectThemeColor(e, color) {
    const selectedTheme = e.parentElement.previousElementSibling.firstElementChild;
    selectedTheme.style.backgroundColor = color;
    qAll('.calendar-theme-list').forEach(ul => ul.setAttribute('hidden', ''));
}

// click outside theme color list
qAll('.calendar-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        const targets = [
            ...qAll('button.calendar-theme-dropdown'),
            ...qAll('span.toastui-calendar-icon'),
            ...qAll('span.toastui-calendar-content'),
            ...qAll('span.toastui-calendar-ic_dropdown-arrow')
        ]
        if (!targets.includes(e.target))
            qAll('.calendar-theme-list').forEach(ul => ul.setAttribute('hidden', ''));
    })
})




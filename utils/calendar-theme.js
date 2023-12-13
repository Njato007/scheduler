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
    ul.innerHTML = 
        CALENDAR_THEME_COLORS.map(color => `
        <li class="toastui-calendar-dropdown-menu-item" onClick="selectThemeColor(this, '${color}')">
            <span class="toastui-calendar-icon toastui-calendar-dot" style="background-color: ${color};"></span>
            <span class="toastui-calendar-content" style="color: ${color} !important;">Theme (${color})</span>
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
function selectThemeColor(e, color) {
    const selectedTheme = e.parentElement.previousElementSibling.firstElementChild;
    selectedTheme.style.backgroundColor = color;
    qAll('.calendar-theme-list').forEach(ul => ul.setAttribute('hidden', ''));
}




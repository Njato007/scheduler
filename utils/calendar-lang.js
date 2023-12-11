const Lang = 'en';

const Words = {
    en: {
        milestone: 'Milestone',
        task: 'Task',
        allday: 'All day',
        free: 'Free',
        busy: 'Busy',
        title: 'Title',
        location: 'Location',
        startdate: 'Start date',
        enddate: 'End date',
        add: 'Add',
        update: 'Update',
        edit: 'Edit',
        delete: 'Delete',
        dayNames: ['Sunday', 'Monday', "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        day: 'Day',
        week: 'Week',
        month: 'Month',
        change_calendar_view: 'Change calendar view',
        other_options: 'Other options',
        calendar: 'Calendar',
        show_task: 'Show tasks',
        show_current_time: 'Show current time',
        todaysDate() {
            return FullDateString('en');;
        }
    },
    fr: {
        milestone: 'Milestone',
        task: 'Tâche',
        allday: 'Tous les jours',
        free: 'Libre',
        busy: 'Occupé(e)',
        title: 'Titre',
        location: 'Location',
        startdate: 'Date de début',
        enddate: 'Date de fin',
        add: 'Ajouter',
        update: 'Mettre à jour',
        edit: 'Editer',
        delete: 'Supprimer',
        dayNames: ['Dimanche', 'Lundi', "Mardi", 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        monthNames: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aôut',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre',
        ],
        day: 'Jour',
        week: 'Semaine',
        month: 'Mois',
        change_calendar_view: 'Changer la vue du calendrier',
        other_options: 'Autres options',
        calendar: 'Calendrier',
        mycalendars: 'Mes calendriers',
        show_task: 'Afficher les tâches',
        show_current_time: 'Afficher l\'heure actuelle',
        todaysDate() {
            return FullDateString('fr');
        }
    }
}

// to get full date string
const FullDateString = (Lang = 'en') => {
    const date = new Date();
    const fullDate = `${Words[Lang].dayNames[date.getDay()]} ${date.getDate()} ${Words[Lang].monthNames[date.getMonth()].toLowerCase()} ${date.getFullYear()}`;
    return fullDate;
}

// change lang for tag with data-key attributes
document.querySelectorAll('[data-key]').forEach(tag => {
    const dataKey = tag.getAttribute('data-key');
    tag.textContent = Words[Lang][dataKey];
});

calendar.setOptions({
    template: {
        // time now display
        timegridNowIndicatorLabel({ time }) {
            return customTime(time, Lang === 'en');
        },
        // vertical time dispaly
        timegridDisplayPrimaryTime({ time }) {
            // french time
            return customTime(time, Lang === 'en');
        },
        
        milestoneTitle() {
            return `<span>${Words[Lang].milestone}</span>`;
        },
        taskTitle() {
            return `<span>${Words[Lang].task}</span>`;
        },
        alldayTitle() {
            return `<span>${Words[Lang].allday}</span>`;
        },
        // POPUP
        popupIsAllday() {
            return Words[Lang].allday;
        },
        popupStateFree() {
            return Words[Lang].free;
        },
        popupStateBusy() {
            return Words[Lang].busy;
        },
        titlePlaceholder() {
            return Words[Lang].title;
        },
        locationPlaceholder() {
            return Words[Lang].location;
        },
        startDatePlaceholder() {
            return Words[Lang].startdate;
        },
        endDatePlaceholder() {
            return Words[Lang].enddate;
        },
        popupSave() {
            return Words[Lang].add;
        },
        popupUpdate() {
            return Words[Lang].update;
        },
        popupEdit() {
            return Words[Lang].edit;
        },
        popupDelete() {
            return Words[Lang].delete;
        },

        time(event) {
            const start = new Date(event.start.d.d)
            const end = new Date(event.end.d.d)
            return `<p class="event-template">
                <b>${customTime(start, Lang === 'en')} - ${customTime(end, Lang === 'en')}</b> <br/>
                <span>${event.title}</span>
            </p>`;
        },
        
        goingDuration(event) {
            return `<span>${event.goingDuration}</span>`;
        },
    },
    week: {
        dayNames: Words[Lang].dayNames.map(e => e.substring(0, 3))
    }
});


// function to show update time display every second
setInterval(() => {
    const date = new Date();
    const time = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: Lang === 'en' // false for 24-hour format
    });
    document.querySelector('#c-time').innerHTML = time;
}, 1000);
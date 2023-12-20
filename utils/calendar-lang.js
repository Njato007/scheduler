const Lang = 'fr';

const Words = {
    en: {
        milestone: 'Milestone',
        task: 'Task',
        allday: 'All day',
        isAllday: 'All day?',
        free: 'Free',
        busy: 'Busy',
        title: 'Event name',
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
        calendars: 'Calendars',
        mycalendars: 'My Calendars',
        add_calendar: 'Add calendar',
        edit_calendar: 'Edit calendar',
        show_task: 'Tasks',
        show_current_time: 'Current time',
        delete_calendar_message: 'Be carefull! All events in this calendar will be deleted too. Do you want to delete anyway?',
        delete_calendar: 'Delete calendar',
        yes_delete: 'Delete it',
        no_cancel: "No",
        calendar_name_placeholder: "Calendar's name",
        mycalendar_search_placeholder: "Search your calendars",
        event_added: 'An event is successfully added!',
        event_updated: 'An event is successfully updated!',
        event_deleted: 'An event is successfully deleted!',
        calendar_added: 'A new calendar is added!',
        calendar_updated: 'A calendar has been updated!',
        calendar_deleted: 'A calendar has been deleted!',
        calendar_visibility_change: "A calendar's visibility has changed",
        theme: 'Theme',
        customize_theme_placeholder: "Customize",
        narrow_weekend: 'Narrow weekend',
        workweek: 'Work week',
        today: 'Today',
        private: 'Private',
        add_event: 'Add event',
        category: {
            label: 'Category',
            time: 'Time',
            task: 'Task',
            allday: 'All day',
            milestone: 'Milestone'
        },
        todaysDate() {
            return FullDateString('en');;
        }
    },
    fr: {
        milestone: 'Etape importante',
        task: 'Tâche',
        allday: 'Journée entière',
        isAllday: 'Journée entière?',
        free: 'Libre',
        busy: 'Occupé(e)',
        title: "Nom de l'événement",
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
        calendars: 'Calendriers',
        mycalendars: 'Mes calendriers',
        add_calendar: 'Ajouter un calendrier',
        edit_calendar: 'Modifier le calendrier',
        show_task: 'Tâches',
        show_current_time: 'Heure actuelle',
        delete_calendar_message: 'Attention! Tous les événements dans ce calendrier seront supprimés aussi. Voulez-vous le supprimer quand-même?',
        delete_calendar: 'Supprimer le calendrier',
        yes_delete: 'Oui, supprimer-le',
        no_cancel: "Non, annuler",
        calendar_name_placeholder: "Nom du calendrier",
        mycalendar_search_placeholder: "Chercher vos calendriers",
        event_added: 'Un événement a été ajouté!',
        event_updated: 'Un événement a été modifié!',
        event_deleted: 'Un événement a été supprimé!',
        calendar_added: 'Un nouveau calendrier a été ajouté!',
        calendar_updated: 'Un calendrier a été modifié!',
        calendar_deleted: 'Un calendrier a été supprimé!',
        calendar_visibility_change: "La visibilité d'un calendrier a été modifiée",
        theme: 'Thème',
        customize_theme_placeholder: "Personnaliser",
        narrow_weekend: 'Réduire weekend',
        workweek: 'Semaine de travail',
        today: "Aujourd'hui",
        private: 'Privé',
        add_event: 'Ajouter un événement',
        category: {
            label: 'Catégorie',
            time: 'Heure',
            task: 'Tâche',
            allday: 'Toute la journée',
            milestone: 'Etape importante'
        },
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
document.querySelectorAll('[cdata-key]').forEach(tag => {
    const dataKey = tag.getAttribute('cdata-key');
    if (dataKey.includes('_placeholder'))
        tag.placeholder = Words[Lang][dataKey];
    else 
        tag.textContent = Words[Lang][dataKey];
});

const startEndTime = (event) => {
    const start = new Date(event.start.d.d);
    const end = new Date(event.end.d.d);

    return event.isAllday ? '' : `<b>${customTime(start, Lang === 'en')} - ${customTime(end, Lang === 'en')}</b>`
}

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
            return Words[Lang].isAllday;
        },
        popupStateFree() {
            return `🏝️ ${Words[Lang].free}`;
        },
        popupStateBusy() {
            return `🔥 ${Words[Lang].busy}`;
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
        popupDetailBody({ body }) {
            console.log('the body', body)
            return '<h1>POP</h1>';
        },
        popupDetailAttendees({ attendees = []}) {
            return attendees.map(att => `
                <a href="mailto:${att.email}">${att.name}</a>
            `).join(', ');
        },

        time(event) {
            if (event.isPrivate) {
                return `<p class="event-template">
                    <i class="fas fa-clock"></i>
                    <b>${startEndTime(event)}</b>
                    <i class="fas fa-lock"></i>
                    <span>${Words[Lang].private}</span>
                </p>`;
            } else {
                return `<p class="event-template">
                    <i class="fas fa-clock"></i>
                    <b>${startEndTime(event)}</b> <br/>
                    <span>${event.title}</span>
                </p>`;
            }
        },
        task(event) {
            if (event.isPrivate) {
                return `
                <p>
                    <i class="fas fa-hashtag"></i>
                    <b>${startEndTime(event)}</b>
                    <i class="fas fa-lock"></i>
                    ${Words[Lang].private}
                </p>`
            }
            return `
                <p>
                    <i class="fas fa-hashtag"></i>
                    ${event.title}
                </p>
            `;
        },
        allday(event) {
            if (event.isPrivate) {
                return `
                <p>
                    <i class="fas fa-refresh"></i>
                    <b>${startEndTime(event)}</b>
                    <i class="fas fa-lock"></i>
                    ${Words[Lang].private}
                </p>`
            }
            return `
                <p>
                    <i class="fas fa-refresh"></i>
                    <b>${startEndTime(event)}</b>
                    ${event.title}
                </p>
            `;
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
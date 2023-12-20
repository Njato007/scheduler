function initAutoComplete() {
    const input = document.querySelector('#attendee');
    const suggestions = document.querySelector('.suggestions div.suggestions-list');

    var users = [];
    // get All users
    
    axios.get(`${BaseUrl}/users`)
    .then(function (response) {
        // handle success
        const res = response.data;
        if (res.ok) {
            users = [...res.users];
        }
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
        initModal();
    });


    function search(str) {
        let results = [];
        const val = str.toLowerCase();

        for (i = 0; i < users.length; i++) {
            if (users[i].name.toLowerCase().indexOf(val) > -1) {
                let isAdded = [...document.querySelectorAll('div.attendees-item p')].some(e => e.id === users[i]._id)
                console.log(isAdded)
                if (!isAdded)
                    results.push(users[i]);
            }
        }

        return results;
    }

    function searchHandler(e) {
        const inputVal = e.currentTarget.value;
        let results = [];
        if (inputVal.length > 0) {
            results = search(inputVal);
        }
        showSuggestions(results, inputVal);
    }

    function showSuggestions(results, inputVal) {
        
        suggestions.innerHTML = '';

        if (results.length > 0) {
            for (i = 0; i < results.length; i++) {
                let username = results[i].name;
                // Highlights only the first match
                // TODO: highlight all matches
                const match = username.match(new RegExp(inputVal, 'i'));
                let element = username.replace(match[0], `<strong>${match[0]}</strong>`);
                suggestions.innerHTML += `<p id="${results[i]._id}">
                    <span class="attendee-profile">
                        <b>${getFirstLeter(results[i].name)}</b>
                        <i class="fas fa-user-circle"></i>
                    </span>
                    <span>${element}</span>
                </p>`;
            }
            suggestions.classList.add('has-suggestions');
        } else {
            results = [];
            suggestions.innerHTML = '';
            suggestions.classList.remove('has-suggestions');
        }
    }

    function useSuggestion(userId) {
        const selectedUser = users.find(user => user._id === userId);
        const list = document.querySelector('div.attendees-added');
        const container = document.querySelector('div.attendees-container');
        const div = document.createElement('div');
        const i = document.createElement('i');
        i.className = 'fas fa-times';
        i.onclick = () => {
            div.remove();
            if (list.children.length === 0)
                container.setAttribute('hidden', '');
        }
        div.className = 'attendees-item';
        div.innerHTML = `
            <p id="${selectedUser._id}">
                <span class="attendee-profile">
                    <b>${getFirstLeter(selectedUser.name)}</b>
                    <i class="fas fa-user-circle"></i>
                </span>
                ${selectedUser.name}
                <input type="hidden" value="${selectedUser._id}" name="attendees[]" />
            </p>
        `;
        div.append(i);
        list.append(div);
        input.value = '';
        input.focus();
        suggestions.innerHTML = '';
        suggestions.classList.remove('has-suggestions');
        if (list.children.length > 0) {
            container.removeAttribute('hidden');
        }
    }

    input.addEventListener('keyup', searchHandler);
    suggestions.addEventListener('click', e => {
        if (e.target.id)
            useSuggestion(e.target.id)
    });
}
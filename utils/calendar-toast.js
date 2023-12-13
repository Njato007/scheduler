const toast = (message) => {
    const div = document.getElementById('toast-alert');
    div.innerHTML = `<p>${message}</p>`;
    div.style.display = 'flex';
    div.style.animation = 'bottom-to-top 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards';
    setTimeout(() => {
        div.style.animation = 'fadeout 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards';
    }, 3000);
}
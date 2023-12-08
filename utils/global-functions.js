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
let daysElement = document.querySelector('.number_days');
let hoursElement = document.querySelector('.number_hours');
let minutesElement = document.querySelector('.number_minutes');
let secondsElement = document.querySelector('.number_seconds');


function getTime() {
    const today = new Date();
    const nextYear = today.getUTCFullYear() + 1;
    const newYear = new Date(Date.UTC(nextYear, 0, 1));
    const diffinMilliseconds = newYear - today;

    const days = Math.floor(diffinMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffinMilliseconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffinMilliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((diffinMilliseconds / 1000) % 60);

    return { days, hours, minutes, seconds };
}

function updateTimer() {
    const { days, hours, minutes, seconds } = getTime();

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}

setInterval(updateTimer, 1000);

updateTimer();
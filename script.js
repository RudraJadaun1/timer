let timerInterval;
let alarmTime = null;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const alarmModal = document.getElementById('alarmModal');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarm = document.getElementById('setAlarm');
const closeModal = document.getElementsByClassName('close')[0];

let running = false;
let startTime;
let elapsedTime = 0;

function updateDisplay() {
    const time = new Date(elapsedTime);
    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
            checkAlarm();
        }, 1000);
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    }
    running = !running;
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start';
}

function checkAlarm() {
    if (alarmTime) {
        const currentTime = new Date();
        if (currentTime.getHours() === alarmTime.getHours() &&
            currentTime.getMinutes() === alarmTime.getMinutes() &&
            currentTime.getSeconds() === 0) {
            alert('Alarm!');
            alarmTime = null; // Reset alarm after it goes off
        }
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

setAlarmBtn.addEventListener('click', () => {
    alarmModal.style.display = 'block';
});

closeModal.onclick = function() {
    alarmModal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == alarmModal) {
        alarmModal.style.display = 'none';
    }
};

setAlarm.addEventListener('click', () => {
    const timeParts = alarmTimeInput.value.split(':');
    alarmTime = new Date();
    alarmTime.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0);
    alarmModal.style.display = 'none';
});

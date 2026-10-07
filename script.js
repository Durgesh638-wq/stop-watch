// ================================
// Professional Stopwatch
// ================================

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clearLapBtn = document.getElementById("clearLapBtn");

const lapList = document.getElementById("lapList");
const popup = document.getElementById("popup");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCounter = 1;

function showPopup(message) {
    popup.innerText = message;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2500);
}

function updateDisplay() {

    const time = Date.now() - startTime + elapsedTime;

    let hrs = Math.floor(time / 3600000);
    let mins = Math.floor((time % 3600000) / 60000);
    let secs = Math.floor((time % 60000) / 1000);
    let millis = time % 1000;

    hours.textContent = String(hrs).padStart(2, "0");
    minutes.textContent = String(mins).padStart(2, "0");
    seconds.textContent = String(secs).padStart(2, "0");
    milliseconds.textContent = String(millis).padStart(3, "0");
}

function startStopwatch() {

    if (running) return;

    startTime = Date.now();

    timerInterval = setInterval(updateDisplay, 10);

    running = true;

    if (elapsedTime === 0) {
        showPopup("▶ Stopwatch Started");
    } else {
        showPopup("▶ Stopwatch Resumed");
    }
}

function pauseStopwatch() {

    if (!running) return;

    clearInterval(timerInterval);

    elapsedTime += Date.now() - startTime;

    running = false;

    showPopup("⏸ Stopwatch Paused");
}

function resetStopwatch() {

    clearInterval(timerInterval);

    running = false;

    startTime = 0;
    elapsedTime = 0;
    lapCounter = 1;

    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    milliseconds.textContent = "000";

    lapList.innerHTML = "";

    showPopup("🔄 Stopwatch Reset");
}

function addLap() {

    if (!running) {
        showPopup("⚠ Start the stopwatch first");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>Lap ${lapCounter}</strong>
        <span>
        ${hours.textContent} :
        ${minutes.textContent} :
        ${seconds.textContent} :
        ${milliseconds.textContent}
        </span>
    `;

    lapList.prepend(li);

    lapCounter++;

    showPopup("🏁 Lap Recorded");
}

function clearLaps() {

    lapList.innerHTML = "";

    lapCounter = 1;

    showPopup("🗑 All Laps Cleared");
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);
clearLapBtn.addEventListener("click", clearLaps);

document.addEventListener("keydown", function(event){

    const key = event.key.toLowerCase();

    switch(key){

        case "s":
            startStopwatch();
            break;

        case "p":
            pauseStopwatch();
            break;

        case "r":
            resetStopwatch();
            break;

        case "l":
            addLap();
            bre

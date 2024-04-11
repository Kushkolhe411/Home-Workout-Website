slider = document.querySelector('.slider');

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

var sectionIndex = 0;

leftArrow.addEventListener('click', function () {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
    slider.style.transform = 'translate(' + (sectionIndex) * -8.33 + '%)';
});

rightArrow.addEventListener('click', function () {
    sectionIndex = (sectionIndex < 11) ? sectionIndex + 1 : 11;
    slider.style.transform = 'translate(' + (sectionIndex) * -8.33 + '%)';
});

function previous() {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
    slider.style.transform = 'translate(' + (sectionIndex) * -8.33 + '%)';
}

function next() {
    sectionIndex = (sectionIndex < 11) ? sectionIndex + 1 : 11;
    slider.style.transform = 'translate(' + (sectionIndex) * -8.33 + '%)';
}

//TIMER//

const workTime = 30 * 1000;
const restTime = 10 * 1000;
let currentTime = workTime;

const dataPercent = document.querySelectorAll('.data-percent')[0];
const timer = document.getElementById('timer');

let countdownInterval;

updateCountdown(currentTime);
countdown(currentTime);
pause();
function countdown(pTime) {
    pause();
    countdownInterval = setInterval(() => {
        pTime = pTime - 1000;
        if (pTime <= 0) {
            clearInterval(countdownInterval);
            sectionIndex = (sectionIndex < 11) ? sectionIndex + 1 : 11;
            slider.style.transform = 'translate(' + (sectionIndex) * -8.33 + '%)';
            //const element = document.getElementById("timer");
            //element.remove();
        }
        updateCountdown(pTime)
    }, 1000)

    console.log("timer");
}

function updateCountdown(pTime) {
    if (pTime <= 0) {
        dataPercent.style.setProperty('--angle', '360deg');
        dataPercent.style.setProperty('--color', 'red');
        timer.innerText = `00:00`;
    } else {
        let angle = pTime / workTime * 360 + 'deg';
        dataPercent.style.setProperty('--angle', angle);

        let minutes = Math.floor(pTime / 60 / 1000).toString().padStart(2, "0");
        let seconds = Math.floor((pTime / 1000) % 60).toString().padStart(2, "0");
        timer.innerText = `${minutes}:${seconds}`;
    }
}

function play() {
    clearInterval(countdownInterval);
    countdown(currentTime);
    document.querySelectorAll('.play')[0].classList.add('d-none');
    document.querySelectorAll('.pause')[0].classList.remove('d-none');
}

function pause() {
    clearInterval(countdownInterval);
    let [minutes, seconds] = timer.innerText.split(":");
    currentTime = ((minutes * 60) + (seconds * 1)) * 1000;
    document.querySelectorAll('.play')[0].classList.remove('d-none');
    document.querySelectorAll('.pause')[0].classList.add('d-none');
}

function reset() {
    clearInterval(countdownInterval);
    currentTime = workTime;
    numberOfWorkIntervals = 2;

    document.querySelectorAll('.play')[0].classList.add('d-none');
    document.querySelectorAll('.pause')[0].classList.remove('d-none');

    updateCountdown(currentTime);
    countdown(currentTime);
    pause();
}

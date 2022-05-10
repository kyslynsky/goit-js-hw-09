import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let selectedUserDate = '';

refs.startBtn.setAttribute('disabled', true);

const config = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedUserDate = selectedDates[0].getTime();
    checkValidDate(selectedUserDate);
    getTimerValues();
  },
};

flatpickr('#datetime-picker', config);

function checkValidDate(date) {
  if (date < config.defaultDate) {
    Notify.failure('Please choose a date in the future', {
      timeout: 1300,
      showOnlyTheLastOne: true,
      clickToClose: true,
    });
    refs.startBtn.setAttribute('disabled', true);
    return;
  }

  refs.startBtn.removeAttribute('disabled');
}

function getTimerValues() {
  const startTime = Date.now();
  const resultTime = selectedUserDate - startTime;
  const time = convertMs(resultTime);
  console.log('time', time);

  if (resultTime > 0) {
    updateClockFace(time);
  }

  if (resultTime < 1000) {
    clearInterval(intervalId);
  }
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

refs.startBtn.addEventListener('click', () => {
  if (intervalId) {
    return;
  }

  intervalId = setInterval(getTimerValues, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

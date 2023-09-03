import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputCalendar = document.querySelector('#datetime-picker');
const secondsEl = document.querySelector('[data-seconds]');
const minutesEl = document.querySelector('[data-minutes]');
const hoursEl = document.querySelector('[data-hours]');
const daysEl = document.querySelector('[data-days]');
const btnStart = document.querySelector('button[data-start]');

// створення кнопки ресет/поява при натисканні старту.
const btnReset = document.createElement('button');
btnReset.textContent = 'Stop & Reset';
btnReset.setAttribute('data-reset', '');

let selectedDate;
let interval; // змінна для айдішки інтервалу

// стилізація
const timer = document.querySelector('.timer');
timer.style =
  'border: 4px solid #b66ce7; border-radius: 25px;   background-color: #b66ce730;  transition: background-color 2s ease, border-color 2s ease; height: fit-content;width: fit-content;margin-right: auto;margin-left: auto;padding: 30px;margin-top: 50px;display: flex;gap: 30px;';
const field = document.querySelectorAll('.field');
field.forEach(element => {
  element.style =
    'display: flex;   flex-direction: column;  text-align: center; align-items: normal; font-size: 32px; font-weight: 600; ';
});

Notiflix.Notify.init({
  width: '380px',
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - '' - 'center-bottom' - 'center-center'
  distance: '30px',
  fontSize: '16px',
  cssAnimationStyle: 'from-top',
});
//

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      timer.style.borderColor = '#d14949';
      timer.style.backgroundColor = '#d1494930';
    } else {
      btnStart.disabled = false;
      selectedDate = selectedDates[0];
      timer.style.borderColor = '#ebc060';
      timer.style.backgroundColor = '#ebc06030';
    }
  },
};
flatpickr(inputCalendar, options); // flatpickr та опції з налаштуваннями до нього вище.

btnStart.addEventListener('click', onStart);
function onStart() {
  btnStart.disabled = true;
  timer.style.borderColor = '#3674c5';
  timer.style.backgroundColor = '#3674c530';

  btnStart.insertAdjacentElement('afterend', btnReset);
  btnReset.addEventListener('click', onReset);

  interval = setInterval(() => {
    if (selectedDate - new Date() < 0) {
      clearInterval(interval);
      Notiflix.Notify.success('Час настав!');
      timer.style.borderColor = '#05ca26d2';
      timer.style.backgroundColor = '#05ca2630';
      btnStart.disabled = false;
      setTimeout(() => {
        onReset();
      }, 3000);
      return;
    }

    let timeAmount = convertMs(selectedDate - new Date());

    turnOnTimer(timeAmount);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function turnOnTimer(obj) {
  Object.keys(obj).forEach(key => {
    obj[key] = addLeadingZero(obj[key]);
  });
  secondsEl.textContent = obj.seconds;
  minutesEl.textContent = obj.minutes;
  hoursEl.textContent = obj.hours;
  daysEl.textContent = obj.days;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onReset() {
  clearInterval(interval);
  btnStart.disabled = true;
  btnReset.removeEventListener('click', onReset);

  btnReset.remove();

  secondsEl.textContent = '00';
  minutesEl.textContent = '00';
  hoursEl.textContent = '00';
  daysEl.textContent = '00';

  // відновлюємо стилі таймера та відключаємо рамку
  timer.style.borderColor = '#b66ce7';
  timer.style.backgroundColor = '#b66ce730';
}

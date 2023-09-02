// додавання кнопки ресет
const btnResetMarkup = ` <button type="button" data-reset>Reset</button>`;
document.body.insertAdjacentHTML('beforeend', btnResetMarkup);
//
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const btnReset = document.querySelector('button[data-reset]');

let currentBg = JSON.parse(localStorage.getItem('saved-bg-color')) || '#fafafa'; // змінна для кольору
let interval; // змінна для айдішки інтервалу
document.body.style.backgroundColor = currentBg; // встановлення бекграунду записаного в змінну куррентБг.
document.body.style.transition = 'background-color 0.4s ease'; //інлайново додав стиль для плавної зміни кольорів

btnStop.disabled = true; //за змовчуванням вимкнена кнопка стоп.
if (currentBg === '#fafafa') {
  btnReset.disabled = true;
}

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);
btnReset.addEventListener('click', onReset);

function onStart(evt) {
  if (evt) {
    btnStart.disabled = true; //зміна доступності кнопок
    btnStop.disabled = false;
    btnReset.disabled = true;

    //встановлення інтервалу зміни кольорку бг та додатково запис його в змінну для подальшого використання
    interval = setInterval(() => {
      currentBg = getRandomHexColor();
      document.body.style.backgroundColor = currentBg;
    }, 1000);
  }
}

function onStop(evt) {
  if (evt) {
    btnStart.disabled = false; //зміна доступності кнопок
    btnStop.disabled = true;
    btnReset.disabled = false;

    //збереження значення кольору при натисканні стоп, для того щоб надати це значення при перезавантажені сторінки.
    localStorage.setItem('saved-bg-color', JSON.stringify(currentBg));
    clearInterval(interval);
  }
}

function onReset(evt) {
  if (evt && currentBg != '#fafafa') {
    const confirmed = confirm('Встановити фон сторінки на білий колір?');
    if (confirmed) {
      currentBg = '#fafafa';
      document.body.style.backgroundColor = currentBg;
      localStorage.setItem('saved-bg-color', JSON.stringify(currentBg));
      btnReset.disabled = true;
    }
  }
}

//
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

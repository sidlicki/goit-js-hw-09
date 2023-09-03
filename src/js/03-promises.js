import Notiflix from 'notiflix';

// Отримання посилання на форму за її класом
const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  // Отримання значень з інпутів і перетворення їх на числа
  const delayInput = parseInt(form.elements.delay.value);
  const stepInput = parseInt(form.elements.step.value);
  const amountInput = parseInt(form.elements.amount.value);

  // Перевірка на корректність введених значень
  if (delayInput < 0) {
    Notiflix.Notify.warning('Затримка перед запуском не може бути менша за 0');
    return;
  }
  if (stepInput < 0) {
    Notiflix.Notify.warning(
      'Затримка між створеннями промісів не може бути меншою за 0'
    );
    return;
  }
  if (amountInput < 1) {
    Notiflix.Notify.warning(
      'Введіть корректну кількість промісів, що хочете створити'
    );
    return;
  }

  // Створення та обробка промісів
  for (let i = 0; i < amountInput; i += 1) {
    const position = i + 1;
    const delay = delayInput + i * stepInput;
    const promise = createPromise(position, delay);

    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      })
      .finally(() => {
        // Виведення повідомлення після завершення всіх промісів
        if (i === amountInput - 1) {
          Notiflix.Notify.info(`Ура ми створили ${position} промісів!`);
        }
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      // Результат промісу вирішується або відхиляється випадково
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//стилізація повідомлень
Notiflix.Notify.init({
  width: '380px',
  position: 'right-bottom',
  distance: '30px',
  fontSize: '16px',
});

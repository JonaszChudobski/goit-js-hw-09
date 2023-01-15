import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');
const inputField = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
let chosenDate;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      chosenDate = selectedDates[0];
      startButton.disabled = false;
    }
  },
};

flatpickr(inputField, options);

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

const addLeadingZero = value => {
  if (value < 10) {
    return `${value}`.padStart(2, '0');
  }
  return value;
};

const onClick = () => {
  setInterval(() => {
    let actualDate = new Date();
    if (chosenDate - actualDate >= 0) {
      convertedDate = convertMs(chosenDate - actualDate);
      dataDays.innerHTML = addLeadingZero(convertedDate.days);
      dataHours.innerHTML = addLeadingZero(convertedDate.hours);
      dataMinutes.innerHTML = addLeadingZero(convertedDate.minutes);
      dataSeconds.innerHTML = addLeadingZero(convertedDate.seconds);
    } else {
      dataDays.innerHTML = '00';
      dataHours.innerHTML = '00';
      dataMinutes.innerHTML = '00';
      dataSeconds.innerHTML = '00';
    }
  }, 1000);
};

startButton.addEventListener('click', onClick);

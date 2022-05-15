import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.input, options);

const timer = {
  intervalId: null,
  isActive: true,

  inputValidator() {
    if (new Date(refs.input.value) < new Date()) {
      Report.failure('Invalid date', 'Please select a date in the future', 'Okay');
      refs.button.setAttribute('disabled', true);
    }
    if (new Date(refs.input.value) > new Date()) {
      refs.button.removeAttribute('disabled');
    }
  },

  start() {
    const startDate = new Date(refs.input.value);
    if (this.isActive) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentDate = new Date();
      const diff = startDate - currentDate;
      const { days, hours, minutes, seconds } = convertMs(diff);

      refs.days.textContent = addLeadingZero(days);
      refs.hours.textContent = addLeadingZero(hours);
      refs.minutes.textContent = addLeadingZero(minutes);
      refs.seconds.textContent = addLeadingZero(seconds);
      if (diff < 0) {
        clearInterval(this.intervalId);
        refs.days.textContent = '00';
        refs.hours.textContent = '00';
        refs.minutes.textContent = '00';
        refs.seconds.textContent = '00';
      }
    }, 1000);
  },
};

refs.button.setAttribute('disabled', true);
refs.button.addEventListener('click', timer.start);
refs.input.addEventListener('input', timer.inputValidator);

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

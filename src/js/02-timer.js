// https://flatpickr.js.org/getting-started/
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  picker: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.start.setAttribute('disabled', 'true');

const DELAY_TIME = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    if (selectedDates[0] - Date.now() <= 0) {
      window.alert('Please choose a date in the future');
      return;
    }

    refs.start.removeAttribute('disabled', 'true');
  },
};

let picker = flatpickr(refs.picker, options);
// console.log( 'picker.selectedDates[0]', picker.selectedDates[0]);

refs.start.addEventListener('click', onClickStartHandler);

let startDate = null;
let intervalId = null;
let isActive = false;

const timer = {
  start(startDate) {
    if (isActive){
      return;
    }

    isActive = true;
    intervalId = setInterval(() => {

      const zero = 0;
    
      
      const convertedTime = convertMs(startDate - Date.now());
      const {days, hours, minutes, seconds} = convertedTime;
      console.log('days, hours, minutes, seconds', days, hours, minutes, seconds);


      refs.days.textContent = addLeadingZero(days);
      refs.hours.textContent = addLeadingZero(hours);
      refs.minutes.textContent = addLeadingZero(minutes);
      refs.seconds.textContent = addLeadingZero(seconds);

      if (days===zero && hours===zero && minutes===zero && seconds===zero) {
        console.log("time to stop!");
        timer.stop();
        return;
      }


    }, DELAY_TIME);
  },

  stop() {
    clearInterval(intervalId);
    isActive = false;
  },
};



function onClickStartHandler() {
  startDate = picker.selectedDates[0];
  timer.start(startDate);

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


function addLeadingZero(value){
  return String(value).padStart(2, "0");
}

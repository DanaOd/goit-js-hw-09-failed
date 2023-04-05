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


const DELAY_TIME = 1000;
// console.log(refs.picker, refs.days, refs.hours, refs.minutes, refs.seconds);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0]-Date.now()<=0){
      // console.log("дата раньше нынешней", (selectedDates[0]-Date.now()));
      window.alert("Please choose a date in the future");
      refs.start.setAttribute("disabled", "true");
      return;
    }

    refs.start.removeAttribute("disabled", "true");

  },
};

let picker = flatpickr(refs.picker, options);
console.log( 'picker.selectedDates[0]', picker.selectedDates[0]);

refs.start.addEventListener('click', onClickStartHandler);



let startDate = null;
let intervalId =  null;



const timer = {
  start(startDate) {
  
     intervalId = setInterval(() => {
      console.log("startDate", startDate, Date.now());
      
      const convertedTime = convertMs(startDate-Date.now());

      // console.log(convertedTime, 'this.startDate - Date.now()', this.startDate, Date.now());
      refs.days.textContent = convertedTime.days;
      refs.hours.textContent = convertedTime.hours;
      refs.minutes.textContent = convertedTime.minutes;
      refs.seconds.textContent = convertedTime.seconds;


    }, DELAY_TIME);

  },

  stop(){
    clearInterval(intervalId);
  }
};


function onClickStartHandler() {
  startDate = picker.selectedDates[0];
  timer.start(startDate);


  if (timer.startDate === new Date()){
    console.log('timer.startDate === new Date()', (timer.startDate === new Date()))
    timer.stop();
  }
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000));
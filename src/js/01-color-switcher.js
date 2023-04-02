const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}


refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

const DELAY_TIME = 1000;
let intervalId = null;
let isActive = false;

function onStartBtnClick(event){
    if (isActive){
        return;
    }

    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, DELAY_TIME);

    isActive = true;
}

function onStopBtnClick(event){
    isActive = false;
    console.log('click on stop', isActive);
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

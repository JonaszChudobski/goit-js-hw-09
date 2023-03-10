const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let actualBackground;
let intervalId = null;

stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStart() {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(() => {
    actualBackground = getRandomHexColor();
    document.body.style.backgroundColor = actualBackground;
  }, 1000);
}

function onStop() {
  clearInterval(intervalId);
  document.body.style.backgroundColor = actualBackground;
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', onStart);
stopButton.addEventListener('click', onStop);

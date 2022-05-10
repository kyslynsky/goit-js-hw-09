const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId = null;
refs.stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);

function onClickStart() {
  changeBodyColor();
  intervalId = setInterval(changeBodyColor, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onClickStop() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

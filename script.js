const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

ctx.translate(canvas.width / 2, canvas.height / 2);

const scale = 0.636;
const continuity = 20;

const secondHand = {
  width: 2,
  length: 400,
  style: 'red',
};

const minuteHand = {
  width: 6,
  length: 390,
  style: 'black',
};

const hourHand = {
  width: 12,
  length: 300,
  style: 'black',
};

setInterval(() => {
  clear();
  drawTime();
  drawCircle();
}, 1000 / continuity);

function clear() {
  ctx.clearRect(
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
}

function drawTime() {
  const time = new Date();

  const seconds = time.getSeconds();
  let secondPosition =
    seconds + time.getMilliseconds() / continuity / (1000 / continuity);
  drawHand(secondHand, secondPosition);

  const minutes = time.getMinutes();
  let minutePosition = minutes + seconds / 60;
  drawHand(minuteHand, minutePosition);

  const hours = time.getHours();
  let hourPosition = hours < 12 ? hours : hours - 12;
  hourPosition = (hourPosition + minutes / 60) * 5;
  drawHand(hourHand, hourPosition);
}

function drawHand(hand, position) {
  const angle = -Math.PI / 2 + (Math.PI / 60) * (Math.PI * position * scale);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(angle) * hand.length, Math.sin(angle) * hand.length);
  ctx.lineWidth = hand.width;
  ctx.strokeStyle = hand.style;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(0, 0, 25, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.stroke();
}

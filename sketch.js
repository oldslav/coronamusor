let hero;
let cops = [];

let sallySprite;
let sallyIdle;
let sallyLeft;
let sallyRight;

let toLeft = [];
let toRight = [];
let idle = [];

let copSprite;
let copData;

let copMovement = [];

let time = 0;
let bg;

let timer;

let copsSpeed = 1;
let releaseRate = 40;
let acceleration = 5;

function preload() {
  sallyIdle = loadJSON("sprites/idle.json");
  sallyLeft = loadJSON("sprites/left.json");
  sallyRight = loadJSON("sprites/right.json");
  copData = loadJSON("sprites/cop.json");
  copSprite = loadImage("sprites/Cop.png");
  sallySprite = loadImage("sprites/Sally.png");
  bg = loadImage("bg.jpg");
}

function reset() {
  cops = [];
  copsSpeed = 1;
  releaseRate = 40;
  acceleration = 5;
  time = 0;
  hero = new Hero(width / 2, height - 150, acceleration, idle, toLeft, toRight);
  clearInterval(timer);
  timer = setInterval(secondPassed, 1000);
  loop();
}

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  const copFrames = copData.frames;
  copFrames.forEach((frame) => {
    const pos = frame.position;
    const img = copSprite.get(pos.x, pos.y, pos.w, pos.h);
    copMovement.push(img);
  });

  const leftFrames = sallyLeft.frames;
  const rightFrames = sallyRight.frames;
  const idleFrames = sallyIdle.frames;

  for (i = 0; i < 4; i++) {
    const lPos = leftFrames[i].position;
    const rPos = rightFrames[i].position;
    const iPos = idleFrames[i].position;

    const lImg = sallySprite.get(lPos.x, lPos.y, lPos.w, lPos.h);
    const rImg = sallySprite.get(rPos.x, rPos.y, rPos.w, rPos.h);
    const iImg = sallySprite.get(iPos.x, iPos.y, iPos.w, iPos.h);

    toLeft.push(lImg);
    toRight.push(rImg);
    idle.push(iImg);
  }

  reset();
}

function draw() {
  background(bg, 125);
  hero.update();
  convay();
  cops.forEach((cop, index) => {
    cop.show();
    cop.update();
    if (cop.fine(hero)) {
      noLoop();
      alert(`Тебя оштрафовали через ${getTime()}, забрали последние монеты.`);
      reset();
    }

    if (cop.body.y > height) {
      cops.splice(index, 1);
    }
  });
  textSize(42);
  fill(255);
  text(getTime(), 32, 64);

  speedUp();
  releaseMore();
}

function speedUp() {
  if (frameCount % 500 === 0) {
    if (copsSpeed <= 15) {
      copsSpeed++;
    }
  }
}

function releaseMore() {
  if (frameCount % 1000 === 0) {
    if (acceleration < 10) {
      acceleration++;
      hero.setAcceleration(acceleration);
    }

    if (releaseRate > 2) {
      releaseRate /= 2;
    }
  }
}

function convay() {
  if (frameCount % releaseRate === 0 || frameCount === 1) {
    cops.push(new Cop(random(32, width - 32), -64, copsSpeed, copMovement));
  }
}

function secondPassed() {
  time++;
}

function getTime() {
  return `${getMinutes()}:${getSeconds()}`;
}

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function getMinutes() {
  return pad(Math.trunc(time / 60));
}

function getSeconds() {
  return this.pad(Math.trunc(time % 60));
}

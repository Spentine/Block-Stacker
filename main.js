import { Position, Kick, Mino, Piece, RotationSystem, Stacker } from "./stacker/stacker.js"

const settings = {
  "ver": 1, // settings version for backwards compatibility
  "handling": { // handling is in ms
    "das": 100,
    "arr": 16,
    "sdf": 30,
    "dcd": 0,
    "are": 0,
    "lca": 0, // line clear ARE
  },
  "dimensions": {
    "width": 10,
    "height": 40,
    "spawnHeight": 22, // from bottom
    "renderHeight": 25, // from bottom
  },
  "gameSettings": {
    "seed": 1,
    "rotationSystem": "SRS",
    "gravity": 0.00002, // minos fallen per ms
    "gravityIncrease": 0.000000007, // multiply by elapsed ms and add to gravity
    "lockDelay": 250, // ms until locks
  },
  "gamePermissions": {
    "allow180": true,
    "hardDropAllowed": true,
    "holdAllowed": true,
    "infiniteMovement": false,
  },
  "userSettings": {
    "next": 5,
    "ghost": true,
  },
};

const game = new Stacker(settings);

const buttonMap = { // map button IDs to functions
  DASleft: () => game.DASMove(new Position([-1, 0])),
  left: () => game.moveIfPossible(new Position([-1, 0])),
  right: () => game.moveIfPossible(new Position([1, 0])),
  DASright: () => game.DASMove(new Position([1, 0])),

  hardDrop: () => {
    game.DASMove(new Position([0, 1]));
    game.placePiece();
  },
  softDrop: () => game.moveIfPossible(new Position([0, 1])),
  sonicDrop: () => game.DASMove(new Position([0, 1])),

  ccw: () => game.rotate((game.piece.rotation + 3) % 4),
  r180: () => game.rotate((game.piece.rotation + 2) % 4),
  cw: () => game.rotate((game.piece.rotation + 1) % 4),

  hold: () => game.holdPiece(),
  
  update: () => update()
};

// handle button clicks
function handleButtonClick(buttonId) {
  if (buttonMap[buttonId]) {
    buttonMap[buttonId]();
    update(); // update after each button click
  }
}

function update() {
  const cRender = document.getElementById('render');
  const ctx = cRender.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 200, 400);
} 

Object.keys(buttonMap).forEach(buttonId => {
  document.getElementById(buttonId).addEventListener('click', () => handleButtonClick(buttonId));
});

addEventListener("DOMContentLoaded", (event) => {
  update();
});

const keyMappings = {
  "ArrowLeft": "left",
  "ArrowRight": "right",
  "ArrowDown": "softDrop",
  "Space": "hardDrop",
  "ArrowUp": "CW",
  "KeyX": "CW",
  "KeyZ": "CCW",
  "KeyA": "180",
  "KeyC": "hold",
};
const keyMappingKeys = Object.keys(keyMappings);

const keyDetect = {};
const keyLength = {};
var lastFrame = Date.now();

for (let i in Object.keys(keyMappings)) {
  keyDetect[keyMappingKeys[i]] = null;
  keyLength[keyMappingKeys[i]] = null;
}

function tickFrame() {
  
  for (let i in Object.keys(keyDetect)) {
    i = keyMappingKeys[i]
    keyLength[i] = keyDetect[i] === null ? null : Date.now() - keyDetect[i]
  }
  
  game.tick(keyLength, Date.now() - lastFrame);
  // update();
  lastFrame = Date.now();
  
  
  window.requestAnimationFrame(tickFrame);
}

function keyDown(e) {
  if (!e.repeat) {
    keyDetect[e.code] = Date.now();
  }
}

function keyUp(e) {
  keyDetect[e.code] = null;
}

window.requestAnimationFrame(tickFrame);
document.onkeydown = keyDown;
document.onkeyup = keyUp;
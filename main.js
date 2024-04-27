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

function update() {
  const cRender = document.getElementById('render');
  cRender.width = window.innerWidth;
  cRender.height = window.innerHeight;
  const ctx = cRender.getContext("2d");
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, cRender.width, cRender.height);
  
} 

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
  update();
  lastFrame = Date.now();
  
  
  window.requestAnimationFrame(tickFrame);
}

// listeners and stuff

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
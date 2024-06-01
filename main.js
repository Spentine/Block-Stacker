import { Position, Kick, Mino, Piece, RotationSystem, Stacker } from "./stacker/stacker.js"
import { GameRenderer } from "./render.js"
import { InputHandler } from "./input.js"

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

const game = new Stacker(settings);
const inputHandler = new InputHandler(keyMappings);
const renderer = new GameRenderer();

function DOMLoaded(event) {
  const cRender = document.getElementById('render');
  renderer.useCanvas(cRender);
}

function update() {
  renderer.renderScreen();
}

var lastFrame = Date.now();
var lastInputs = inputHandler.getInputs();

function tickFrame() {
  
  const inputs = inputHandler.getInputs();
  // console.log(inputs);
  game.tick(inputs, lastInputs, Date.now() - lastFrame);
  console.log(game.consoleRender());
  update();
  lastFrame = Date.now();
  lastInputs = structuredClone(inputs);
  
  window.requestAnimationFrame(tickFrame);
}

window.requestAnimationFrame(tickFrame);
document.onkeydown = function (e) { inputHandler.keyDown(e) };
document.onkeyup = function (e) { inputHandler.keyUp(e) };
addEventListener("DOMContentLoaded", DOMLoaded);
import { Position, Kick, Mino, Piece, RotationSystem, Stacker } from "./stacker/stacker.js"
import { render } from "./render.js"
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

function update() {
  render();
} 

addEventListener("DOMContentLoaded", (event) => {
  update();
});

var lastFrame = Date.now();

function tickFrame() {
  // console.log(inputHandler.getInputs());
  game.tick(inputHandler.getInputs(), Date.now() - lastFrame);
  update();
  lastFrame = Date.now();
  
  window.requestAnimationFrame(tickFrame);
}

window.requestAnimationFrame(tickFrame);
document.onkeydown = function (e) { inputHandler.keyDown(e) };
document.onkeyup = function (e) { inputHandler.keyUp(e) };
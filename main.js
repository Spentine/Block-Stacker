import { Position, Kick, Mino, Piece, RotationSystem, Stacker } from "./stacker/stacker.js"
import { SRS_mono, SRS_color } from "./stacker/rs.js"
import { GameRenderer } from "./render.js"
import { InputHandler } from "./input.js"

const settings = {
  "ver": 1, // settings version for backwards compatibility
  "handling": { // handling is in ms
    
 // "das": 100,
 // "arr": 16,
    "das": 83,
    "arr": 0,
    
    "sdf": 30,
    "dcd": 0,
    "are": 0,
    "lca": 0, // line clear ARE
  },
  "dimensions": {
    "width": 10,
    "height": 40,
    "visualHeight": 20,
    "spawnHeight": 22, // from bottom
    "renderHeight": 25, // from bottom
  },
  "gameSettings": {
    "seed": 1,
    "rotationSystem": SRS_color,
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
  "KeyA": "r180",
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
  renderer.renderScreen({
    "scene": "game",
    "data": {
      "board": game,
      "miscData": {
        "mousePosition": mousePosition,
      }
    }
  });
}

var lastFrame = Date.now();
var lastInputs = inputHandler.getInputs();

function tickFrame() {
  
  const inputs = inputHandler.getInputs();
  // console.log(inputs);
  game.tick(inputs, lastInputs, Date.now() - lastFrame);
  // console.log(game.consoleRender());
  update();
  lastFrame = Date.now();
  lastInputs = structuredClone(inputs);
  
  window.requestAnimationFrame(tickFrame);
}

const mousePosition = {"x": 0, "y": 0}

function mouseMovement(event) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
}

window.requestAnimationFrame(tickFrame);
document.onkeydown = function (e) { inputHandler.keyDown(e) };
document.onkeyup = function (e) { inputHandler.keyUp(e) };
document.addEventListener("mousemove", mouseMovement);
addEventListener("DOMContentLoaded", DOMLoaded);
import { Position, Kick, Mino, Piece, RotationSystem, Stacker } from "./stacker/stacker.js"
import { SRS_mono, SRS_color } from "./stacker/rs.js"
import { GameRenderer } from "./render.js"
import { InputHandler } from "./input.js"

var settings = {
  "ver": 1, // settings version for backwards compatibility
  "handling": { // handling is in ms
    
 // "das": 100,
 // "arr": 16,
    "das": 83,
    "arr": 0,
    
 // "sdf": 30,
    "sdf": Infinity,
    "msg": 0.001,
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
 // "seed": 0,
    "seed": null,
    "rotationSystem": SRS_color,
 // "gravity": 0.0001, // minos fallen per ms
    "gravity": 0,
    "gravityIncrease": 0.000000007, // multiply by elapsed ms and add to gravity
    
    "levelling": true, // overrides gravity
    "level": 1,
    
 // "lockDelay": 500, // ms until locks
    "lockDelay": 500,
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
// console.log(JSON.stringify(settings));

var keyMappings = {
  "ArrowLeft": "left",
  "ArrowRight": "right",
  "ArrowDown": "softDrop",
  "Space": "hardDrop",
  "ArrowUp": "CW",
  "KeyX": "CW",
  "KeyZ": "CCW",
  "KeyA": "r180",
  "KeyC": "hold",
  "KeyR": "reset",
};

// handle localstorage
var blockStackerStorage = localStorage.getItem("blockStacker");

if (blockStackerStorage) {
  
  try {
    blockStackerStorage = JSON.parse(blockStackerStorage);
  } catch {
    console.log("blockStackerStorage ERROR!");
    console.log(blockStackerStorage);
  }
  
  if (blockStackerStorage.keyMappingOverrides) {
    console.log(blockStackerStorage.keyMappingOverrides);
    keyMappings = blockStackerStorage.keyMappingOverrides;
  }
  if (blockStackerStorage.settingOverrides) {
    settings = blockStackerStorage.settingOverrides;
  }
} else {
  localStorage.setItem("blockStacker", "{}");
}

const game = new Stacker(settings);
const inputHandler = new InputHandler(keyMappings);
const renderer = new GameRenderer();

function DOMLoaded(event) {
  const cRender = document.getElementById('render');
  renderer.useCanvas(cRender);
}

var lastFrame = Date.now();
var lastInputs = inputHandler.getInputs();

function tickFrameGame() {
  const inputs = inputHandler.getInputs();
  // console.log(inputs);
  const gameEvents = game.tick(inputs, lastInputs, Date.now() - lastFrame)
  
  /*
  if (JSON.stringify(gameEvents) !== '{"playing":true}') {
    console.log(gameEvents);
  }
  */
  // console.log(game.consoleRender());
  
  renderer.renderScreen({
    "type": "game",
    "data": {
      "board": game,
      "frameTime": Date.now() - lastFrame,
    }
  });
  
  lastFrame = Date.now();
  lastInputs = structuredClone(inputs);
}

function tickFrame() {
  /*
  renderer.renderScreen({
    "type": "ui",
    "data": {
      "scene": "home",
      "frameTime": Date.now() - lastFrame,
    }
  });
  */
  
  tickFrameGame();
  
  window.requestAnimationFrame(tickFrame);
}

window.requestAnimationFrame(tickFrame);
document.onkeydown = function (e) { inputHandler.keyDown(e) };
document.onkeyup = function (e) { inputHandler.keyUp(e) };
addEventListener("DOMContentLoaded", DOMLoaded);
import { Position, Kick, Mino, Piece, RotationSystem, Stacker } from "./stacker/stacker.js"
import { SRS_mono, SRS_color } from "./stacker/rs.js"
import { GameRenderer } from "./render.js"
import { InputHandler } from "./input.js"

var settings = {
  "version": 1, // settings version for backwards compatibility
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

var userSettings = {
  "version": 1,
  "inGame": {
    "handling": {
      "das": 120,
      "arr": 33,
      "sdf": 10,
      "dcd": 0,
      
      "msg": 0.001,
      "are": 0,
      "lca": 0,
    }
  }
}

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

function saveBlockStackerStorage() {
  blockStackerStorage = {
    "version": 1,
    "userSettings": userSettings,
  };
  
  const savedStorage = structuredClone(blockStackerStorage);
  
  // `Infinity` cannot be saved in JSON, so I subsitute it with -1.
  if (savedStorage.userSettings.inGame.handling.sdf === Infinity) {
    savedStorage.userSettings.inGame.handling.sdf = -1;
  }
  
  localStorage.setItem("blockStacker", JSON.stringify(savedStorage));
}

function loadBlockStackerStorage() {
  blockStackerStorage = JSON.parse(localStorage.getItem("blockStacker"));
  
  if (blockStackerStorage.userSettings.inGame.handling.sdf === -1) {
    blockStackerStorage.userSettings.inGame.handling.sdf = Infinity;
  }
}

// handle localstorage
var blockStackerStorage = undefined;

try {
  loadBlockStackerStorage();
} catch {
  console.log("Unable to read blockStackerStorage");
  localStorage.setItem("blockStacker", "{}");
}

if (blockStackerStorage.userSettings) {
  userSettings = blockStackerStorage.userSettings;
}

saveBlockStackerStorage();

var game = null;
const inputHandler = new InputHandler(keyMappings);
const renderer = new GameRenderer();
var scene = "homeMenu";

function DOMLoaded(event) {
  const cRender = document.getElementById('render');
  renderer.useCanvas(cRender);
  renderer.useKeyMappings(keyMappings);
  renderer.useUserSettings(userSettings);
  renderer.getUiElements();
  renderer.updateScene(scene);
  renderer.saveBlockStackerStorage = saveBlockStackerStorage;
  
  const UIStartElement = document.getElementById('UI-play');
  UIStartElement.addEventListener("click", () => {
    scene = "playMenu";
    renderer.updateScene(scene);
  });
  
  const UIStartMenuBackElement = document.getElementById('UI-playMenu-back');
  UIStartMenuBackElement.addEventListener("click", () => {
    scene = "homeMenu";
    renderer.updateScene(scene);
  });
  
  const UIGamemodesElement = document.getElementById('UI-gamemodes');
  UIGamemodesElement.addEventListener("click", () => {
    scene = "gamemodesMenu";
    renderer.updateScene(scene);
  });
  
  const UIGamemodesMenuBackElement = document.getElementById('UI-gamemodesMenu-back');
  UIGamemodesMenuBackElement.addEventListener("click", () => {
    scene = "playMenu";
    renderer.updateScene(scene);
  });
  
  const UIMarathonElement = document.getElementById('UI-marathon');
  UIMarathonElement.addEventListener("click", () => {
    scene = "game";
    startGame();
    renderer.updateScene(scene);
  });
  
  const UISettingsElement = document.getElementById('UI-settings');
  UISettingsElement.addEventListener("click", () => {
    scene = "settingsMenu";
    startGame();
    renderer.updateScene(scene);
  });
  
  const UISettingsMenuBackElement = document.getElementById('UI-settingsMenu-back');
  UISettingsMenuBackElement.addEventListener("click", () => {
    scene = "homeMenu";
    renderer.updateScene(scene);
  });
  
  const UIKeybindsElement = document.getElementById('UI-keybinds');
  UIKeybindsElement.addEventListener("click", () => {
    scene = "keybindsMenu";
    startGame();
    renderer.updateKeybindButtons();
    renderer.updateScene(scene);
  });
  
  const UIKeybindsMenuBackElement = document.getElementById('UI-keybindsMenu-back');
  UIKeybindsMenuBackElement.addEventListener("click", () => {
    scene = "settingsMenu";
    renderer.updateScene(scene);
  });
  
  const UIHandlingElement = document.getElementById('UI-handling');
  UIHandlingElement.addEventListener("click", () => {
    scene = "handlingMenu";
    startGame();
    renderer.updateHandlingInputs();
    renderer.updateScene(scene);
  });
  
  const UIHandlingMenuBackElement = document.getElementById('UI-handlingMenu-back');
  UIHandlingMenuBackElement.addEventListener("click", () => {
    scene = "settingsMenu";
    renderer.updateScene(scene);
  });
  
  const UIHandlingMenuResetElement = document.getElementById('UI-handlingMenu-reset');
  UIHandlingMenuResetElement.addEventListener("click", () => {
    userSettings.inGame.handling = {
      "das": 120,
      "arr": 33,
      "sdf": 10,
      "dcd": 0,
      
      "msg": 0.001,
      "are": 0,
      "lca": 0,
    };
    
    saveBlockStackerStorage();
    renderer.updateHandlingInputs();
  });
}

var lastFrame;
var lastInputs;

function startGame() {
  
  const playSettings = structuredClone(settings);

  playSettings.handling = userSettings.inGame.handling;

  game = new Stacker(playSettings);
  
  lastFrame = Date.now();
  lastInputs = inputHandler.getInputs();

}

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
  
  if (scene === "game") {
    tickFrameGame();
  } else {
    renderer.renderScreen({
      "type": "ui",
      "data": {
        "scene": scene,
        "frameTime": Date.now() - lastFrame,
      }
    });
  }
  
  window.requestAnimationFrame(tickFrame);
}

window.requestAnimationFrame(tickFrame);
document.onkeydown = function (e) { inputHandler.keyDown(e) };
document.onkeyup = function (e) { inputHandler.keyUp(e) };
addEventListener("DOMContentLoaded", DOMLoaded);
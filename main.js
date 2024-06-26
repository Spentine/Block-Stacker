import { Position, Kick, Mino, Piece, RotationSystem, Stacker } from "./stacker/stacker.js"
import { SRS_mono, SRS_color } from "./stacker/rs.js"
import { GameRenderer } from "./render.js"
import { InputHandler } from "./input.js"
import { gameModes, puzzles } from "./modes.js"

var userSettings = {
  "version": 1,
  "inGame": {
    "handling": {
      "das": 120,
      "arr": 33,
      "sdf": Infinity,
      "dcd": 0,
      
      "msg": 0.001,
      "are": 0,
      "lca": 0,
    },
    "keyMappings": {
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
    },
  }
}

const defaultUserSettings = structuredClone(userSettings);

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
  
  // shorten this later
  
  if (blockStackerStorage.userSettings) {
    userSettings = blockStackerStorage.userSettings;
  } else {
    blockStackerStorage.userSettings = userSettings;
  }
  
  if (blockStackerStorage.userSettings.inGame.keyMappings) {
    userSettings.inGame.keyMappings = blockStackerStorage.userSettings.inGame.keyMappings;
  } else {
    blockStackerStorage.userSettings.inGame.keyMappings = userSettings.inGame.keyMappings;
  }
  
} catch {
  console.log("Unable to read blockStackerStorage");
  localStorage.setItem("blockStacker", "{}");
  saveBlockStackerStorage();
}

var game = null;
const inputHandler = new InputHandler(userSettings.inGame.keyMappings);
const renderer = new GameRenderer();
var scene = "homeMenu";

function DOMLoaded(event) {
  const cRender = document.getElementById('render');
  renderer.useCanvas(cRender);
  renderer.useUserSettings(userSettings);
  renderer.getUiElements();
  renderer.updateScene(scene);
  renderer.startGame = (s, data) => {
    scene = s;
    startGame(data);
    renderer.updateScene(scene);
  }
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
    scene = "game-marathon";
    startGame({
      "mode": "marathon"
    });
    renderer.updateScene(scene);
  });
  
  const UIFortyLinesElement = document.getElementById('UI-fortyLines');
  UIFortyLinesElement.addEventListener("click", () => {
    scene = "game-fortyLines";
    startGame({
      "mode": "fortyLines"
    });
    renderer.updateScene(scene);
  });
  
  const UITrainElement = document.getElementById('UI-train');
  UITrainElement.addEventListener("click", () => {
    scene = "trainMenu";
    renderer.updateTrainingPuzzles();
    renderer.updateScene(scene);
  });
  
  /*
  const UITrainEasyElement = document.getElementById('UI-trainMenu-easy');
  UITrainEasyElement.addEventListener("click", () => {
    scene = "game-puzzleEasy";
    startGame("puzzleEasy");
    renderer.updateScene(scene);
  });
  */
  
  const UITrainMenuBackElement = document.getElementById('UI-trainMenu-back');
  UITrainMenuBackElement.addEventListener("click", () => {
    scene = "playMenu";
    renderer.updateScene(scene);
  });
  
  const UISettingsElement = document.getElementById('UI-settings');
  UISettingsElement.addEventListener("click", () => {
    scene = "settingsMenu";
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
    renderer.updateKeybindButtons();
    renderer.updateScene(scene);
  });
  
  const UIKeybindsMenuBackElement = document.getElementById('UI-keybindsMenu-back');
  UIKeybindsMenuBackElement.addEventListener("click", () => {
    scene = "settingsMenu";
    renderer.updateScene(scene);
  });
  
  const UIKeybindsMenuResetElement = document.getElementById('UI-keybindsMenu-reset');
  UIKeybindsMenuResetElement.addEventListener("click", () => {
    userSettings.inGame.keyMappings = defaultUserSettings.inGame.keyMappings;
    renderer.updateKeybindButtons();
    
    saveBlockStackerStorage();
    renderer.updateHandlingInputs();
  });
  
  const UIHandlingElement = document.getElementById('UI-handling');
  UIHandlingElement.addEventListener("click", () => {
    scene = "handlingMenu";
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
    userSettings.inGame.handling = defaultUserSettings.inGame.handling;
    
    saveBlockStackerStorage();
    renderer.updateHandlingInputs();
  });
}

var lastFrame;
var lastInputs;
var currentPuzzle;
var puzzleSet;

function startGame(data) {
  
  var playSettings = null;
  
  switch (data.mode) {
    case "marathon":
      playSettings = gameModes.marathon;
      break;
    case "fortyLines":
      playSettings = gameModes.fortyLines;
      break;
    case "blitz":
      playSettings = gameModes.blitz;
      break;
    case "puzzleMode":
      puzzleSet = data.puzzleSet;
      
      const randInt = (l) => Math.floor(Math.random() * l);
      
      currentPuzzle = randInt(puzzles[puzzleSet].length);
      while (data.exceptPuzzles.includes(currentPuzzle)) {
        currentPuzzle = randInt(puzzles[puzzleSet].length);
      };
      playSettings = puzzles[puzzleSet][currentPuzzle].outputData();
      break;
  }
  
  startGameSettings(playSettings);
  
  /*
  game = new Stacker(playSettings);
  
  game.setUserSettings(userSettings);
  
  lastFrame = Date.now();
  lastInputs = inputHandler.getInputs();
  */
}

function startGameSettings(settings) {
  game = new Stacker(settings);
  
  game.setUserSettings(userSettings);
  
  lastFrame = Date.now();
  lastInputs = inputHandler.getInputs();
}

function tickFrameGame() {
  const inputs = inputHandler.getInputs();
  // console.log(inputs);
  const gameEvents = game.tick(inputs, lastInputs, Date.now() - lastFrame);
  
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
  
  if (scene === "game-puzzleMode") {
    if (game.end){
      if (game.end.ending === "noPieces") {
        console.log("Failed Puzzle " + currentPuzzle);
        startGameSettings(puzzles[puzzleSet][currentPuzzle].outputData());
      } else {
        console.log("Passed Puzzle " + currentPuzzle);
        startGame({
          "mode": "puzzleMode",
          "puzzleSet": puzzleSet,
          "exceptPuzzles": [currentPuzzle],
        });
      }
    }
  }
}

const gameScenes = [
  "game-marathon",
  "game-fortyLines",
  "game-blitz",
];

function tickFrame() {
  
//if (gameScenes.includes(scene)) {
  if (scene.substring(0, 5) === "game-") {
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
document.addEventListener("keydown", function (e) { inputHandler.keyDown(e) });
document.addEventListener("keyup", function (e) { inputHandler.keyUp(e) });
document.addEventListener("DOMContentLoaded", DOMLoaded);
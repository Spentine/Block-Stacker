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

var game = new Stacker(settings);

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
  document.getElementById('render').innerHTML = game.consoleRender();
} 

Object.keys(buttonMap).forEach(buttonId => {
  document.getElementById(buttonId).addEventListener('click', () => handleButtonClick(buttonId));
});

addEventListener("DOMContentLoaded", (event) => {
  update();
});
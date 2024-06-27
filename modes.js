import { SRS_mono, SRS_color } from "./stacker/rs.js";

import {
  easyTSDPuzzles,
  twoPieceTSDPuzzles, 
  kaidanTSDPuzzles, 
  STMBCavePuzzles, 
  SZPropPuzzles, 
  MiscPuzzles,
  MiscPuzzlesHard,
} from "./puzzles.js";

// import * as importedPuzzles from "./puzzles.json";

function mirrorPuzzles(pz) {
  const originalLength = pz.length;
  for (let i=0; i<originalLength; i++) {
    const c = pz[i].cloneSelf();
    c.mirrorSelf();
    // console.log(c);
    pz.push(c);
  }
}

function importPuzzlesFromJSON(puzzleSet) {
  for (let i=0; i<puzzleSet.length; i++) {
    puzzleSet[i] = new Puzzle(puzzleSet[i]);
  }
}

const template = {
  "version": 1, // settings version for backwards compatibility
  
  "handling": { // handling is in ms
    "das": 100,
    "arr": 16,
    "sdf": 30,
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
    
    "startingBoard": null,
    "startingQueue": null,
    "customQueueType": null,
    /*
    if startingQueue is not null:
    
    - "repeating": will repeat the queue forever
    - null: will simply append 7bag afterwards
    - "ending": will not generate any more pieces
    */
    "endCondition": null,
    // end condition for game
  },
  
  "gamePermissions": {
    "allow180": true,
    "hardDropAllowed": true,
    "holdAllowed": true,
    "infiniteMovement": false,
  },
  
  "userSettings": {
    "next": 5, 
  },
};

const gameModes = {
  "marathon": {
    "version": 1, // settings version for backwards compatibility
    
    "handling": { // handling is in ms
      "das": 100,
      "arr": 16,
      "sdf": 30,
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
      "seed": null,
      "rotationSystem": SRS_color,
      "gravity": 0,
      "gravityIncrease": 0.000000007,
      
      "levelling": true,
      "level": 1,
      "lockDelay": 500, 
      
      "startingBoard": null,
      "startingQueue": null,
      "customQueueType": null,
      "endCondition": null,
    },
    
    "gamePermissions": {
      "allow180": true,
      "hardDropAllowed": true,
      "holdAllowed": true,
      "infiniteMovement": false,
    },
    
    "userSettings": {
      "next": 5, 
    },
  },
  "fortyLines": {
    "version": 1, // settings version for backwards compatibility
    
    "handling": { // handling is in ms
      "das": 100,
      "arr": 16,
      "sdf": 30,
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
      "seed": null,
      "rotationSystem": SRS_color,
      "gravity": 0.001,
      "gravityIncrease": 0.000000007,
      
      "levelling": false,
      "level": 1,
      "lockDelay": 500, 
      
      "startingBoard": null,
      "startingQueue": null,
      "customQueueType": null,
      "endCondition": function () {
        if (this.stats.linesCleared < 40) {
          return false;
        } else {
          return {
            "ending": "40l",
            "timeStamp": Date.now(),
          }
        }
      },
    },
    
    "gamePermissions": {
      "allow180": true,
      "hardDropAllowed": true,
      "holdAllowed": true,
      "infiniteMovement": false,
    },
    
    "userSettings": {
      "next": 5, 
    },
  }
}

class Puzzle {
  constructor(settings) {
    this.type = settings.type;
    this.setBoard(settings.board);
    this.pieces = settings.pieces;
    this.data = settings.data;
    /*
      "sendLines"
      "requiredClear"
    */
  }
  
  setBoard(board) {
    
    // whatever height the input board is, resize it to be 40
    while (board.board.length < 40) {
      board.board.splice(1, 0, [0,0,0,0,0,0,0,0,0,0]);
    }
    
    if (board.type === "mono") {
      for (let y=0; y<board.board.length; y++) {
        for (let x=0; x<board.board[0].length; x++) {
          if (board.board[y][x] === 1) {
            board.board[y][x] = 8; // garbage mino
          }
        }
      }
    } else {
      
    }
    
    this.board = board;
  }
  
  cloneSelf() {
    const c = new Puzzle({
      "type": this.type,
      "board": {
        "board": structuredClone(this.board.board),
        "type": null,
      },
      "pieces": structuredClone(this.pieces),
      "data": structuredClone(this.data),
    });
    
    return c;
  }
  
  mirrorSelf() {
    // mirror board
    const w = this.board.board[0].length;
    for (let y=0; y<this.board.board.length; y++) {
      for (let x=0; x<w/2; x++) {
        const t = this.board.board[y][x];
        this.board.board[y][x] = this.board.board[y][w-1-x];
        this.board.board[y][w-1-x] = t;
      }
    }
    
    const mirrorMap = {
      "Z": "S",
      "L": "J",
      "O": "O",
      "S": "Z",
      "I": "I",
      "J": "L",
      "T": "T",
    }
    // mirror pieces
    for (let i=0; i<this.pieces.length; i++) {
      this.pieces[i] = mirrorMap[this.pieces[i]];
    }
  }
  
  outputJSON() {
    const j = {
      "type": this.type,
      "board": {
        "board": this.board.board,
        "type": null,
      },
      "pieces": this.pieces,
      "data": this.data,
    }
    return JSON.stringify(j);
  }
  
  outputData() {
    const requiredLines = this.data.requiredLines;
    
    var holdAllowed = true; // could be collapsed into ternary
    if (this.data.hold === false) {
      holdAllowed = false;
    }
    
    return {
      "version": 1,
      
      "handling": {},
      
      "dimensions": {
        "width": 10,
        "height": 40,
        "visualHeight": 20,
        "spawnHeight": 22,
        "renderHeight": 25,
      },
      
      "gameSettings": {
        "seed": 0,
        "rotationSystem": SRS_color,
        "gravity": 0,
        "gravityIncrease": 0, // multiply by elapsed ms and add to gravity
        
        "levelling": false, // overrides gravity
        "level": 1,
        
        "lockDelay": 500, 
        
        "startingBoard": this.board.board,
        "startingQueue": this.pieces,
        "customQueueType": "ending",
        "endCondition": function () {
          if (this.stats.linesSent < requiredLines) {
            return false;
          } else {
            return {
              "ending": "puzzleSolved",
              "timeStamp": Date.now(),
            }
          }
        },
      },
      
      "gamePermissions": {
        "allow180": true,
        "hardDropAllowed": true,
        "holdAllowed": holdAllowed,
        "infiniteMovement": false,
      },
      
      "userSettings": {
        "next": 5, 
      },
    }
  }
}

importPuzzlesFromJSON(easyTSDPuzzles);
importPuzzlesFromJSON(twoPieceTSDPuzzles);
importPuzzlesFromJSON(kaidanTSDPuzzles);
importPuzzlesFromJSON(STMBCavePuzzles);
importPuzzlesFromJSON(SZPropPuzzles);
importPuzzlesFromJSON(MiscPuzzles);
importPuzzlesFromJSON(MiscPuzzlesHard);

mirrorPuzzles(easyTSDPuzzles);
mirrorPuzzles(twoPieceTSDPuzzles);
mirrorPuzzles(kaidanTSDPuzzles);
mirrorPuzzles(STMBCavePuzzles);
mirrorPuzzles(SZPropPuzzles);

const mediumTSDPuzzles = [...twoPieceTSDPuzzles, ...kaidanTSDPuzzles, ...STMBCavePuzzles, ...SZPropPuzzles];

const puzzles = {
  "easyTSDPuzzles": easyTSDPuzzles,
  "twoPieceTSDPuzzles": twoPieceTSDPuzzles,
  "kaidanTSDPuzzles": kaidanTSDPuzzles,
  "STMBCavePuzzles": STMBCavePuzzles,
  "SZPropPuzzles": SZPropPuzzles,
  "mediumTSDPuzzles": mediumTSDPuzzles,
  "MiscPuzzles": MiscPuzzles,
  "MiscPuzzlesHard": MiscPuzzlesHard,
};

export { Puzzle, gameModes, puzzles };
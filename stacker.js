{
  const SRSKicks = [
    [
      [
        [0, 0], 
      ],
      [
        [0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2],
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], [1, 0], [1, -1], [0, 2], [1, 2],
      ],
    ],
    [
      [
        [0, 0], [1, 0], [1, 1], [0, -2], [1, -2],
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], [1, 0], [1, 1], [0, -2], [1, -2],
      ],
      [
        [0, 0], 
      ],
    ],
    [
      [
        [0, 0], 
      ],
      [
        [0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2],
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], [1, 0], [1, -1], [0, 2], [1, 2],
      ],
    ],
    [
      [
        [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], 
      ],
      [
        [0, 0], 
      ],
    ],
  ]
  
  const noKicks = [
    [
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
    ],
    [
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
    ],
    [
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
    ],
    [
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], 
      ],
    ],
  ]
  
  const IKicks = [
    [
      [
        [0, 0], 
      ],
      [
        [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1], 
      ],
    ],
    [
      [
        [0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2], 
      ],
      [
        [0, 0],
      ],
      [
        [0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1], 
      ],
      [
        [0, 0], 
      ],
    ],
    [
      [
        [0, 0], 
      ],
      [
        [0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2], 
      ],
    ],
    [
      [
        [0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1], 
      ],
      [
        [0, 0], 
      ],
      [
        [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2], 
      ],
      [
        [0, 0], 
      ],
    ],
  ]
  
  SRS = [
    {
      "name": "Z",
      "rotations": [
        [
          [1, 1, 0,],
          [0, 1, 1,],
          [0, 0, 0,],
        ],
        [
          [0, 0, 1,],
          [0, 1, 1,],
          [0, 1, 0,],
        ],
        [
          [0, 0, 0,],
          [1, 1, 0,],
          [0, 1, 1,],
        ],
        [
          [0, 1, 0,],
          [1, 1, 0,],
          [1, 0, 0,],
        ],
      ],
      "kicks": SRSKicks,
      "spawnPosition": [3, -1],
    },
    {
      "name": "L",
      "rotations": [
        [
          [0, 0, 1,],
          [1, 1, 1,],
          [0, 0, 0,],
        ],
        [
          [0, 1, 0,],
          [0, 1, 0,],
          [0, 1, 1,],
        ],
        [
          [0, 0, 0,],
          [1, 1, 1,],
          [1, 0, 0,],
        ],
        [
          [1, 1, 0,],
          [0, 1, 0,],
          [0, 1, 0,],
        ],
      ],
      "kicks": SRSKicks,
      "spawnPosition": [3, -1],
    },
    {
      "name": "O",
      "rotations": [
        [
          [1, 1],
          [1, 1],
        ],
        [
          [1, 1],
          [1, 1],
        ],
        [
          [1, 1],
          [1, 1],
        ],
        [
          [1, 1],
          [1, 1],
        ],
      ],
      "kicks": noKicks,
      "spawnPosition": [4, -1],
    },
    {
      "name": "S",
      "rotations": [
        [
          [0, 1, 1,],
          [1, 1, 0,],
          [0, 0, 0,],
        ],
        [
          [0, 1, 0,],
          [0, 1, 1,],
          [0, 0, 1,],
        ],
        [
          [0, 0, 0,],
          [0, 1, 1,],
          [1, 1, 0,],
        ],
        [
          [1, 0, 0,],
          [1, 1, 0,],
          [0, 1, 0,],
        ],
      ],
      "kicks": SRSKicks,
      "spawnPosition": [3, -1],
    },
    {
      "name": "I",
      "rotations": [
        [
          [0, 0, 0, 0,],
          [1, 1, 1, 1,],
          [0, 0, 0, 0,],
          [0, 0, 0, 0,],
        ],
        [
          [0, 0, 1, 0,],
          [0, 0, 1, 0,],
          [0, 0, 1, 0,],
          [0, 0, 1, 0,],
        ],
        [
          [0, 0, 0, 0,],
          [0, 0, 0, 0,],
          [1, 1, 1, 1,],
          [0, 0, 0, 0,],
        ],
        [
          [0, 1, 0, 0,],
          [0, 1, 0, 0,],
          [0, 1, 0, 0,],
          [0, 1, 0, 0,],
        ],
      ],
      "kicks": IKicks,
      "spawnPosition": [3, -1],
    },
    {
      "name": "J",
      "rotations": [
        [
          [1, 0, 0,],
          [1, 1, 1,],
          [0, 0, 0,],
        ],
        [
          [0, 1, 1,],
          [0, 1, 0,],
          [0, 1, 0,],
        ],
        [
          [0, 0, 0,],
          [1, 1, 1,],
          [0, 0, 1,],
        ],
        [
          [0, 1, 0,],
          [0, 1, 0,],
          [1, 1, 0,],
        ],
      ],
      "kicks": SRSKicks,
      "spawnPosition": [3, -1],
    },
    {
      "name": "T",
      "rotations": [
        [
          [0, 1, 0,],
          [1, 1, 1,],
          [0, 0, 0,],
        ],
        [
          [0, 1, 0,],
          [0, 1, 1,],
          [0, 1, 0,],
        ],
        [
          [0, 0, 0,],
          [1, 1, 1,],
          [0, 1, 0,],
        ],
        [
          [0, 1, 0,],
          [1, 1, 0,],
          [0, 1, 0,],
        ],
      ],
      "kicks": SRSKicks,
      "spawnPosition": [3, -1],
    },
  ]
}

class Position {
  constructor(coords=[0, 0]) {
    this.x = coords[0];
    this.y = coords[1];
  }
  
  add(pos) {
    this.x += pos.x;
    this.y += pos.y;
  }
  
  clone() {
    return new Position([this.x, this.y]);
  }
  
  addPositionReturn(pos) {
    return new Position([this.x + pos.x, this.y + pos.y]);
  }
}

class Mino {
  constructor(coords=new Position(), texture=1) {
    this.position = coords;
    this.texture = texture;
  }
  
  addPosition(pos) {
    this.position.x += pos.x;
    this.position.y += pos.y;
  }
  
  clone() {
    return new Mino(this.position.clone(), this.texture);
  }
  
  addPositionReturn(pos) {
    return new Position([this.position.x + pos.x, this.position.y + pos.y]);
  }
}

class RNG { // lehmer random number generator
    constructor(seed, a=16807, m=2147483647) { // tetrio numbers
        this.state = seed;
        this.a = a;
        this.m = m;
    }

    next() {
        this.state = (this.a * this.state) % this.m;
        return this.state;
    }

    uniform() {
        return this.next() / this.m;
    }
}

class Piece { // handles kicks and rotations of piece
  constructor(settings={"name": null, "rotations": null, "kicks": null, "spawnPosition": null}) {
    
    // the kicks are simply too large to shove all in one line
    // to keep consistency i made every default value null
    
    // init values
    this.name = settings.name === null ? "" : settings.name;
    this.rotations = settings.rotations === null ? [[], [], [], []] : settings.rotations;
    this.kicks = settings.kicks === null ? [
      [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]],
      [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]],
      [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]],
      [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]],
    ] : settings.kicks;
    this.spawnPosition = settings.spawnPosition === null ? new Position() : new Position(settings.spawnPosition);
    
    // convert piecegrid into a list of minos
    this.rotations = this.rotations.map((x) => {
      let i = [];
      for (let y=0; y<x.length; y++) { // update to use .forEach
        for (let z=0; z<x[y].length; z++) {
          if (x[y][z] !== 0) {
            i.push(new Mino(new Position([z, y]), x[y][z]));
          }
        }
      };
      return i;
    });
    
    // convert kicks into positions
    this.kicks = this.kicks.map((x) => x.map((y) => y.map((z) => new Position(z))));
  }
}

class RotationSystem { // rotation systems contain pieces
  constructor(rs=null) {
    
    this.pieceNames = [];
    
    if (rs === null) { // initializes an empty rotation system
      return null;
    }
    
    for (let i=0; i<rs.length; i++) {
      let piece = rs[i];
      this.pieceNames.push(piece.name);
      this[piece.name] = new Piece(piece);
    }
  }
}

class Stacker {
  
  clearLines() {
    let cleared = 0;
    this.board.forEach((row, index) => { // for each row
      if (row.every((p) => p !== 0)) { // if the row doesn't have any empty spaces
        cleared += 1;
        this.board.splice(index, 1); // delete the row
        this.board.splice(0, 0, Array.from({ length: this.c.width }, () => 0)); // insert empty row at top of board
      }
    });
    return cleared;
  }
  
  bag(pieces=this.c.rotationSystem.pieceNames) {
    while (pieces.length > 0) {
      let x = Math.floor(this.RNG.uniform() * pieces.length); // chooses a random item of the pieces
      this.next.push(pieces[x]);
      pieces.splice(x, 1);
    }
  }
  
  updateNext(pieces=this.c.rotationSystem.pieceNames) {
    while (this.next.length < this.c.next) {
      this.bag([...pieces]); // duplicates pieces and then uses it as input
    }
  }
  
  movePiece(position=this.piece.position, rotation=this.piece.rotation, pieceName=this.piece.name) {
    const pieceData = this.c.rotationSystem[pieceName];
    this.piece.position = position; // set position of the piece
    this.piece.rotation = rotation; // set rotation of the piece
    this.piece.name = pieceName; // sets name of the piece
    
    // offsets piece positions so that the piece is at the correct location 
    this.piece.minos = pieceData.rotations[rotation].map((x) => {
      let p = x.clone(); // clones mino position
      p.addPosition(this.piece.position); // offsets by piece position
      return p;
    });
  }
  
  generatePiece(pieceName) {
    this.piece = {}; // initializes a dictionary
    const pieceData = this.c.rotationSystem[pieceName]; // gets piece data for spawn offset
    
    // moves piece to starting position using various offsets and initialize other values
    this.movePiece(new Position([pieceData.spawnPosition.x,pieceData.spawnPosition.y+this.c.height-this.c.spawnHeight]),0,pieceName);
    
    if (!this.pieceValid()) {
      this.playing = false;
      return false;
    }
    
    return true;
  }
  
  newPiece() {
    this.generatePiece(this.next[0]); // set current piece to next piece
    this.next.splice(0, 1); // remove next piece from next queue
    this.updateNext(); // update next queue
  }
  
  placePiece() {
    this.piece.minos.forEach((mino) => { // set minos on the board
      this.board[mino.position.y][mino.position.x] = mino.texture; // set the mino position to the texture
    });
    
    this.clearLines(); // clear lines
    this.newPiece(); // load next piece
    this.hold.did = 0; // reset hold disable   
  }
  
  boardPosition(position) {
    // if out of bounds return -1
    if (position.x < 0 || position.x >= this.c.width || position.y < 0 || position.y >= this.c.height) {
      return -1;
    }
    return this.board[position.y][position.x];
  }
  
  // check if a piece in a certain position is valid
  pieceValid(position=this.piece.position, rotation=this.piece.rotation, pieceName=this.piece.name) {
    return this.c.rotationSystem[pieceName].rotations[rotation].every((mino) => { // for each mino in the piece, check if every mino
      return this.boardPosition(mino.addPositionReturn(position)) === 0; // isn't intersecting a block (0), and return this value
    });
  }
  
  // move current piece to a position if possible
  positionIfPossible(position=this.piece.position, rotation=this.piece.rotation, pieceName=this.piece.name) {
    if (this.pieceValid(position, rotation, pieceName)) {
      this.movePiece(position, rotation, pieceName);
      return true;
    }
    return false;
  }
  
  moveIfPossible(position=new Position([0, 0])) {
    return game.positionIfPossible(game.piece.position.addPositionReturn(position));
  }
  
  DASMove(offset) {
    let i = true;
    while (i) { // while it can move
      i = this.positionIfPossible(this.piece.position.addPositionReturn(offset)); // move it it can
    }
  }
  
  holdPiece() {
    const prevhold = this.hold.pieceName; // get held piece
    this.hold.pieceName = this.piece.name; // current piece is held
    this.hold.did += 1; // incement amount of times held
    
    if (prevhold === null) { // if we were holding nothing
      this.newPiece(); // generate a new piece
    } else { // if we were holding something
      this.generatePiece(prevhold); // generate what was being held
    }
    return true; // successful
  }
  
  rotate(rotation) { // rotation isn't delta
    for (const kick of this.c.rotationSystem[this.piece.name].kicks[this.piece.rotation][rotation]) {
      const pos = this.piece.position.addPositionReturn(kick);
      if (this.pieceValid(pos, rotation)) {
        this.movePiece(pos, rotation);
        return true;  // Return true if any kick is valid
      }
    }
    return false;
  }
  
  consoleRender() {
    let output = []; // it's a list so that the current piece minos can modify it
    
    this.board.forEach((i, index) => {
      if (index >= this.c.height - this.c.renderHeight) {
        output.push("|");
        i.forEach((j) => {
          if (j === 0) {
            output.push("  "); // nothing
          } else {
            output.push("[]"); // block
          }
        });
        output.push("|\n");
      }
    });
    
    this.piece.minos.forEach((i) => {
      if (i.position.y >= this.c.height - this.c.renderHeight) { // if in render bounds
        output[1 + i.position.x + 12 * (i.position.y - this.c.height + this.c.renderHeight)] = "()";
      }
    });
    
    output = output.join(''); // turn list into string
    
    output += "HOLD: " + this.hold.pieceName;
    output += "\nNEXT: ";
    this.next.forEach((i) => {
      output += i; // next pieces
    });
    
    output += "\nSCORE: " + this.score;
    
    return output;
  }
  
  constructor(settings) {
    /*
      builds the block stacker game
    */
    switch (settings.ver) {
      case 1: // version 1 of settings
        
        /*
        this.c contains constants
        */
        
        // handling
        this.c = {};
        this.c.das = settings.handling.das;
        this.c.arr = settings.handling.arr;
        this.c.sdf = settings.handling.sdf;
        this.c.dcd = settings.handling.dcd;
        this.c.are = settings.handling.are;
        this.c.lca = settings.handling.lca; // line clear ARE
        
        // dimensions
        this.c.width = settings.dimensions.width;
        this.c.height = settings.dimensions.height;
        this.c.spawnHeight = settings.dimensions.spawnHeight; // from bottom
        this.c.renderHeight = settings.dimensions.renderHeight; // from bottom
        
        // game settings
        this.RNG = new RNG(settings.gameSettings.seed); // not constant
        
        let rs = settings.gameSettings.rotationSystem
        if (rs === "SRS") {
          this.c.rotationSystem = new RotationSystem(SRS);
        } else {
          this.c.rotationSystem = new RotationSystem(settings.gameSettings.rotationSystem);
        }
        
        this.c.gravity = settings.gameSettings.gravity;
        this.c.gravityIncrease = settings.gameSettings.gravityIncrease;
        this.c.lockDelay = settings.gameSettings.lockDelay;
        
        // game permissions
        this.c.allow180 = settings.gamePermissions.allow180;
        this.c.hardDropAllowed = settings.gamePermissions.hardDropAllowed;
        this.c.holdAllowed = settings.gamePermissions.holdAllowed;
        this.c.infiniteMovement = settings.gamePermissions.infiniteMovement;
        
        // user settings
        this.c.next = settings.userSettings.next;
        this.c.ghost = settings.userSettings.ghost;
    }
    
    // this code does some dark magic that initializes a board with a width and height
    this.board = Array.from({ length: this.c.height }, () => Array.from({ length: this.c.width }, () => 0));
    this.next = [];
    this.hold = {"pieceName": null, "did": 0};
    this.score = 0;
    this.time = 0;
    this.piece = null;
    this.playing = true; // true: game still going; false: game end
    
    this.updateNext();
    this.newPiece();
    this.updateNext();
    
  }
}

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
    "seed": 12345,
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

game = new Stacker(settings);
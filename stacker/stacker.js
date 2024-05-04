import { SRS } from "./rs.js";

console.log("Stacker Initializing")

class Position {
  /*
    specifies many things, e.g.,
    - position on board
    - change in position (vector)
    - position of mino on piece
    - etc.
  */
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

class Kick {
  constructor(position=new Position(), spin=2) {
    this.position = position;
    this.spin = spin;
  }
  
  add(pos) {
    this.position.x += pos.x;
    this.position.y += pos.y;
  }
  
  clone() {
    return new Kick(this.position, this.spin);
  }
  
  addPositionReturn(pos) {
    return new Kick(this.position.addPositionReturn(pos), this.spin);
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

    uniform() { // returns a random number between 0 and 1
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
    
    this.spins = [{}, {}, {}, {}];
    
    // convert piecegrid into a list of minos
    this.rotations = this.rotations.map((x, index) => {
      let minos = [];
      let required = [];
      let spin = [];
      let minispin = [];
      x.forEach((row, y) => row.forEach((gridspot, z) => {
          switch (gridspot) {
            case -1: // required for spins
              required.push(new Position([z, y]));
              break;
            case -2: // full t spin
              spin.push(new Position([z, y]));
              break;
            case -3: // mini t spin
              minispin.push(new Position([z, y]));
              break;
            case 1:
              minos.push(new Mino(new Position([z, y]), x[y][z]));
              break;
          }
      }));
      
      if (required.length !== 0) {
        this.spins[index].required = required;
      }
      if (spin.length !== 0) {
        this.spins[index].spin = spin;
      }
      if (minispin.length !== 0) {
        this.spins[index].minispin = minispin;
      }
      
      return minos;
    });
    
    // convert kicks into positions
    this.kicks = this.kicks.map((x) => x.map((y) => y.map((z) => {
      if (Array.isArray(z)) { // if it is just a position specified
        return new Kick(new Position(z), 0); // assume that there is no bonus
      } else { // if it is a kick
        return new Kick(new Position(z.position), z.kick); // initialize new kick with the data
      }
    })));
  }
}

class RotationSystem { // rotation systems contain pieces
  constructor(rs=null) {
    
    this.pieceNames = [];
    
    if (rs === null) { // initializes an empty rotation system
      return null;
    }
    
    rs.forEach((piece) => { // for each piece
      this.pieceNames.push(piece.name); // add it to the list of pieces
      this[piece.name] = new Piece(piece); // add the piece as an attribute
    });
  }
}

class Stacker {
  boardPosition(position) { // calculates value of board position given a Position
    // if out of bounds return -1
    if (position.x < 0 || position.x >= this.c.width || position.y < 0 || position.y >= this.c.height) {
      return -1;
    }
    return this.board[position.y][position.x];
  }
  
  clearLines() { // if there are full lines then remove them
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
  
  bag(pieces=this.c.rotationSystem.pieceNames) { // generate a bag and append it to this.next
    while (pieces.length > 0) {
      let x = Math.floor(this.RNG.uniform() * pieces.length); // chooses a random item of the pieces
      this.next.push(pieces[x]);
      pieces.splice(x, 1);
    }
  }
  
  updateNext(pieces=this.c.rotationSystem.pieceNames) { // update the next pieces
    while (this.next.length < this.c.next) { // while there are less pieces in the queue than the display shows
      this.bag([...pieces]); // duplicates pieces and then uses it as input
    }
  }
  
  movePiece(position=this.piece.position, rotation=this.piece.rotation, pieceName=this.piece.name) {
    const pieceData = this.c.rotationSystem[pieceName]; // get rotation system piece data
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
    
    /*
    0: no spin
    1: mini spin
    2: full spin
    */
    
    this.piece.spin = 0;
    
    if (!this.pieceValid()) { // if something is blocking the spawning piece
      this.playing = false; // end game
      return false; // unsuccessful
    }
    
    return true; // successful
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
  
  // check if a piece in a certain position is valid
  pieceValid(position=this.piece.position, rotation=this.piece.rotation, pieceName=this.piece.name) {
    return this.c.rotationSystem[pieceName].rotations[rotation].every((mino) => { // for each mino in the piece, check if every mino
      return this.boardPosition(mino.addPositionReturn(position)) === 0; // isn't intersecting a block (0), and return this value
    });
  }
  
  // is the position a valid position for spins
  isSpinPosition(position=this.piece.position, rotation=this.piece.rotation, pieceName=this.piece.name) {
    const spinData = this.c.rotationSystem[pieceName].spins[rotation];
    
    if (Object.keys(spinData).length === 0) { // no spin data
      return 0;
    }
    
    // if required blocks are filled
    if (!spinData.required.every((req) => this.boardPosition(position.addPositionReturn(req)) !== 0)) {
      return 0;
    }
    
    if (spinData.spin !== undefined) { // if there is data
      for (const spin of spinData.spin) {
        if (this.boardPosition(position.addPositionReturn(spin)) !== 0) { // if spin blocks are filled
          return 2; // full spin
        }
      }
    }
    
    if (spinData.minispin !== undefined) { // if there is data
      let mini = 0;
      for (const minipos of spinData.minispin) {
        if (this.boardPosition(position.addPositionReturn(minipos)) !== 0) { // if minispin blocks are filled
          mini += 1; // count mini blocks filled
        }
      }
      
      if (mini === spinData.minispin.length && spinData.minispin.length !== 1) { // if every mini block is filled
        return 2; // full spin
      } else if (mini === 0) { // if none are filled
        return 0; // no spin
      } else { // if some are filled
        return 1; // mini spin
      }
    }
    
    return 0; // catch all by giving no reward
  }
  
  // move current piece to a position if possible
  positionIfPossible(position=this.piece.position, rotation=this.piece.rotation, pieceName=this.piece.name) {
    if (this.pieceValid(position, rotation, pieceName)) {
      this.movePiece(position, rotation, pieceName);
      return true;
    }
    return false;
  }
  
  // same as positionIfPossible but with vectors aka delta positions
  moveIfPossible(position=new Position([0, 0])) {
    return this.positionIfPossible(this.piece.position.addPositionReturn(position));
  }
  
  // move continuously in a direction until there is something in the way
  DASMove(offset) {
    let i = true;
    while (i) { // while it can move
      i = this.positionIfPossible(this.piece.position.addPositionReturn(offset)); // move while it can
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
  
  // rotate piece with rotation system
  rotate(rotation) { // rotation isn't delta
    for (const kick of this.c.rotationSystem[this.piece.name].kicks[this.piece.rotation][rotation]) {
      const pos = this.piece.position.addPositionReturn(kick.position); // get resulting position after kick
      if (this.pieceValid(pos, rotation)) { // if the position is valid
        this.movePiece(pos, rotation); // move the current piece to the position
        this.piece.spin = Math.max(kick.spin, this.isSpinPosition()); // evaluate max of piece's position and the kick reward
        return true;  // return true if any kick is valid
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
        output[1 + i.position.x + (this.c.width + 2) * (i.position.y - this.c.height + this.c.renderHeight)] = "()";
      }
    });
    
    output = output.join(''); // turn list into string
    
    output += "HOLD: " + this.hold.pieceName;
    output += " | NEXT: ";
    this.next.forEach((i) => {
      output += i; // next pieces
    });
    
    output += "\nSCORE: " + this.score;
    output += " | SPIN: " + this.piece.spin;
    output += " | PlAYING: " + this.playing;
    
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
  
  tick(keys, timeAdvance) {
    
    // console.log(keys);
    // console.log(timeAdvance);
    
  }
}

export { Position, Kick, Mino, Piece, RotationSystem, Stacker };
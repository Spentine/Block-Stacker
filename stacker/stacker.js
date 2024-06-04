// import { SRS } from "./rs.js";

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
            case 0:
              // do nothing
              break;
            default:
              minos.push(
                new Mino(new Position([z, y]), x[y][z]), // position
              );
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
    this.groundTime = 0;
    
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
    
    const linesCleared = this.clearLines(); // clear lines
    this.stats.piecesPlaced += 1;
    
    if (linesCleared) {
      this.combo += 1;
      this.stats.linesCleared += linesCleared;
      this.updateLevelling()
      
      // calculate points for clearing lines
      var actionPoints;
      
      if (this.piece.spin === 1) { // (t)-spin mini
      
        if (linesCleared === 1) {
          actionPoints = 200;
          this.b2b += 1;
        } 
        if (linesCleared === 2) {
          actionPoints = 400;
          this.b2b += 1;
        } 
        
      } else if (this.piece.spin === 2) { // (t)-spin 
        
        if (linesCleared === 1) {
          actionPoints = 800;
          this.b2b += 1;
        } 
        if (linesCleared === 2) {
          actionPoints = 1200;
          this.b2b += 1;
        }
        if (linesCleared === 3) {
          actionPoints = 1600;
          this.b2b += 1;
        }
        
      } else { // no spin
        
        if (linesCleared === 1) {
          actionPoints = 100;
          this.b2b = 0;
        } else if (linesCleared === 2) {
          actionPoints = 300;
          this.b2b = 0;
        } else if (linesCleared === 3) {
          actionPoints = 500;
          this.b2b = 0;
        } else if (linesCleared === 4) {
          this.b2b += 1;
          actionPoints = 800;
        } else if (linesCleared > 4) {
          console.log("what the fuck"); // change if implementing pentris
        }
        
      }
      
      actionPoints += 50 * this.combo;
      
      const isEmptyBoard = this.board.every((row) => {
        return row.every((mino) => {
          return mino === 0;
        });
      });
      
      if (this.b2b >= 1) {
        actionPoints *= 1.5;
      }
      
      if (linesCleared === 1) {
        actionPoints += 800;
      } else if (linesCleared === 2) {
        actionPoints += 1200;
      } else if (linesCleared === 3) {
        actionPoints += 1800;
      } else if (linesCleared === 4) {
        if (this.b2b >= 1) {
          actionPoints += 3200;
        } else {
          actionPoints += 2000;
        }
      }
      
      this.stats.score += actionPoints * this.levelling.level;
      
    } else {
      this.combo = -1;
      
      // award points for (t)-spins
      
      if (this.piece.spin === 1) { // mini (t)-spin null
        this.stats.score += 100
      } else if (this.piece.spin === 2) { // (t)-spin null
        this.stats.score += 400
      }
    }
    
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
    let j = -1;
    while (i) { // while it can move
      i = this.positionIfPossible(this.piece.position.addPositionReturn(offset)); // move while it can
      j += 1;
    }
    return j;
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
            // output.push("[" + j); // block
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
    
    output += "\nSCORE: " + this.stats.score;
    output += " | SPIN: " + this.piece.spin;
    output += " | PlAYING: " + this.playing;
    
    return output;
  }
  
  updateLevelling() {
    if (this.levelling.on) {
      this.levelling.level = this.levelling.formulas.piecesToLevel(this.stats.linesCleared + this.levelling.formulas.levelToPieces(this.c.level));
      this.gravity = this.levelling.formulas.gravity(this.levelling.level);
      this.lockDelay = this.levelling.formulas.lockDelay(this.levelling.level);
    }
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
        this.c.msg = settings.handling.msg; // minimimum sdf gravity
        this.c.dcd = settings.handling.dcd;
        this.c.are = settings.handling.are;
        this.c.lca = settings.handling.lca; // line clear ARE
        
        // dimensions
        this.c.width = settings.dimensions.width;
        this.c.height = settings.dimensions.height;
        this.c.visualHeight = settings.dimensions.visualHeight;
        this.c.spawnHeight = settings.dimensions.spawnHeight; // from bottom
        this.c.renderHeight = settings.dimensions.renderHeight; // from bottom
        
        // game settings
        if (settings.gameSettings.seed === null) {
          this.RNG = new RNG(Math.floor(Math.random()*0x80000000));
        } else {
          this.RNG = new RNG(settings.gameSettings.seed); // not constant
        }
        
        let rs = settings.gameSettings.rotationSystem
        
        /*
        if (rs === "SRS") {
          this.c.rotationSystem = new RotationSystem(SRS);
        } else {
          this.c.rotationSystem = new RotationSystem(settings.gameSettings.rotationSystem);
        }
        */
        this.c.rotationSystem = new RotationSystem(settings.gameSettings.rotationSystem);
        
        this.c.gravity = settings.gameSettings.gravity;
        this.c.gravityIncrease = settings.gameSettings.gravityIncrease;
        this.c.lockDelay = settings.gameSettings.lockDelay;
        this.c.levelling = settings.gameSettings.levelling;
        this.c.level = settings.gameSettings.level; // starting level
        
        // game permissions
        this.c.allow180 = settings.gamePermissions.allow180;
        this.c.hardDropAllowed = settings.gamePermissions.hardDropAllowed;
        this.c.holdAllowed = settings.gamePermissions.holdAllowed;
        this.c.infiniteMovement = settings.gamePermissions.infiniteMovement;
        
        // user settings
        this.c.next = settings.userSettings.next;
        this.c.ghost = settings.userSettings.ghost;
    }
    this.startGame();
  }
  
  startGame() {
    // this code does some dark magic that initializes a board with a width and height
    this.board = Array.from({ length: this.c.height }, () => Array.from({ length: this.c.width }, () => 0));
    this.next = [];
    this.hold = {"pieceName": null, "did": 0};
    this.time = 0;
    this.softDropTime = 0;
    this.piece = null;
    /*
    
    PIECE FORMAT
    {
    "position": {"x": X-POSITION, "y": Y-POSITION},
    "rotation": 0,
    "name": PIECE NAME,
    "minos": [
        {
            "position": {"x": X-POSITION, "y": Y-POSITION},
            "texture": TEXTURE
        },
    ],
    "spin": SPIN (refer to generatePiece)
    }
    
    */
    this.playing = true; // true: game still going; false: game end
    this.gravity = this.c.gravity; // this.c.gravity is initial gravity
    this.lockDelay = this.c.lockDelay;
    this.groundTime = 0;
    this.combo = -1;
    this.b2b = -1;
    
    this.levelling = {
      "level": this.c.level,
      "on": this.c.levelling,
      "formulas": {
        
        "piecesToLevel": ((linesCleared) => {
          return Math.floor(linesCleared * 0.1) + 1; // new level every 10 lines
        }),
        "levelToPieces": ((level) => {
          return (level - 1) * 10;
        }),
        
        "gravity": ((level) => {
          /*
            == GUIDELINE FALL & DROP SPEEDS ==
            
            secs / line = (0.8 - ((level - 1) * 0.007)) ^ (level - 1)
            
            (ms * 1000) / line = (0.8 - ((level - 1) * 0.007)) ^ (level - 1)
            ms / line = ((0.8 - ((level - 1) * 0.007)) ^ (level - 1)) * 0.001
            ms / line = ((0.807 - 0.007(level)) ^ (level - 1)) * 0.001
            
            \frac{line}{ms} = \frac{0.001}{(0.807 - 0.007(level))^{level-1}}
            
          */
          
          return (0.001/Math.pow(0.807 - 0.007 * level, level - 1));
        }),
        "lockDelay": ((level) => {
          /*
            creates 1/(ax + b) formula based on two points it has to intersect:
            
            a = (1/y2 - 1/y1)/(x2 - x1)
            b = (1/y1) - ax1
          */
          
          if (level > 20) {
            // return (1 / (0.0004 * level - 0.006)); // (40, 100)
            return (1 / (0.00023333333333333333 * level - 0.0026666666666666666));
          } else {
            return 500;
          }
        }),
        
      }
    };
    
    this.stats = {
      "linesCleared": 0,
      "piecesPlaced": 0,
      "score": 0,
      "attack": 0,
    }
    
    this.updateNext();
    this.newPiece();
    this.updateNext();
    this.updateLevelling()
  }
  
  tick(keys, prevKeys, timeAdvance) {
    
    /*
    if (JSON.stringify(keys) != JSON.stringify(prevKeys)) {
      console.log(keys);
    }
    */
    
    // console.log(keys);
    // console.log(timeAdvance);
    
    if (keys.reset && !prevKeys.reset) {
      this.startGame();
    }
    
    if (!this.playing) {
      return false;
    }
    
    if (keys.left !== null || keys.right !== null) { // if a direction key is pressed
      
      if (keys.left < keys.right) { // prioritize key that has been pressed most recently (less time)
        if (keys.left === null) {
          var direction = {"key": "right", "number": 1};
        } else {
          var direction = {"key": "left", "number": -1};
        }
      } else {
        if (keys.right === null) {
          var direction = {"key": "left", "number": -1};
        } else {
          var direction = {"key": "right", "number": 1};
        }
      }
      
      if (prevKeys[direction.key] === null) { // if direction wasnt pressed last time
        /*
          <!> NOTE <!>
          I can not use `!prevKeys[direction.key]` because it has this double-pressing glitch whenever it is equal to 0.
        */
        if (this.moveIfPossible(new Position([direction.number, 0]))) { // move direction one space
          this.groundTime = 0;
        }
      } else { // if direction was held down
        if (keys[direction.key] >= this.c.das) { // if das is activated
          if (this.c.arr === 0) { // if it's instant arr
            if (this.DASMove(new Position([direction.number, 0]))) {; // go instant
              this.groundTime = 0;
            }
          } else {
            
            const initialPress = (prevKeys[direction.key] - this.c.das) / this.c.arr;
            const finalPress = (keys[direction.key] - this.c.das) / this.c.arr;
            const moveAmount = Math.floor(finalPress) - Math.floor(initialPress);
            
            for (let i=0; i<moveAmount; i++) { // move amount of times
              this.groundTime = 0;
              this.moveIfPossible(new Position([direction.number, 0])); // move
            }
          }
        }
      }
    }
    
    if (!this.pieceValid(this.piece.position.addPositionReturn({"x": 0, "y": 1}))) {
      this.groundTime += timeAdvance;
      if (this.groundTime > this.lockDelay) {
        this.placePiece();
      }
    }
    
    if (keys.softDrop) {
      if (this.c.sdf == Infinity) { // if sdf is infinity
        this.stats.score += this.DASMove(new Position([0, 1])); // sonic drop
      } else {
        
        if (!prevKeys.softDrop) {
          this.softDropTime = -1e-3; // feel free to change this to a different number but 0 has floating point error
        }
        
        this.softDropTime += timeAdvance;
        
        const initialPress = this.softDropTime - timeAdvance;
        
        const newGravity = Math.max(this.gravity, this.c.msg) * this.c.sdf;
        
        const moveAmount = Math.floor(this.softDropTime * newGravity) - Math.floor(initialPress * newGravity);
        
        for (let i=0; i<moveAmount; i++) { // move amount of times
          const moved = this.moveIfPossible(new Position([0, 1])); // move
          if (moved) {
            this.stats.score += 1;
          } else {
            i = moveAmount;
          }
        }
      }
    } else {
      this.softDropTime += timeAdvance;
      
      const initialPress = this.softDropTime - timeAdvance;
      const moveAmount = Math.floor(this.softDropTime * this.gravity) - Math.floor(initialPress * this.gravity);
      
      for (let i=0; i<moveAmount; i++) { // move amount of times
        this.moveIfPossible(new Position([0, 1])); // move
      }
    }
    
    if (keys.sonicDrop) {
      this.DASMove(new Position([0, 1]));
    }
    
    if (keys.hardDrop && !prevKeys.hardDrop && this.c.hardDropAllowed) {
      this.stats.score += this.DASMove(new Position([0, 1])) * 2;
      this.placePiece();
    }
    
    if (keys.CW && !prevKeys.CW) {
      if (this.rotate((this.piece.rotation + 1) % 4)) { // rotate clockwise
        this.groundTime = 0; // if it worked then reset lock delay
      }
    }
    
    if (keys.CCW && !prevKeys.CCW) {
      if (this.rotate((this.piece.rotation + 3) % 4)) { // rotate counterclockwise
        this.groundTime = 0; // if it worked then reset lock delay
      }
    }
    
    if (keys.r180 && !prevKeys.r180 && this.c.allow180) { // rotate 180
      if (this.rotate((this.piece.rotation + 2) % 4)) {
        this.groundTime = 0; // if it worked then reset lock delay
      }
    }
    
    if (keys.hold && !prevKeys.hold && this.c.holdAllowed) {
      if (!this.hold.did) {
        this.holdPiece();
      }
    }
    
    this.time += timeAdvance;
    return true;
  }
}

export { Position, Kick, Mino, Piece, RotationSystem, Stacker };
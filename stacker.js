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
          [0, 1, 1,],
          [0, 1, 0,],
          [0, 1, 0,],
        ],
      ],
      "kicks": SRSKicks,
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
    },
  ]
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

    normal() {
        return this.next() / this.m;
    }
}

class Piece { // handles kicks and rotations of piece
  constructor(settings={"name": null, "rotations": null, "kicks": null}) {
    
    // the kicks are simply too large to shove all in one line
    // to keep consistency i made every default value null
    
    this.name = settings.name === null ? "" : settings.name;
    this.rotations = settings.rotations === null ? [[], [], [], []] : settings.rotations;
    this.kicks = settings.kicks === null ? [
      [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]],
      [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]],
      [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]],
      [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]],
    ] : settings.kicks;
    
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
  constructor(settings) {
    /*
      builds the block stacker game
    */
    switch (settings.ver) {
      case 1: // version 1 of settings
        
        // handling
        this.das = settings.handling.das;
        this.arr = settings.handling.arr;
        this.sdf = settings.handling.sdf;
        this.dcd = settings.handling.dcd;
        this.are = settings.handling.are;
        this.lca = settings.handling.lca; // line clear ARE
        
        // dimensions
        this.width = settings.dimensions.width;
        this.height = settings.dimensions.height;
        
        // game settings
        this.seed = new RNG(settings.gameSettings.seed);
        
        let rs = settings.gameSettings.rotationSystem
        if (rs === "SRS") {
          this.rotationSystem = new RotationSystem(SRS);
        } else {
          this.rotationSystem = new RotationSystem(settings.gameSettings.rotationSystem);
        }
        
        this.gravity = settings.gameSettings.gravity;
        this.gravityIncrease = settings.gameSettings.gravityIncrease;
        this.lockDelay = settings.gameSettings.lockDelay;
        
        // game permissions
        this.allow180 = settings.gamePermissions.allow180;
        this.hardDropAllowed = settings.gamePermissions.hardDropAllowed;
        this.holdAllowed = settings.gamePermissions.holdAllowed;
        this.infiniteMovement = settings.gamePermissions.infiniteMovement;
        
        // user settings
        this.next = settings.userSettings.next;
        this.ghost = settings.userSettings.ghost;
    }
    this.time = 0;
    
    // this code does some dark magic that initializes a board with a width and height
    this.board = Array.from({ length: this.height }, () => Array.from({ length: this.width }, () => 0));
    
    
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
function importImage(url) {
  return new Promise((resolve, reject) => {
    const outputImage = new Image();
    outputImage.src = url;
    outputImage.onload = function() {
      resolve(outputImage);
    };
  })
}

const skins = {}

function addSkin(skinName, skinPaths, connected) {
  const skin = {};
  
  const minoSkin = new Image();
  minoSkin.src = skinPaths.minos.src;
  skin.minos = {"src": minoSkin,
    "connected": skinPaths.minos.connected,
    "blockSize": skinPaths.minos.blockSize,
  };
  
  const ghostSkin = new Image();
  ghostSkin.src = skinPaths.ghost.src;
  skin.ghost = {"src": ghostSkin,
    "connected": skinPaths.ghost.connected,
    "blockSize": skinPaths.ghost.blockSize,
  };
  
  skins[skinName] = skin;
}

addSkin("TETR.IO Connected", {
  "minos": {"src": "assets/inGame/TETRIOconnectedMinos.png", "connected": true, "blockSize": 96, "mode": "connectedMinos_0"},
  "ghost": {"src": "assets/inGame/TETRIOconnectedGhost.png", "connected": true, "blockSize": 96, "mode": "connectedGhost_0"},
});

// map tilemap modes to block sets
const modeBlockSetMap = {
  "connectedMinos_0": "minos",
  "connectedGhost_0": "ghost",
}

const tilemapIDreference = {
  "connectedMinos_0": {
    "colors": {
      1: {"x": 384, "y": 0},
      2: {"x": 768, "y": 0},
      3: {"x": 1152, "y": 0},
      4: {"x": 1536, "y": 0},
      5: {"x": 0, "y": 576},
      6: {"x": 96, "y": 576},
      7: {"x": 192, "y": 576},
      8: {"x": 288, "y": 576},
      9: {"x": 1920, "y": 0},
      10: {"x": 1920, "y": 576},
    },
    "ids": {
      0: {"x": 0, "y": 0},
      1: {"x": 96, "y": 0},
      2: {"x": 192, "y": 0},
      3: {"x": 288, "y": 0},
      4: {"x": 0, "y": 96},
      5: {"x": 96, "y": 96},
      6: {"x": 192, "y": 96},
      7: {"x": 288, "y": 96},
      8: {"x": 0, "y": 192},
      9: {"x": 96, "y": 192},
      10: {"x": 192, "y": 192},
      11: {"x": 288, "y": 192},
      12: {"x": 0, "y": 288},
      13: {"x": 96, "y": 288},
      14: {"x": 192, "y": 288},
      15: {"x": 288, "y": 288},
      16: {"x": 0, "y": 384},
      17: {"x": 96, "y": 384},
      18: {"x": 192, "y": 384},
      19: {"x": 288, "y": 384},
      20: {"x": 0, "y": 480},
      21: {"x": 96, "y": 480},
      22: {"x": 192, "y": 480},
      23: {"x": 288, "y": 480},
    }
  },
  "connectedGhost_0": {
    "colors": {
      1: {"x": 384, "y": 0},
      2: {"x": 768, "y": 0},
    },
    "ids": {
      0: {"x": 0, "y": 0},
      1: {"x": 96, "y": 0},
      2: {"x": 192, "y": 0},
      3: {"x": 288, "y": 0},
      4: {"x": 0, "y": 96},
      5: {"x": 96, "y": 96},
      6: {"x": 192, "y": 96},
      7: {"x": 288, "y": 96},
      8: {"x": 0, "y": 192},
      9: {"x": 96, "y": 192},
      10: {"x": 192, "y": 192},
      11: {"x": 288, "y": 192},
      12: {"x": 0, "y": 288},
      13: {"x": 96, "y": 288},
      14: {"x": 192, "y": 288},
      15: {"x": 288, "y": 288},
      16: {"x": 0, "y": 384},
      17: {"x": 96, "y": 384},
      18: {"x": 192, "y": 384},
      19: {"x": 288, "y": 384},
      20: {"x": 0, "y": 480},
      21: {"x": 96, "y": 480},
      22: {"x": 192, "y": 480},
      23: {"x": 288, "y": 480},
    }
  }
}

class blockTileMap { // can only handle 1 tilemap
  constructor(skin, blockSize, mode) {
    this.skin = skin; // skin image
    // skin is redundant
    this.blockSize = blockSize; // blocksize
    this.mode = mode;
    this.idReference = tilemapIDreference[this.mode];
    /*
      list of modes:
      "connectedMinos_0": default connected layout for regular minos
      "connectedGhost_0": default connected layout for ghost minos
    */
    this.assignment = modeBlockSetMap[mode];
  }
  
  getTile(color, id) {
    const colorPosition = this.idReference.colors[color];
    const idPosition = this.idReference.ids[id];
    const sumPosition = {"x": colorPosition.x + idPosition.x, "y": colorPosition.y + idPosition.y}
  }
}

class GameRenderer {
  constructor() {
    this.canvas = null;
    this.ctx = null;
  }
  
  useCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  
  renderScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // this.renderGameBoard(0, "TETR.IO Connected");
  }
  
  renderGameBoard(game, skinName) {
    const skin = skins[skinName]; // for easier referencing
    this.ctx.drawImage(skin.minos.src, 0, 0);
  }
}

export { GameRenderer };
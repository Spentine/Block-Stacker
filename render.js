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
  "minos": {"src": "assets/inGame/TETRIOconnectedMinos.png", "connected": true, "blockSize": 96},
  "ghost": {"src": "assets/inGame/TETRIOconnectedGhost.png", "connected": true, "blockSize": 96},
});

// map tilemap modes to block sets
const modeBlockSetMap = {
  "connectedMinos_0": "minos",
  "connectedGhost_0": "ghost",
}

class blockTileMap {
  constructor(skin, blockSize, mode) {
    this.skin = skin; // skin image
    this.blockSize = blockSize; // blocksize
    this.mode = mode;
    /*
      list of modes:
      "connectedMinos_0": default connected layout for regular minos
      "connectedGhost_0": default connected layout for ghost minos
    */
    this.assignment = modeBlockSetMap[mode];
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
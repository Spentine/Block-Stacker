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

addSkin("TETR.IO", {
  "minos": {"src": "assets/inGame/TETRIOconnectedMinos.png", "connected": true, "blockSize": 96},
  "ghost": {"src": "assets/inGame/TETRIOconnectedGhost.png", "connected": true, "blockSize": 96},
});

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
    // this.renderGameBoard(0, "TETR.IO");
  }
  
  renderGameBoard(game, skinName) {
    const skin = skins[skinName];
    this.ctx.drawImage(skin.minos.src, 0, 0);
  }
}

export { GameRenderer };
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

function loadSkin(skinName, skinPaths) {
  const skin = {};
  
  const minoSkin = new Image();
  minoSkin.src = skinPaths.minos.src;
  skin.minos = {"src": minoSkin,
    "connected": skinPaths.minos.connected,
    "blockSize": skinPaths.minos.blockSize,
    "mode": skinPaths.minos.mode,
  };
  
  const ghostSkin = new Image();
  ghostSkin.src = skinPaths.ghost.src;
  skin.ghost = {"src": ghostSkin,
    "connected": skinPaths.ghost.connected,
    "blockSize": skinPaths.ghost.blockSize,
    "mode": skinPaths.ghost.mode,
  };
  
  skins[skinName] = skin;
}

/*
loadSkin("TETR.IO Connected", {
  "minos": {"src": "assets/inGame/TETRIOconnected/minos.png", "connected": true, "blockSize": 96, "mode": "connectedMinos_0"},
  "ghost": {"src": "assets/inGame/TETRIOconnected/ghost.png", "connected": true, "blockSize": 96, "mode": "connectedGhost_0"},
});
*/

loadSkin("TETR.IO", {
  "minos": {"src": "assets/inGame/TETRIO/minos.png", "connected": false, "blockSize": 96, "mode": "minos_0"},
  "ghost": {"src": "assets/inGame/TETRIO/ghost.png", "connected": false, "blockSize": 96, "mode": "minos_0"},
});

// map tilemap modes to block sets
const modeBlockSetMap = {
  "connectedMinos_0": "minos",
  "connectedGhost_0": "ghost",
  "minos_0": "minos",
  "ghost_0": "ghost",
}

// i recognize that arrays can probably be used in this case but i do not want to use them

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
  //  8: {"x": 288, "y": 576}, // what does this mino even do???
      8: {"x": 1920, "y": 0},
      9: {"x": 1920, "y": 576},
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
  },
  "minos_0": {
    "colors": {
      1: {"x": 0, "y": 0},
      2: {"x": 96, "y": 0},
      3: {"x": 192, "y": 0},
      4: {"x": 288, "y": 0},
      5: {"x": 384, "y": 0},
      6: {"x": 0, "y": 96},
      7: {"x": 96, "y": 96},
  //  8: {"x": 192, "y": 96},
      8: {"x": 288, "y": 96},
      9: {"x": 384, "y": 96},
    },
    "ids": {
      0: {"x": 0, "y": 0},
    }
  },
  "ghost_0": {
    "colors": {
      1: {"x": 0, "y": 0},
      2: {"x": 96, "y": 0},
    },
    "ids": {
      0: {"x": 0, "y": 0},
    }
  }
}

class blockTileMap { // can only handle 1 tilemap
  constructor(skin, blockSize=null, mode=null) {
    // console.log(skin);
    this.skin = skin; // skin
    this.skinImage = skin.src; // skin image
    
    if (blockSize) { // block size
      this.blockSize = blockSize;
    } else {
      this.blockSize = skin.blockSize;
    }
    
    if (mode) {
      this.mode = mode;
    } else {
      this.mode = skin.mode;
    }
    
    this.idReference = tilemapIDreference[this.mode];
    /*
      list of modes:
      "connectedMinos_0": default connected layout for regular minos
      "connectedGhost_0": default connected layout for ghost minos
    */
    this.assignment = modeBlockSetMap[mode];
  }
  
  getTile(color, id) {
    // console.log(this);
    const colorPosition = this.idReference.colors[color];
    const idPosition = this.idReference.ids[id];
    const sumPosition = {"x": colorPosition.x + idPosition.x, "y": colorPosition.y + idPosition.y}
    return sumPosition;
  }
  
  getDrawParams(color, id) {
    const tilePosition = this.getTile(color, id);
    return [this.skinImage, tilePosition.x, tilePosition.y, this.blockSize, this.blockSize];
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
  
  renderScreen(renderData) {
    if (this.prevCanvasWidth != window.innerWidth || this.prevCanvasHeight != window.innerHeight) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    this.prevCanvasWidth = this.canvas.width;
    this.prevCanvasHeight = this.canvas.height;
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    /*
    
    The game uses a scene system to decide what to render.
    
    game: renders gameplay
    menu: renders menu
    
    */
    
    switch (renderData.scene) {
      case "game":
        this.renderGame(renderData.data.board);
        break;
      case "menu":
        // something
        break;
    }
  }
  
  renderGame(data) {
    this.renderGameBoard({
      "game": data,
      "skinName": "TETR.IO",
      "position": {"x": 400, "y": 200},
      "size": 48, // width of one tile
    });
  }
  
  renderGameBoard(boardRenderData) {
    
    function renderPiece(settings, This) { // will render piece
      const globalPosition = settings.globalPosition;
      const position = settings.position;
      const rotation = settings.rotation;
      const name = settings.name;
      
      const visualHeight = !settings.disregardVisualHeight;
      
      /*
      if (settings.disregardVisualHeight) {
        const visualHeight = false;
      } else {
        const visualHeight = true;
      }
      */
      
      game.c.rotationSystem[name].rotations[rotation].forEach((mino) => {
        const piecePosition = mino.addPositionReturn(position);
        
        This.ctx.drawImage(
          ...minoTilemap.getDrawParams(mino.texture, 0), // CHANGE CODE WHEN CONNECTED MINOS
          globalPosition.x + piecePosition.x * tileSize, // x position
          globalPosition.y + (piecePosition.y - visualHeight * game.c.visualHeight) * tileSize, // y position
          tileSize, tileSize, // width and height of mino
        );
        
      });
    }
    
    function calculateBounds(settings, This) {
      const rotation = settings.rotation;
      const name = settings.name;
      
      const bounds = {
        "min": {"x": Infinity, "y": Infinity},
        "max": {"x": -Infinity, "y": -Infinity},
      }
      
      game.c.rotationSystem[name].rotations[rotation].forEach((mino) => {
        // can't use if-else due to single mino not setting both min and max [compatibility]
        if (mino.position.x < bounds.min.x) {
          bounds.min.x = mino.position.x
        }
        if (mino.position.x > bounds.max.x) {
          bounds.max.x = mino.position.x
        }
        if (mino.position.y < bounds.min.y) {
          bounds.min.y = mino.position.y
        }
        if (mino.position.y > bounds.max.y) {
          bounds.max.y = mino.position.y
        }
      });
      return bounds;
    }
    
    function renderCenteredPiece(settings, This) {
      const pieceName = settings.name;
      const rotation = settings.rotation;
      const position = settings.position;
      
      let bounds = calculateBounds({
        "rotation": rotation,
        "name": pieceName,
      }, This); // calculate bounds of piece
      // console.log(bounds);
      
      let offset = {
        "x": (bounds.min.x + bounds.max.x) * -0.5 * tileSize,
        "y": (bounds.min.y + bounds.max.y) * -0.5 * tileSize,
      }
      
      let renderPosition = {
        "x": position.x + offset.x,
        "y": position.y + offset.y,
      };
      
      renderPiece({
        "globalPosition": renderPosition,
        "position": {"x": 0, "y": 0},
        "rotation": 0,
        "name": pieceName,
        "disregardVisualHeight": true,
      }, This); // render hold
    }
    
    const game = boardRenderData.game;
    const skinName = boardRenderData.skinName;
    const tileSize = boardRenderData.size;
    const position = boardRenderData.position;
    
    const skin = skins[skinName]; // for easier referencing
    
    const minoTilemap = new blockTileMap(skin.minos);
    const ghostTilemap = new blockTileMap(skin.ghost);
    
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(
      position.x,
      position.y,
      (game.c.width) * tileSize,
      (game.c.visualHeight) * tileSize,
    );
    
    for (let row = game.c.height - game.c.renderHeight; row < game.c.height; row++) { // go through each row
      for (let column = 0; column < game.c.width; column++) {
        const boardMino = game.board[row][column];
        if (boardMino !== 0) {
          this.ctx.drawImage(
            ...minoTilemap.getDrawParams(boardMino, 0), // get image of mino (CHANGE CODE WHEN CONNECTED MINOS)
            position.x + column * tileSize, // x position of mino
            position.y + (row - game.c.visualHeight) * tileSize, // y position of mino
            tileSize, tileSize, // width and height of mino
          );
        }
      }
    }
    
    // console.log(game.piece);
    
    // render current piece
    renderPiece({
      "globalPosition": position,
      "position": game.piece.position,
      "rotation": game.piece.rotation,
      "name": game.piece.name,
    }, this);
    
    // the ghost piece can just be represented with just a position because the name and the rotation is the same as the current piece but i want to do this so that i wont have to factorize my code in the future
    
    // calculate ghost piece position
    const ghostPiece = {
      "position": game.piece.position.clone(),
      "rotation": game.piece.rotation,
      "name": game.piece.name,
    }
    
    while (game.pieceValid(ghostPiece.position, ghostPiece.rotation, ghostPiece.name)) { // while the ghost is valid
      ghostPiece.position.y += 1; // go back down
    }
    
    ghostPiece.position.y -= 1; // go back up
    
    this.ctx.globalAlpha = 0.5; // transparency of piece
    
    // render ghost piece
    renderPiece({
      "globalPosition": position,
      "position": ghostPiece.position,
      "rotation": ghostPiece.rotation,
      "name": ghostPiece.name,
    }, this); // render ghost piece
    
    this.ctx.globalAlpha = 1; // opaque
    
    // render hold piece
    if (game.hold.pieceName) {
      renderCenteredPiece({
        "rotation": 0,
        "name": game.hold.pieceName,
        "position": {
          "x": position.x + (-4 * tileSize),
          "y": position.y + (1 * tileSize),
        }
      }, this);
    }
    
    const nextSpace = 3;
    for (let i=0; i<Math.min(game.next.length, game.c.next); i++) {
      renderCenteredPiece({
        "rotation": 0,
        "name": game.next[i],
        "position": {
          "x": position.x + ((game.c.width + 2) * tileSize),
          "y": position.y + ((1 + (nextSpace*i)) * tileSize),
        }
      }, this);
    }
  }
}

export { GameRenderer };
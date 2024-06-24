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

const inputsList = [
  "left", "right", 
  "CW", "CCW", "r180",
  "softDrop", "hardDrop",
  "hold",
  "reset",
];

const handlingList = {
  "DAS": "das",
  "ARR": "arr",
  "SDF": "sdf",
  "DCD": "dcd",
  "": null,
  "MSG": "msg",
  "ARE": "are",
  "LCA": "lca",
};

const trainingPacksList = [
  {
    "title": "Easy TSD Puzzles",
    "scene": "game-puzzleMode",
    "startParam": {
      "mode": "puzzleMode",
      "puzzleSet": "easyTSDPuzzles",
    },
  },
  {
    "title": "2 Piece TSD Puzzles",
    "scene": "game-puzzleMode",
    "startParam": {
      "mode": "puzzleMode",
      "puzzleSet": "twoPieceTSDPuzzles",
    },
  },
  {
    "title": "Kaidan TSD Puzzles",
    "scene": "game-puzzleMode",
    "startParam": {
      "mode": "puzzleMode",
      "puzzleSet": "kaidanTSDPuzzles",
    },
  },
  {
    "title": "Medium TSD Puzzles",
    "scene": "game-puzzleMode",
    "startParam": {
      "mode": "puzzleMode",
      "puzzleSet": "mediumTSDPuzzles",
    },
  },
];

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

function removeFloatingPointError(num, truncate=true, p=3) {
  var decimal = String(Math.floor((num % 1) * Math.pow(10, p))).padStart(p, "0");
  const whole = String(Math.floor(num));
  
  if (truncate) {
    while (decimal[decimal.length-1] === "0") {
      decimal = decimal.substring(0, decimal.length-1);
    }
    
    if (decimal === "") {
      return whole;
    }
  }
  
  return whole + "." + decimal;
}

function msToTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = (ms % 60000) * 0.001;
  var s = removeFloatingPointError(seconds);
  if (seconds < 10) {
    s = "0" + s;
  }
  return minutes + ":" + s;
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
  //  8: {"x": 288, "y": 576}, // hold mino
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
    this.connected = skin.connected;
    
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
  
  useUserSettings(userSettings) {
    this.userSettings = userSettings;
  }
  
  getUiElements() {
    this.uiElem = {
      "homeMenu": {
        "container": document.getElementById("homepage"),
        "title": document.getElementById("UI-homepageTitle"),
        "play": document.getElementById("UI-play"),
        "settings": document.getElementById("UI-settings"),
        "credits": document.getElementById("UI-credits"),
        "source": document.getElementById("UI-source"),
      },
      "playMenu": {
        "container": document.getElementById("playMenu"),
        "gamemodes": document.getElementById("UI-gamemodes"),
        "learn": document.getElementById("UI-learn"),
        "train": document.getElementById("UI-train"),
        "back": document.getElementById("UI-playMenu-back"),
      },
      "gamemodesMenu": {
        "container": document.getElementById("gamemodesMenu"),
        "marathon": document.getElementById("UI-marathon"),
        "fortyLines": document.getElementById("UI-fortyLines"),
        "blitz": document.getElementById("UI-blitz"),
        "zen": document.getElementById("UI-zen"),
        "back": document.getElementById("UI-gamemodesMenu-back"),
      },
      "trainMenu": {
        "container": document.getElementById("trainMenu"),
        "trainingPacksContainer": document.getElementById("UI-trainingPacksContainer"),
        "trainingPacksArray": [],
        "back": document.getElementById("UI-trainMenu-back"),
      },
      "settingsMenu": {
        "container": document.getElementById("settingsMenu"),
        "keybinds": document.getElementById("UI-keybinds"),
        "handling": document.getElementById("UI-handling"),
        "graphics": document.getElementById("UI-graphics"),
        "audio": document.getElementById("UI-audio"),
        "back": document.getElementById("UI-settingsMenu-back"),
      },
      "keybindsMenu": {
        "container": document.getElementById("keybindsMenu"),
        "warning": document.getElementById("UI-keybindsMenu-warning"),
        
        "leftText": document.getElementById("UI-keybindsLeftText"),
        "rightText": document.getElementById("UI-keybindsRightText"),
        "CWText": document.getElementById("UI-keybindsCWText"),
        "CCWText": document.getElementById("UI-keybindsCCWText"),
        "r180Text": document.getElementById("UI-keybinds180Text"),
        "softDropText": document.getElementById("UI-keybindsSoftDropText"),
        "hardDropText": document.getElementById("UI-keybindsHardDropText"),
        "holdText": document.getElementById("UI-keybindsHoldText"),
        "resetText": document.getElementById("UI-keybindsResetText"),
        
        "keyButtonsContainer": document.getElementById("UI-keyButtonsContainer"),
        
        "reset": document.getElementById("UI-keybindsMenu-reset"),
        "back": document.getElementById("UI-keybindsMenu-back"),
      },
      "handlingMenu": {
        "container": document.getElementById("handlingMenu"),
        "DASText": document.getElementById("UI-DASText"),
        "ARRText": document.getElementById("UI-ARRText"),
        "SDFText": document.getElementById("UI-SDFText"),
        "DCDText": document.getElementById("UI-DCDText"),
        
        "MSGText": document.getElementById("UI-MSGText"),
        "AREText": document.getElementById("UI-AREText"),
        "LCAText": document.getElementById("UI-LCAText"),
        
        "DASInput": document.getElementById("UI-DASInput"),
        "ARRInput": document.getElementById("UI-ARRInput"),
        "SDFInput": document.getElementById("UI-SDFInput"),
        "DCDInput": document.getElementById("UI-DCDInput"),
        
        "MSGInput": document.getElementById("UI-MSGInput"),
        "AREInput": document.getElementById("UI-AREInput"),
        "LCAInput": document.getElementById("UI-LCAInput"),
        "back": document.getElementById("UI-handlingMenu-back"),
        "reset": document.getElementById("UI-handlingMenu-reset"),
      },
    }
  }
  
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.uiElem = null;
    this.whRatio = 1;
    this.uiScaling = 1;
    this.persistentEffects = {};
    this.saveBlockStackerStorage = function() {}
    this.startGame = null;
    this.pendingKeydown = {
      "keybind": [],
    }
    
    document.addEventListener("keydown", (e) => {
      const keys = Object.keys(this.pendingKeydown);
      
      for (let i=0; i<keys.length; i++) {
        
        const list = this.pendingKeydown[keys];
        
        for (let j=0; j<list.length; j++) {
          list[j](e);
        }
        
      }
      
    });
  }
  
  useCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  
  renderScreen(renderData) {
    
    if (!this.canvas) {
      return null;
    }
    
    if (this.prevCanvasWidth != window.innerWidth || this.prevCanvasHeight != window.innerHeight) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.whRatio = this.canvas.width / this.canvas.height;
      this.uiScaling = Math.min(this.canvas.width, 1.5 * this.canvas.height);
    }
    this.prevCanvasWidth = this.canvas.width;
    this.prevCanvasHeight = this.canvas.height;
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    /*
    
    The game uses a scene system to decide what to render.
    
    game: renders gameplay
    ui: renders ui
    
    */
    
    switch (renderData.type) {
      case "game":
        this.renderGame(renderData.data);
        break;
      case "ui":
        this.renderUI(renderData.data.scene);
        break;
    }
  }
  
  updateScene(scene) {
    if (!this.uiElem) {
      return false;
    }
    
    // clean this up later using dicts
    
    const menus = Object.keys(this.uiElem);
    
    for (let i=0; i<menus.length; i++) {
      this.uiElem[menus[i]].container.style.display = "none";
    }
    
    if (menus.includes(scene)) {
      this.uiElem[scene].container.style.display = "block";
    }
    
    /*
    this.uiElem.homeMenu.container.style.display = "none";
    this.uiElem.playMenu.container.style.display = "none";
    this.uiElem.gamemodesMenu.container.style.display = "none";
    this.uiElem.settingsMenu.container.style.display = "none";
    this.uiElem.keybindsMenu.container.style.display = "none";
    this.uiElem.handlingMenu.container.style.display = "none";
    
    // console.log(scene);
    switch (scene) {
      case "homeMenu":
        this.uiElem.homeMenu.container.style.display = "block";
        break;
      case "playMenu":
        this.uiElem.playMenu.container.style.display = "block";
        break;
      case "gamemodesMenu":
        this.uiElem.gamemodesMenu.container.style.display = "block";
        break;
      case "settingsMenu":
        this.uiElem.settingsMenu.container.style.display = "block";
        break;
      case "keybindsMenu":
        this.uiElem.keybindsMenu.container.style.display = "block";
        break;
      case "handlingMenu":
        this.uiElem.handlingMenu.container.style.display = "block";
        break;
      case "test":
        
        break;
    }
   
    */
  }
  
  updateKeybindButtons() {
    const kBContainer = this.uiElem.keybindsMenu.keyButtonsContainer; // container for buttons
    while (kBContainer.firstChild) {
      kBContainer.removeChild(kBContainer.lastChild);
    }
    
    const allKeys = Object.keys(this.userSettings.inGame.keyMappings);
    
    this.uiElem.keybindsMenu.keyButtons = {};
    const keyButtonsMap = this.uiElem.keybindsMenu.keyButtons;
    
    for (let i=0; i<inputsList.length; i++) {
      keyButtonsMap[inputsList[i]] = [];
    }
    
    for (let i=0; i<allKeys.length; i++) {
      const keyButton = document.createElement("button");
      
      keyButton.classList.add("ui");
      keyButton.classList.add("Button1");
      keyButton.innerHTML = allKeys[i];
      kBContainer.appendChild(keyButton);
      
      keyButtonsMap[this.userSettings.inGame.keyMappings[allKeys[i]]].push({
        "key": "allKeys[i]",
        "button": keyButton,
      });
      
      const keyIndex = i;
      
      keyButton.addEventListener("click", () => {
        delete this.userSettings.inGame.keyMappings[allKeys[keyIndex]];
        this.saveBlockStackerStorage();
        this.updateKeybindButtons();
      });
    }
    
    for (let i=0; i<inputsList.length; i++) {
      const keyButton = document.createElement("button");
      
      keyButton.classList.add("ui");
      keyButton.classList.add("Button1");
      keyButton.innerHTML = "Add Keybind";
      kBContainer.appendChild(keyButton);
      
      keyButtonsMap[inputsList[i]].push({
        "key": "addKeybind",
        "button": keyButton,
      });
      
      const currentAction = inputsList[i];
      let active = true;
      
      keyButton.addEventListener("click", () => {
        keyButton.innerHTML = "Awaiting Input...";
        /*
        document.addEventListener("keydown", (e) => { // MEMORY LEAK
          if (active && !e.repeat) {
            this.userSettings.inGame.keyMappings[e.code] = currentAction;
            this.saveBlockStackerStorage();
            this.updateKeybindButtons();
            active = false;
          }
        });
        */
        
        this.pendingKeydown.keybind.push((e) => {
          if (active && !e.repeat) {
            this.userSettings.inGame.keyMappings[e.code] = currentAction;
            this.saveBlockStackerStorage();
            this.updateKeybindButtons();
            active = false;
          }
        })
      });
    }
  }
  
  updateTrainingPuzzles() {
    const tPContainer = this.uiElem.trainMenu.trainingPacksContainer; // training pack container
    
    this.uiElem.trainMenu.trainingPacksArray = [];
    const tPArray = this.uiElem.trainMenu.trainingPacksArray;
    
    while (tPContainer.firstChild) {
      tPContainer.removeChild(tPContainer.lastChild);
    }
    
    for (let i=0; i<trainingPacksList.length; i++) {
      const packButton = document.createElement("button");
      
      packButton.classList.add("ui");
      packButton.classList.add("Button1");
      packButton.innerHTML = trainingPacksList[i]["title"];
      tPContainer.appendChild(packButton);
      tPArray.push(packButton);
      
      const buttonData = trainingPacksList[i];
      packButton.addEventListener("click", () => {
        this.startGame(buttonData["scene"], buttonData["startParam"]);
      });
    }
  }
  
  updateHandlingInputs() { // load handling values into ui
    
    const handlingKeys = Object.keys(handlingList);
    
    for (let handlingIndex=0; handlingIndex < handlingKeys.length; handlingIndex++) {
      const inputElem = this.uiElem.handlingMenu[handlingKeys[handlingIndex] + "Input"]; // input element to display number
      if (inputElem) {
        const currentHandling = handlingList[handlingKeys[handlingIndex]];
        inputElem.value = this.userSettings.inGame.handling[currentHandling]; // display correct number
        
        inputElem.addEventListener("change", (e) => { // when value changed
          if (isNaN(Number(inputElem.value))) {
            inputElem.value = this.userSettings.inGame.handling[currentHandling];
          } else if (Number(inputElem.value) < Number(inputElem.min)) {
            inputElem.value = inputElem.min;
          } else if (Number(inputElem.value) > Number(inputElem.max)) {
            inputElem.value = inputElem.max;
          } else {
            this.userSettings.inGame.handling[currentHandling] = Number(inputElem.value); // save value
            inputElem.value = Number(inputElem.value);
            this.saveBlockStackerStorage();
          }
        });
      }
    }
    
  }
  
  renderUI(data) {
    if (!this.uiElem) { // if it's not really loaded yet and nothing is there
      return false;
    }
    
    const scene = data;
    
    const setBoundaryCorners = (elem, boundaries) => {
      elem.style.left = boundaries.min.x + "px";
      elem.style.top = boundaries.min.y + "px";
      
      elem.style.right = this.canvas.width - boundaries.max.x + "px";
      elem.style.bottom = this.canvas.height - boundaries.max.y + "px";
    }
    
    const setBoundaries = (elem, boundaries) => {
      setBoundaryCorners(elem, {
        "min": {
          "x": boundaries.x,
          "y": boundaries.y,
        },
        "max": {
          "x": boundaries.x + boundaries.w, // width
          "y": boundaries.y + boundaries.h, // height
        }
      });
    }
    
    // PORT ALL TO CSS WHEN YOU HAVE THE TIME
    // this is trash and takes too long omg
    
    switch (scene) {
      case "homeMenu":
        
        setBoundaries(this.uiElem.homeMenu.play, {
          "x": (0.5 * this.canvas.width - (0.05 * this.uiScaling) * 2.1),
          "y": (0.5 * this.canvas.height - (0.05 * this.uiScaling) * 2.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.homeMenu.settings, {
          "x": (0.5 * this.canvas.width + (0.05 * this.uiScaling) * 0.1),
          "y": (0.5 * this.canvas.height - (0.05 * this.uiScaling) * 2.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.homeMenu.credits, {
          "x": (0.5 * this.canvas.width - (0.05 * this.uiScaling) * 2.1),
          "y": (0.5 * this.canvas.height + (0.05 * this.uiScaling) * 0.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.homeMenu.source, {
          "x": (0.5 * this.canvas.width + (0.05 * this.uiScaling) * 0.1),
          "y": (0.5 * this.canvas.height + (0.05 * this.uiScaling) * 0.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        const titleBounds = this.uiElem.homeMenu.title.getBoundingClientRect();
        this.uiElem.homeMenu.title.style.left = (0.5 * this.canvas.width - 0.5 * titleBounds.width) + "px";
        this.uiElem.homeMenu.title.style.top = (0.5 * this.canvas.height - (0.15 * this.uiScaling) - 0.5 * titleBounds.height ) + "px";
        
        break;
        
      case "playMenu":
        
        setBoundaries(this.uiElem.playMenu.gamemodes, {
          "x": (0.5 * this.canvas.width - (0.05 * this.uiScaling) * 2.1),
          "y": (0.5 * this.canvas.height - (0.05 * this.uiScaling) * 2.1),
          "w": (0.05 * this.uiScaling) * 4.2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.playMenu.learn, {
          "x": (0.5 * this.canvas.width + (0.05 * this.uiScaling) * 0.1),
          "y": (0.5 * this.canvas.height + (0.05 * this.uiScaling) * 0.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.playMenu.train, {
          "x": (0.5 * this.canvas.width - (0.05 * this.uiScaling) * 2.1),
          "y": (0.5 * this.canvas.height + (0.05 * this.uiScaling) * 0.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.playMenu.back, {
          "x": (0.05 * this.uiScaling) * 0.1,
          "y": (0.05 * this.uiScaling) * 0.1,
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 1,
        });
        
        break;
        
      case "gamemodesMenu":
        
        setBoundaries(this.uiElem.gamemodesMenu.marathon, {
          "x": (0.5 * this.canvas.width - (0.05 * this.uiScaling) * 2.1),
          "y": (0.5 * this.canvas.height - (0.05 * this.uiScaling) * 2.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.gamemodesMenu.fortyLines, {
          "x": (0.5 * this.canvas.width + (0.05 * this.uiScaling) * 0.1),
          "y": (0.5 * this.canvas.height - (0.05 * this.uiScaling) * 2.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.gamemodesMenu.blitz, {
          "x": (0.5 * this.canvas.width - (0.05 * this.uiScaling) * 2.1),
          "y": (0.5 * this.canvas.height + (0.05 * this.uiScaling) * 0.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.gamemodesMenu.zen, {
          "x": (0.5 * this.canvas.width + (0.05 * this.uiScaling) * 0.1),
          "y": (0.5 * this.canvas.height + (0.05 * this.uiScaling) * 0.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.gamemodesMenu.back, {
          "x": (0.05 * this.uiScaling) * 0.1,
          "y": (0.05 * this.uiScaling) * 0.1,
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 1,
        });
        
        break;
        
      case "settingsMenu":
        
        setBoundaries(this.uiElem.settingsMenu.keybinds, {
          "x": (0.5 * this.canvas.width - (0.05 * this.uiScaling) * 2.1),
          "y": (0.5 * this.canvas.height - (0.05 * this.uiScaling) * 2.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.settingsMenu.handling, {
          "x": (0.5 * this.canvas.width + (0.05 * this.uiScaling) * 0.1),
          "y": (0.5 * this.canvas.height - (0.05 * this.uiScaling) * 2.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.settingsMenu.graphics, {
          "x": (0.5 * this.canvas.width - (0.05 * this.uiScaling) * 2.1),
          "y": (0.5 * this.canvas.height + (0.05 * this.uiScaling) * 0.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.settingsMenu.audio, {
          "x": (0.5 * this.canvas.width + (0.05 * this.uiScaling) * 0.1),
          "y": (0.5 * this.canvas.height + (0.05 * this.uiScaling) * 0.1),
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 2,
        });
        
        setBoundaries(this.uiElem.settingsMenu.back, {
          "x": (0.05 * this.uiScaling) * 0.1,
          "y": (0.05 * this.uiScaling) * 0.1,
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 1,
        });
        
        break;
        
      case "keybindsMenu":
        
        setBoundaries(this.uiElem.keybindsMenu.back, {
          "x": (0.05 * this.uiScaling) * 0.1,
          "y": (0.05 * this.uiScaling) * 0.1,
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 1,
        });
        
        var largestWidth = 0;
        
        // think about combining or something because this computes the same data twice
        
        for (let inputIndex = 0; inputIndex < inputsList.length; inputIndex++) {
          const currentInput = inputsList[inputIndex];
          const sideText = this.uiElem.keybindsMenu[currentInput + "Text"];
          const textBounds = sideText.getBoundingClientRect();
          if (textBounds.width > largestWidth) {
            largestWidth = textBounds.width;
          }
        }
        
        const keyButtons = this.uiElem.keybindsMenu.keyButtons;
        const mapKeys = Object.keys(keyButtons);
        
        for (let inputIndex = 0; inputIndex < inputsList.length; inputIndex++) {
          const currentInput = inputsList[inputIndex];
          const sideText = this.uiElem.keybindsMenu[currentInput + "Text"];
          const textBounds = sideText.getBoundingClientRect();
          
          // get position
          var xPos = largestWidth + this.uiScaling * 0.05;
          const yPos = (0.05 * this.uiScaling) * (inputIndex + 2)
          
          // set bounds of text
          sideText.style.left = (xPos - textBounds.width) + "px";
          sideText.style.top = (yPos - 0.5 * textBounds.height) + "px";
          
          const xSpread = this.uiScaling * 0.02;
          const xWidth = this.uiScaling * 0.15;
          const yHeight = this.uiScaling * 0.04;
          
          const buttons = keyButtons[mapKeys[inputIndex]];
          if (buttons) {
            for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
              const currentButton = buttons[buttonIndex];
              const currentButtonElement = currentButton.button;
              
              // use setBoundaries()
              
              xPos += xSpread;
              currentButtonElement.style.left = (xPos) + "px";
              xPos += xWidth;
              currentButtonElement.style.right = (this.canvas.width - xPos) + "px";
              
              currentButtonElement.style.top = (yPos - 0.5 * yHeight) + "px";
              currentButtonElement.style.bottom = (this.canvas.height - (yPos + 0.5 * yHeight)) + "px";
            }
          }
        }
        
        setBoundaries(this.uiElem.keybindsMenu.reset, {
          "x": (0.05 * this.uiScaling) * 0.1,
          "y": this.canvas.height - (0.05 * this.uiScaling) * 0.1 - (0.05 * this.uiScaling) * 1,
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 1,
        });
        
        this.uiElem.keybindsMenu.warning.style.top = (0.02 * this.uiScaling) + "px";
        this.uiElem.keybindsMenu.warning.style.left = (0.2 * this.uiScaling) + "px";
        
        break;
      
      case "handlingMenu":
        
        const handlingKeys = Object.keys(handlingList);
        
        var largestWidth = 0;
        
        for (let handlingIndex=0; handlingIndex < handlingKeys.length; handlingIndex++) {
          const currentHandling = handlingKeys[handlingIndex];
          
          const sideText = this.uiElem.handlingMenu[currentHandling + "Text"];
          if (!sideText) { // if it doesn't exist for whatever reason
            if (handlingList[currentHandling] !== null) {
              break;
            }
          } else {
          
            const textBounds = sideText.getBoundingClientRect();
            if (textBounds.width > largestWidth) {
              largestWidth = textBounds.width;
            }
          
          }
        }
        
        for (let handlingIndex=0; handlingIndex < handlingKeys.length; handlingIndex++) {
          const currentHandling = handlingKeys[handlingIndex];
          
          const sideText = this.uiElem.handlingMenu[currentHandling + "Text"];
          if (!sideText) { // if it doesn't exist for whatever reason
            if (handlingList[currentHandling] !== null) {
              break;
            }
          } else {
            
            const textBounds = sideText.getBoundingClientRect();
            
            const xPos = largestWidth + this.uiScaling * 0.05;
            const yPos = (0.05 * this.uiScaling) * (handlingIndex + 2)
            
            sideText.style.left = (xPos - textBounds.width) + "px";
            sideText.style.top = (yPos - 0.5 * textBounds.height) + "px";
            
            const yHeight = 0.04 * this.uiScaling;
            
            setBoundaries(this.uiElem.handlingMenu[currentHandling + "Input"], {
              "x": xPos + this.uiScaling * 0.02,
              "y": yPos - yHeight * 0.5,
              "w": this.uiScaling * 0.17,
              "h": yHeight,
            });
          
          }
        }
        
        setBoundaries(this.uiElem.handlingMenu.back, {
          "x": (0.05 * this.uiScaling) * 0.1,
          "y": (0.05 * this.uiScaling) * 0.1,
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 1,
        });
        
        setBoundaries(this.uiElem.handlingMenu.reset, {
          "x": (0.05 * this.uiScaling) * 0.1,
          "y": this.canvas.height - (0.05 * this.uiScaling) * 0.1 - (0.05 * this.uiScaling) * 1,
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 1,
        });
        
        break;
        
      case "trainMenu":
        
        const tPArray = this.uiElem.trainMenu.trainingPacksArray;
        for (let packIndex=0; packIndex<tPArray.length; packIndex++) {
          const pack = tPArray[packIndex];
          
          setBoundaries(pack, {
            "x": (0.02 * this.uiScaling),
            "y": (0.1 * this.uiScaling) + packIndex * (0.07 * this.uiScaling),
            "w": (0.25 * this.uiScaling),
            "h": (0.06 * this.uiScaling),
          });
        }
        
        setBoundaries(this.uiElem.trainMenu.back, {
          "x": (0.05 * this.uiScaling) * 0.1,
          "y": (0.05 * this.uiScaling) * 0.1,
          "w": (0.05 * this.uiScaling) * 2,
          "h": (0.05 * this.uiScaling) * 1,
        });
        
        break;
        
      case "test":
        
        
        
        break;
    }
  }
  
  renderGame(data) {
    /*
    this.renderGameBoard({
      "game": data,
      "skinName": "TETR.IO",
      "position": {"x": 400, "y": 200},
      "size": 48, // width of one tile
    });
    */
    
    const size = Math.min(this.canvas.width, this.canvas.height);
    const tileSize = size / 30;
    
    if (!this.persistentEffects.game1) {
      this.persistentEffects.game1 = {};
    }
    
    this.renderGameBoard({
      "game": data.board,
      "skinName": "TETR.IO",
      "position": {
        "x": 0.5 * (this.canvas.width - tileSize * data.board.c.width),
        "y": 0.5 * (this.canvas.height - tileSize * data.board.c.visualHeight),
      },
      "size": tileSize, // width of one tile
      "persistentEffects": this.persistentEffects.game1,
    });
  }
  
  renderGameBoard(boardRenderData) {
    
    const renderPiece = (settings) => { // will render piece
      const globalPosition = settings.globalPosition;
      const position = settings.position;
      const rotation = settings.rotation;
      const name = settings.name;
      
      var texture;
      
      // consider completely changing this to just be
      // const texture = settings.texture;
      if (settings.texture) {
        texture = {
          "texture": settings.texture.texture,
          "type": settings.texture.type,
        };
      } else {
        texture = null;
      }
      
      const visualHeight = !settings.disregardVisualHeight;
      
      /*
      if (settings.disregardVisualHeight) {
        const visualHeight = false;
      } else {
        const visualHeight = true;
      }
      */
      
      let i = 0
      game.c.rotationSystem[name].rotations[rotation].forEach((mino) => {
        const piecePosition = mino.addPositionReturn(position);
        const xPosition = globalPosition.x + piecePosition.x * tileSize;
        const yPosition = globalPosition.y + (piecePosition.y - visualHeight * game.c.visualHeight) * tileSize;
        
        var minoTexture;
        if (texture) {
          if (texture.type === "connected") {
            minoTexture = texture.texture[i];
          } else if (texture.type === "overlay") {
            this.ctx.fillStyle = "rgba(0, 0, 0, " + texture.texture + ")";
            this.ctx.globalCompositeOperation = "multiply";
            this.ctx.fillRect(xPosition, yPosition, tileSize, tileSize);
            this.ctx.globalCompositeOperation = "source-over";
            i++;
            return null;
          } else {
            minoTexture = [texture.texture, 0];
          }
        } else {
          if (minoTilemap.connected) {
            minoTexture = mino.texture;
          } else {
            minoTexture = [mino.texture, 0];
          }
        }
        
        this.ctx.drawImage(
          ...minoTilemap.getDrawParams(...minoTexture), // CHANGE CODE WHEN CONNECTED MINOS
          xPosition, // x position
          yPosition, // y position
          tileSize, tileSize, // width and height of mino
        );
        
        i++;
      });
    }
    
    const calculateBounds = (settings) => {
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
    
    const renderCenteredPiece = (settings) => {
      const pieceName = settings.name;
      const rotation = settings.rotation;
      const position = settings.position;
      const texture = settings.texture;
      
      let bounds = calculateBounds({
        "rotation": rotation,
        "name": pieceName,
      }, this); // calculate bounds of piece
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
        "texture": texture,
      }, this); // render hold
    }
    
    const game = boardRenderData.game;
    const skinName = boardRenderData.skinName;
    const tileSize = boardRenderData.size;
    const position = boardRenderData.position;
    const persistentEffects = boardRenderData.persistentEffects;
    
    const skin = skins[skinName]; // for easier referencing
    
    const minoTilemap = new blockTileMap(skin.minos);
    const ghostTilemap = new blockTileMap(skin.ghost);
    
    this.ctx.globalAlpha = 1;
    this.ctx.globalCompositeOperation = "source-over";
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
    });
    
    if (game.groundTime) {
      renderPiece({
        "globalPosition": position,
        "position": game.piece.position,
        "rotation": game.piece.rotation,
        "name": game.piece.name,
        "texture": {
          "texture": game.groundTime / game.lockDelay,
          "type": "overlay",
        },
      });
    }
    
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
    }); // render ghost piece
    
    this.ctx.globalAlpha = 1; // opaque
    
    // render hold piece
    if (game.hold.pieceName) {
      
      // IMPLEMENT HOLD MINO USING DIFFERENT TEXTURE
      /*
      if (game.hold.did) {
        const texture = {
          "connected": ghostTilemap
        }
      } else {
        
      }
      */
      if (game.hold.did) {
        this.ctx.globalAlpha = 0.5;
      } else {
        this.ctx.globalAlpha = 1;
      }
      
      renderCenteredPiece({
        "rotation": 0,
        "name": game.hold.pieceName,
        "position": {
          "x": position.x + (-3 * tileSize),
          "y": position.y + (1 * tileSize),
        },
        // "texture": texture,
      });
      
      this.ctx.globalAlpha = 1;
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
      });
    }
    
    this.ctx.fillStyle = "#fff";
    this.ctx.font = tileSize + "px Bloxyl";
    this.ctx.fillText(
      "time: " + msToTime(game.time),
      position.x + ((game.c.width + 1) * tileSize),
      position.y + (((game.c.visualHeight) - 3) * tileSize),
    );
    this.ctx.fillText(
      "score: " + game.stats.score,
      position.x + ((game.c.width + 1) * tileSize),
      position.y + (((game.c.visualHeight) - 2) * tileSize),
    );
    this.ctx.fillText(
      "level: " + game.levelling.level,
      position.x + ((game.c.width + 1) * tileSize),
      position.y + (((game.c.visualHeight) - 1) * tileSize),
    );
    this.ctx.fillText(
      "lines: " + game.stats.linesCleared,
      position.x + ((game.c.width + 1) * tileSize),
      position.y + (((game.c.visualHeight) - 0) * tileSize),
    );
    this.ctx.fillText(
      "attack: " + game.stats.linesSent,
      position.x + ((game.c.width + 1) * tileSize),
      position.y + (((game.c.visualHeight) + 1) * tileSize),
    );
    
    // persistentEffects
    if (!persistentEffects.gameActionDisp) {
      persistentEffects.gameActionDisp = [];
      // console.log("reset!");
    }
    
    if (game.events.reset) {
      persistentEffects.gameActionDisp = [];
    }
    
    const gameActionDisp = persistentEffects.gameActionDisp;
    
    {
      const findEmptyInQueue = (amount=1) => {
        let taken;
        if (amount === 1) {
          taken = gameActionDisp.indexOf(0);
          if (taken === -1) {
            taken = gameActionDisp.push(0) - 1;
          }
        } else {
          taken = -1;
          let empty = 0;
          for (let i=0; i<gameActionDisp.length; i++) {
            if (gameActionDisp[i] === 0) {
              empty += 1;
            } else {
              empty = 0;
            }
            if (empty === amount) {
              taken = i - amount + 1;
              i = Infinity;
            }
          }
          if (taken === -1) {
            gameActionDisp.push(0);
            // console.log(empty);
            for (let i=0; i<amount-empty-1; i++) {
              gameActionDisp.push(0);
            }
            taken = gameActionDisp.length - amount;
          }
        }
        return taken;
      }
      
      function addToQueue(e, pos) {
        gameActionDisp[pos] = {
          "event": e,
          "time": Date.now(),
          "originalPosition": pos,
        }
      }
      
      // game.events.spinPlacement
      
      var reserve = 2;
      
      if (game.events.spinPlacement) {
        reserve += 1;
      }
      
      if (game.events.combo > 0) {
        reserve += 1;
      }
      
      if (game.events.b2b > 0) {
        reserve += 1;
      }
      
      if (game.events.pc) {
        reserve += 1;
      }
      
      var pos = findEmptyInQueue(reserve);
      // console.log(pos, gameActionDisp)
      
      if (game.events.linesCleared === 1) {
        addToQueue("Single", pos);
      } else if (game.events.linesCleared === 2) {
        addToQueue("Double", pos);
      } else if (game.events.linesCleared === 3) {
        addToQueue("Triple", pos);
      } else if (game.events.linesCleared === 4) {
        addToQueue("Quad", pos);
      }
      
      pos += 1;
      
      if (game.events.spinPlacement === 1) {
        addToQueue("Mini T-Spin", pos);
      } else if (game.events.spinPlacement === 2) {
        addToQueue("T-Spin", pos);
      } else {
        pos -= 1;
      }
      
      pos += 1;
      
      if (game.events.linesCleared) {
        if (game.events.combo > 0) {
          addToQueue(game.events.combo + " Combo", pos);
        } else {
          pos -= 1;
        }
        
        pos += 1;
        
        if (game.events.b2b > 0) {
          addToQueue("Back-To-Back x" + game.events.b2b, pos);
        } else {
          pos -= 1;
        }
        
        pos += 1;
      }
      
      if (game.events.pc) {
        addToQueue("Perfect Clear", pos);
      } else {
        pos -= 1;
      }
      
      pos += 1;
      
      if (game.events.linesCleared) {
        addToQueue("", pos);
      }
    }
    
    // console.log(gameActionDisp);
    
    this.ctx.fillStyle = "#fff";
    this.ctx.font = tileSize + "px Bloxyl";
    
    const eventExpiryTime = 1500;
    
    for (let i=0; i<gameActionDisp.length; i++) {
      if (gameActionDisp[i].time + eventExpiryTime > Date.now()) { // if it's within the timeframe
        // render
        this.ctx.globalAlpha = (1 - (Date.now() - gameActionDisp[i].time) / eventExpiryTime);
        const displayedText = gameActionDisp[i].event;
        const textMetrics = this.ctx.measureText(displayedText);
        this.ctx.fillText(
          displayedText,
          position.x - textMetrics.width + -1 * tileSize,
          position.y + ((5 + 1.2 * i) * tileSize),
        );
      } else {
        // mark it as 0
        gameActionDisp[i] = 0;
      }
    }
    
    this.ctx.globalAlpha = 1;
    
  }
}



export { GameRenderer };
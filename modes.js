import { SRS_mono, SRS_color } from "./stacker/rs.js"

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
  "fourtyLines": {
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

export { gameModes };
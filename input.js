class InputHandler {
  constructor(keyMap) {
    this.directInterface = {}; // direct layer from input
    this.inputs = {}; // reformats direct layer to be usable
    this.changeInputs(keyMap);
    
    for (let i in this.keyMapKeys) {
      this.directInterface[this.keyMapKeys[i]] = null;
      this.inputs[keyMap[this.keyMapKeys[i]]] = null;
    }
  }
  
  changeInputs(keyMap) {
    this.keyMap = keyMap;
    this.keyMapKeys = Object.keys(this.keyMap); // all keys
  }
  
  keyDown(e) {
    if (!e.repeat) { // this function will also be called bc of built-in key ARR
      this.directInterface[e.code] = Date.now(); // the code for the keyDown is here
      // console.log(this.directInterface);
    }
  }

  keyUp(e) {
    this.directInterface[e.code] = null; // the code for the keyUp is here
  }
  
  getInputs() {
    
    for (let i in this.keyMapKeys) {
      this.inputs[this.keyMap[this.keyMapKeys[i]]] = null;
    }
    
    for (let i in this.keyMapKeys) {
      i = this.keyMapKeys[i];
      let j = this.keyMap[i];
      
      // ternary statement separated for brevity
      
      if (this.directInterface[i] !== null) { // if it's not undefined (pushed down)
        const holdTime = Date.now() - this.directInterface[i]; // amount of time held down
        if (this.inputs[j] === null || this.inputs[j] > holdTime) { // if it's undefined or greater than holdTime
          this.inputs[j] = holdTime; // set it to holdTime
        }
      }
    }
    
    return this.inputs;
  }
}

export { InputHandler };
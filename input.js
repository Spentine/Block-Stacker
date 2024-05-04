class InputHandler {
  constructor(keyMap) {
    this.keyMap = keyMap;
    this.directInterface = {}; // direct layer from input
    this.inputs = {}; // reformats direct layer to be usable
    this.keyMapKeys = Object.keys(this.keyMap); // all keys
    
    for (let i in this.keyMapKeys) {
      this.directInterface[this.keyMapKeys[i]] = null;
      this.inputs[keyMap[this.keyMapKeys[i]]] = null;
    }
  }
  
  keyDown(e) {
    if (!e.repeat) { // this function will also be called bc of built-in key ARR
      this.directInterface[e.code] = Date.now(); // the code for the keyDown is here
    }
  }

  keyUp(e) {
    this.directInterface[e.code] = null; // the code for the keyUp is here
  }
  
  getInputs() {
    
    for (let i in this.keyMapKeys) {
      this.inputs[keyMap[this.keyMapKeys[i]]] = null;
    }
    
    for (let i in this.keyMapKeys) {
      i = this.keyMapKeys[i]
      
      // ternary statement separated for brevity
      
      if (this.directInterface[i] !== null) {
        this.inputs[this.keyMap[i]] = Date.now() - this.directInterface[i];
      }
    }
    return this.inputs;
  }
}

export { InputHandler };
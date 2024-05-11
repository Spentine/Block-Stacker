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
  }
}

export { GameRenderer };
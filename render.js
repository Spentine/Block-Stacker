const cRender = document.getElementById('render');
cRender.width = window.innerWidth;
cRender.height = window.innerHeight;

function render() {
  const ctx = cRender.getContext("2d");
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, cRender.width, cRender.height);
}

export { render };
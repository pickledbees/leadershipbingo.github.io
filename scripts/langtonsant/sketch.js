//constants
const HEIGHT = 200;
const WIDTH = 400;
const PIXEL_WIDTH = 4;
const FRAMERATE = 60;

//variables
let drawMode = false;

//entities
let ants = [];
let board;

function setup() {
  //draw board
  frameRate(FRAMERATE);
  createCanvas(WIDTH * PIXEL_WIDTH, HEIGHT * PIXEL_WIDTH).parent("container");
  noStroke();
  displayStats();

  //initialise simulator
  board = new Board(HEIGHT, WIDTH, COLOUR.WHITE);
}

function draw() {
  //render old positions (colour is toggled only when ant.move() has been called)
  ants.forEach((ant) => {
    const { x, y } = ant.pos;
    ant.move();
    colourTile(x, y, board.getTile(x, y));
  });

  //render new positions
  ants.forEach((ant) => {
    colourTile(ant.pos.x, ant.pos.y, COLOUR.RED);
  });

  if (mouseIsPressed && drawMode) {
    spawnAnt();
  }

  displayStats();
}

function toggleDrawMode() {
  drawMode = !drawMode
}

function keyPressed() {
  if (keyCode === 32) toggleDrawMode();
}

function mouseClicked() {
  if (!drawMode) {
    spawnAnt();
  }
}

function displayStats() {
  fill(200);
  rect(5, 0, 100, 35);
  fill(0);
  text("DrawMode: " + drawMode, 10, 12);
  text("Ants: " + ants.length, 10, 30);
}

function spawnAnt() {
  pixelToGrid((X, Y) => ants.push(new Ant(X, Y, Ortho2DDirection.LEFT, board)));
}

function pixelToGrid(callback) {
  if (mouseX < WIDTH * PIXEL_WIDTH && mouseY < HEIGHT * PIXEL_WIDTH) {
    const X = Math.floor(mouseX / PIXEL_WIDTH);
    const Y = Math.floor(mouseY / PIXEL_WIDTH);
    callback(X, Y);
  }
}

function colourTile(x, y, colour) {
  const X = x * PIXEL_WIDTH;
  const Y = y * PIXEL_WIDTH;
  switch (colour) {
    case COLOUR.BLACK:
      fill(0);
      break;
    case COLOUR.WHITE:
      fill(255);
      break;
    case COLOUR.RED:
      fill(255, 0, 0);
      break;
  }
  rect(X, Y, PIXEL_WIDTH, PIXEL_WIDTH);
}

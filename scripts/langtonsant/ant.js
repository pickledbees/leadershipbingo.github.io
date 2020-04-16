class Ant {
  constructor(x, y, direction, board) {
    this.pos = { x, y };
    this.direction = direction;
    this._b = board;
  }

  move() {
    //turn
    //toggle
    //move

    const {x, y} = this.pos;

    if (this._b.getTile(x, y) === COLOUR.BLACK) {
      this.direction = Ortho2DDirection.rotateCounterClockwise(this.direction);
      this._b.setTile(x, y, COLOUR.WHITE);
      this.pos = this._b.getNeighbour(x, y, this.direction);
    } else { //if white
      this.direction = Ortho2DDirection.rotateClockwise(this.direction);
      this._b.setTile(x, y, COLOUR.BLACK);
      this.pos = this._b.getNeighbour(x, y, this.direction);
    }
  }
}

const COLOUR = {
  BLACK: 0,
  WHITE: 1,
  RED: 2,
};

//defaults to wraparound
class Board {
  constructor(h, w, initialState) {
    this._b = [];
    for (let i = 0; i < h; i++) {
      const r = [];
      for (let j = 0; j < w; j++) {
        r.push(initialState);
      }
      this._b.push(r);
    }
    this._h = h;
    this._w = w;
  }

  get height() {
    return this._h;
  }

  get width() {
    return this._w;
  }

  getTile(x, y) {
    return this._b[y][x];
  }

  setTile(x, y, state) {
    this._b[y][x] = state;
  }

  getNeighbour(x, y, direction) {
    switch (direction) {
      case Ortho2DDirection.UP:
        return { x, y: y === 0 ? this._h - 1 : y - 1 };
      case Ortho2DDirection.DOWN:
        return { x, y: y === this._h - 1 ? 0 : y + 1 };
      case Ortho2DDirection.LEFT:
        return { x: x === 0 ? this._w - 1 : x - 1, y };
      case Ortho2DDirection.RIGHT:
        return { x: x === this._w - 1 ? 0 : x + 1, y };
    }
  }
}

class Ortho2DDirection {
  static UP = 0;
  static RIGHT = 1;
  static DOWN = 2;
  static LEFT = 3;

  static rotateClockwise(direction) {
    return (direction + 1) % 4;
  }

  static rotateCounterClockwise(direction) {
    return (direction + 3) % 4;
  }

  static flip(direction) {
    return (direction + 2) % 4;
  }
}

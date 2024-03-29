export default class Ship {
  constructor(length, name) {
    this.name = name;
    this.length = length;
    this.totalHit = 0;
    this.sunk = false;
  }

  hit() {
    this.totalHit += 1;

    if (this.totalHit === this.length) {
      this.isSunk();
    }
  }

  isSunk() {
    if (this.totalHit === this.length) {
      this.sunk = true;
    }
  }
}

import * as util from "util";
// eslint-disable-next-line import/extensions
import Ship from "./battle-ship.js";

export default class Gameboard {
  constructor() {
    this.sizeX = 10;
    this.sizeY = 10;
    this.board = this.createGameBoard();
  }

  createGameBoard() {
    const newBoard = [];

    for (let i = 0; i < this.sizeX; i += 1) {
      newBoard[i] = [];
      for (let j = 0; j < this.sizeY; j += 1) {
        newBoard[i][j] = j;
      }
    }

    return newBoard;
  }

  placeShip([corX, corY], ship) {
    const checkArray = this.board[corX].length + ship.length + corY;

    for (let i = 0; i < this.board[corX]; i += 1) {
      console.log(this.board[i]);
    }

    if (checkArray > 20 || checkArray < 11) return;

    if (this.slotCheck([corX, corY])) {
      for (let i = 0; i < ship.length; i += 1) {
        this.board[corX].splice(corY + i, 1, [ship, { destroyed: false }]);
      }
    }
  }

  receiveAttack([corX, corY]) {
    const shipObject = this.board[corX][corY];

    switch (typeof shipObject) {
      case "object":
        if (shipObject[1].destroyed === true) {
          break;
        }

        shipObject[0].hit();
        shipObject[1].destroyed = true;
        break;

      case "number":
        this.board[corX].splice(corY, 1, "Missed!");
        break;

      default:
        break;
    }
  }

  slotCheck([corX, corY]) {
    const shipObject = this.board[corX][corY];

    if (typeof shipObject !== "number") return false;
    if (typeof shipObject === "object") return false;

    return true;
  }

  // isComplete() {
  //   this.board;
  // }
}

const test = new Gameboard();
const ship = new Ship(5);

test.placeShip([1, 1], ship);
test.placeShip([1, 2], ship);
test.placeShip([1, 0], ship);

// test.receiveAttack([1, 2]);
// test.receiveAttack([1, 3]);
// test.receiveAttack([1, 4]);
// test.receiveAttack([1, 5]);
// test.receiveAttack([0, 1]);
// test.receiveAttack([0, 2]);

// test.receiveAttack([1, 2]);
// test.receiveAttack([1, 3]);
// test.receiveAttack([1, 4]);
// test.receiveAttack([1, 5]);
// test.receiveAttack([0, 1]);
// test.receiveAttack([0, 2]);

// console.log(util.inspect(test.board, false, null, true));

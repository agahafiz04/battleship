/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */

import * as util from "util";
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
    if (this.slotCheck([corX, corY], ship)) {
      for (let i = 0; i < ship.length; i += 1) {
        this.board[corX].splice(corY + i, 1, [ship, "Hit Me"]);
      }
    }
  }

  receiveAttack([corX, corY]) {
    const shipObject = this.board[corX][corY];

    switch (typeof shipObject) {
      case "object":
        if (shipObject[1] === "Hit!") {
          break;
        }

        shipObject[0].hit();
        shipObject[1] = "Hit!";
        break;

      case "number":
        this.board[corX].splice(corY, 1, "Missed!");
        break;

      default:
        break;
    }
  }

  slotCheck([corX, corY], ship) {
    const shipObject = this.board[corX][corY];
    const checkArray = this.board[corX].length + ship.length + corY;
    const currentArray = this.board[corX];

    for (let i = corY; i < corY + ship.length; i += 1) {
      if (typeof currentArray[i] !== "number") return false;
    }

    if (typeof currentArray[corY - 1] === "object") return false;

    if (this.board[corX - 1].some((value) => typeof value === "object")) {
      return false;
    }

    if (
      checkArray > 20 ||
      checkArray < 11 ||
      typeof shipObject !== "number" ||
      typeof shipObject === "object"
    ) {
      return false;
    }

    return true;
  }

  isComplete() {
    const shipList = [];

    this.board.forEach((item) => {
      const getShip = item.filter((ship) => typeof ship === "object");
      getShip.forEach((ship) => shipList.push(ship[0]));
    });

    const unique = shipList.filter(
      (obj, index) => index === shipList.findIndex((o) => obj.name === o.name)
    );

    const isComplete = unique.every((obj) => obj.sunk === true);

    return isComplete;
  }
}

const test = new Gameboard();
const ship1 = new Ship(5, "ship-one");
const ship4 = new Ship(3, "ship-two");
const ship5 = new Ship(2, "ship-three");

test.placeShip([1, 1], ship1);
// test.placeShip([1, 7], ship5);
// test.placeShip([3, 0], ship4);
// test.placeShip([2, 1], ship2);

test.receiveAttack([1, 1]);
test.receiveAttack([1, 2]);
test.receiveAttack([1, 3]);
test.receiveAttack([1, 4]);
test.receiveAttack([1, 5]);
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

console.log(util.inspect(test.board, false, null, true));

console.log(test.isComplete());

// 1.

export default class Player {
  constructor(playerName) {
    this.player = playerName;
  }
}

const playerOne = new Player("Player One");
// const playerTwo = new Player("Computer");

console.log(playerOne);


export class TicTacToe {
  constructor() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentPlayer = 1;
  }

  makeMove(button) {
    const cellValue = button.value;
    if (this.board[cellValue] !== 0) {
      return false;
    }

    this.board[cellValue] = parseInt(this.currentPlayer);
    this.currentPlayer *= -1;

    return true;
  }

  setCurrentPlayer(currentPlayer) {
    if (currentPlayer) {
      currentPlayer = 1;
    }
    else {
      currentPlayer = -1;
    }
  }

  isWinner() {
    console.log(this.board)
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      let winner = this.board[combination[0]];
      if (winner !== 0 && winner === this.board[combination[1]] && winner === this.board[combination[2]]) {
        return {
          winner: (winner == 1) ? "X" : "O",
          moves: combination,
        };
      }
    }

    return {
      winner: this.isDraw() ? "Draw" : null,
      move: null,
    };
  }

  isDraw() {
    for (let i = 0; i < 9; i++) {
      if (this.board[i] === 0) {
        return false;
      }
    }

    return true;
  }

  restart() {
    this.currentPlayer = 1;
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

}
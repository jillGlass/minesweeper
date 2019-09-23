document.addEventListener("DOMContentLoaded", startGame);

// Define your `board` object here!

var board = {
  cells: []
};
//define board object to be empty
function createNewBoard() {
  for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5; y++)
      board.cells.push({
        row: x,
        col: y,
        isMine: Boolean(Math.round(Math.random() * 0.8)),
        isMarked: false,
        hidden: true
      });
  }
}

function startGame() {
  createNewBoard();
  lib.initBoard();
  board.cells.forEach(cell => {
    cell.surroundingMines = countSurroundingMines(cell);
  });
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
}

// Define this function to look for a win condition:

function checkForWin() {
  for (i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return;
    }
  }
  lib.displayMessage("You win!");
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  surrounding.forEach(function(i) {
    if (i.isMine == true) {
      count++;
    }
  });

  return count;
}

//Each cell will need row, col, isMine, isMarked, and hidden properties.
//You could start by simply setting every isMine to true, but later you'll probably want to //have a random number of mines scattered throughout the board.

//function resetGame() {
//  document.getElementById("newGame").addEventListener("click", createNewBoard);
//}

//creates a new game but still has old one there!

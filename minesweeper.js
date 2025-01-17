document.addEventListener("DOMContentLoaded", startGame);
//mine count

// tick sound on each button click
var snd = new Audio("sounds/tick.wav");
document.addEventListener("click", function() {
  snd.play();
});
//crackle sound on each Flag
var sndFlag = new Audio("sounds/crackle.wav");
document.addEventListener("contextmenu", function() {
  sndFlag.play();
});
//rocket sound on each mine
var sndMine = new Audio("sounds/smallRocket.mp3");
//rocket sound on each mine but not working!
var sndWin = new Audio("sounds/clapping.mp3");
// Define your `board` object here!

var board = {
  cells: []
};

//newgame to be at level played previously
//onclick of newGame button,
function newGame() {
  if (this.difficulty == 6) {
    createHard();
  } else if (this.difficulty == 5) {
    createMedium();
  } else if (this.difficulty == 4) {
    createEasy();
  }
}
//"window.location.href = window.location.href"
var difficulty = 5;
//difficulty. click easy and get 4x4, medium get 5x5, hard get 6x6.
//easy, onclick,

function createEasy() {
  console.log("easy button pressed");
  clearBoard();
  resetBoard();
  difficulty = 4;
  startGame();
  mineCount = 0;
}

function createMedium() {
  console.log("medium button pressed");
  clearBoard();
  resetBoard();
  difficulty = 5;
  startGame();
  mineCount = 0;
}

function createHard() {
  console.log("hard button pressed");
  clearBoard();
  resetBoard();
  difficulty = 6;
  startGame();
  mineCount = 0;
}

//define board object to be empty
function createNewBoard() {
  for (var x = 0; x < difficulty; x++) {
    for (var y = 0; y < difficulty; y++)
      board.cells.push({
        row: x,
        col: y,
        isMine: Boolean(Math.round(Math.random() * 0.7)),
        isMarked: false,
        hidden: true
      });
  }
}
function clearBoard() {
  console.log("board cleared");
  board = {
    cells: []
  };
}
function resetBoard() {
  document.getElementsByClassName("board")[0].innerHTML = "";
}

function startGame() {
  createNewBoard();
  lib.initBoard();
  board.cells.forEach(cell => {
    cell.surroundingMines = countSurroundingMines(cell);
  });
  document.addEventListener("click", checkForWin);
  document.addEventListener("click", checkForMineCount);
  document.addEventListener("contextmenu", checkForWin);
  var easy = document.getElementById("easy");
  easy.addEventListener("click", createEasy, false);
  var medium = document.getElementById("medium");
  medium.addEventListener("click", createMedium, false);
  var hard = document.getElementById("hard");
  hard.addEventListener("click", createHard, false);
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
  lib.displayMessage("Out of this world!");
  sndWin.play();
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

//add a counter of how many flags left to use (1 flag per bomb).xx
//checkForMineCount will count how many mines there are in that board. Display for easy level.

var mineCount = 0;
function checkForMineCount() {
  for (i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine) {
      mineCount++;
    }
    if (difficulty == 4) {
      document.getElementById("message").innerText =
        "Rockets hidden:" + mineCount;
    }
  }
  document.removeEventListener("click", checkForMineCount);
}

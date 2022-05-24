/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//size of the board width x height
const WIDTH = 7;
const HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
const makeBoard = () => {
  //add an empty array of width size height times
  for (let i = 0; i < HEIGHT; i++) {
    board.push(new Array(WIDTH));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
const makeHtmlBoard = () => {
  // Get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // Make a table row named top
  var top = document.createElement("tr");
  //give it an id of "column-top"
  top.setAttribute("id", "column-top");
  //make it clickable
  top.addEventListener("click", handleClick);
  //make witdth amount of table cells called headcell
  for (let x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    //give the head cells the id value of x
    headCell.setAttribute("id", x);
    //add headcell to top row
    top.append(headCell);
  }
  //add top row to the board
  htmlBoard.append(top);

  // make height amount of rows
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //add width amount of cells for every row
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //give each cell a id of x and y coordinates
      cell.setAttribute("id", `${y}-${x}`);
      //add cell to row
      row.append(cell);
    }
    //add row to board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
const findSpotForCol = (x) => {
  //top left corner of grid is 0,0 so we start checking grid from bottom which is height-1
  for (let i = HEIGHT - 1; i >= 0; i--) {
    //get the cell to check
    let cell = document.getElementById(`${i}-${x}`);
    //check if if there is something in cell
    if (!cell.firstChild) {
      return i;
    }
  }
  //if every cell was full return null
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
const placeInTable = (y, x) => {
  // Make a game piece and insert into correct cell
  let gameCoin = document.createElement("div");
  let cell = document.getElementById(`${y}-${x}`);
  //Find out which color piece needs to be placed
  if (currPlayer == 1) {
    gameCoin.className = "piece p1";
  } else if (currPlayer == 2) {
    gameCoin.className = "piece p2";
  }
  //add the game piece to the cell
  cell.append(gameCoin);
}

/** endGame: announce game end */
const endGame = (msg) => {
  alert(msg)
}
/** handleClick: handle click of column top to play piece */
const handleClick = (evt) => {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  // check for tie
  if (checkForTie()) {
    return endGame("It's a draw!!");
  }

  // switch players
  switchPlayers();
}

// switch currPlayer 1 <-> 2
const switchPlayers = () => currPlayer == 1 ? currPlayer = 2 : currPlayer = 1;

/** checkForWin: check board cell-by-cell for "does a win start here?" */
const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 && //
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // For every X and Y coordinate
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      //check 4 in a row horizontally
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //check 4 in a row vertically
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //check 4 in a row diagonally(down right)
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //check 4 in a row diagonally(down left)
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //if any four pieces are next to each other return win as true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// check for tie
const checkForTie = () => {
  // For every X and Y coordinate
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      //get cell by its xy coordinate
      let cell = document.getElementById(`${y}-${x}`);
      //if there are any empty cells return false
      if (!cell.firstChild) {
        return false;
      }
    }
  }
  //if all cells are filled return true
  return true;
}

makeBoard();
makeHtmlBoard();

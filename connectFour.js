// Declare constant container set equal to object document, method querySelector, passing as an argument class ".container"
const container = document.querySelector(".container");
// Declare constant playerTurn set equal to object document, method getElementById, passing as an argument id "playerTurn"
const playerTurn = document.getElementById("playerTurn");
// Declare constant message set equal to object document, method getElementById, passing as an argument id "message"
const message = document.getElementById("message");
// Declare variable initialMatrix as a 2d array, 6 rows, 7 columns, initialized to all 0s
var initialMatrix = new Array(6).fill(0).map(() => new Array(7).fill(0));
// Declare variable currentPlayer to store the current player
var currentPlayer = 1;

function gameOverCheck() {
  let count = 0;
  for (const innerArray of initialMatrix) {
    if (innerArray.every((val) => val !== 0)) {
      count++;
    } else {
      return false;
    }
  }

  if (count === 6) {
    message.innerText = "Game Over";
    return false;
  }
}

function winCheck(row, column) {
  if (
    checkVertical(row, column) ||
    checkHorizontal(row, column) ||
    checkPositiveDiagonal(row, column) ||
    checkNegativeDiagonal(row, column)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkVertical(row, column) {
  for (let i = row; i < 6; i++) {
    for (let j = column; j < 7; j++) {
      if (initialMatrix[i][j] === currentPlayer) {
        if (
          initialMatrix[i + 1] &&
          initialMatrix[i + 1][j] === currentPlayer &&
          initialMatrix[i + 2] &&
          initialMatrix[i + 2][j] === currentPlayer &&
          initialMatrix[i + 3] &&
          initialMatrix[i + 3][j] === currentPlayer
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkHorizontal(row, column) {
  for (let i = row; i < 6; i++) {
    for (let j = column; j < 7; j++) {
      // console.log(column);
      if (initialMatrix[i][j] === currentPlayer) {
        if (
          initialMatrix[i] &&
          initialMatrix[i][j - 1] &&
          initialMatrix[i][j - 1] === currentPlayer &&
          initialMatrix[i] &&
          initialMatrix[i][j - 2] &&
          initialMatrix[i][j - 2] === currentPlayer &&
          initialMatrix[i] &&
          initialMatrix[i][j - 3] &&
          initialMatrix[i][j - 3] === currentPlayer
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkPositiveDiagonal(row, column) {
  for (let i = row; i < 6; i++) {
    for (let j = column; j < 7; j++) {
      if (initialMatrix[i][j] === currentPlayer) {
        if (
          initialMatrix[i + 1] &&
          initialMatrix[i + 1][j - 1] === currentPlayer &&
          initialMatrix[i + 2] &&
          initialMatrix[i + 2][j - 2] === currentPlayer &&
          initialMatrix[i + 3] &&
          initialMatrix[i + 3][j - 3] === currentPlayer
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkNegativeDiagonal(row, column) {
  for (let i = row; i < 6; i++) {
    for (let j = column; j < 7; j++) {
      if (initialMatrix[i][j] === currentPlayer) {
        if (
          initialMatrix[i + 1] &&
          initialMatrix[i + 1][j + 1] === currentPlayer &&
          initialMatrix[i + 2] &&
          initialMatrix[i + 2][j + 2] === currentPlayer &&
          initialMatrix[i + 3] &&
          initialMatrix[i + 3][j + 3] === currentPlayer
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
// Write function setPiece
function setPiece(startCount, colValue) {
  // Declare variable rows initialized to object document, method querySelectorAll, passing argument class ".grid-row"
  var rows = document.querySelectorAll(".grid-row");
  // If the element in array initialMatrix at indexes parameters startCount and colValue is NOT equal to 0
  try {
    if (initialMatrix[startCount][colValue] !== 0) {
      // Decrement parameter startCount by 1
      startCount--;
      // Call function setPiece, passing as arguments parameters startCount and colValue
      setPiece(startCount, colValue);
    }
    // Else
    else {
      // Declare variable currentRow initialized to array rows, index startCount, method querySelectorAll, passing as an argument class ".grid-box"
      var currentRow = rows[startCount].querySelectorAll(".grid-box");
      // Modify currentRow, index colValue, object classlist, method add, passing as arguments "filled" and `player${currentPlayer}`
      currentRow[colValue].classList.add("filled", `player${currentPlayer}`);
      // Update array initialMatrix, indexes startCount and colValue, set equal to currentPlayer
      initialMatrix[startCount][colValue] = currentPlayer;
      // If function call winCheck, passing as arguments parameters startCount and colValue is true
      if (winCheck(startCount, colValue)) {
        // Set object message's innerHTML equal to `Player<span> ${currentPlayer}</span> wins`
        message.innerHTML = `Player<span> ${currentPlayer}</span> wins`;
        // Return false
        return false;
      }
      // Call function gameOverCheck
      gameOverCheck();
    }
  } catch (e) {
    alert("Column full, select again");
  }
}

// Write function fillBox
function fillBox(e) {
  // Declare variable colValue set equal to function parseInt() of parameter e, object target, function getAttribute, passing as argument "data-value"
  var colValue = parseInt(e.target.getAttribute("data-value"));

  // Call function setPiece, passing arguments 5 (because we have 6 rows, 0 - 5) and variable colValue
  setPiece(5, colValue);

  // Switch the currentPlayer, if currently 1 then 2, if currently 2, then 1
  currentPlayer = currentPlayer === 1 ? 2 : 1;

  // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
  playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// Write function createBoard
function createBoard() {
  // Iterate through the 2d array initialMatrix
  // Write an outer for in loop to iterate through the rows, loop control variable innerArray
  for (let innerArray = 0; innerArray < 6; innerArray++) {
    // Declare variable outerDiv set equal to object document, method createElement, passing "div" as an argument
    var outerDiv = document.createElement("div");
    // Modify outerDiv, classList, to add class "grid-row"
    outerDiv.classList.add("grid-row");

    // Modify outerDiv to setAttribute "data-value" to loop control variable innerArray
    outerDiv.setAttribute("data-value", innerArray);

    // Write an inner for in loop to iterate through the columns, loop control variable j
    for (let j = 0; j < 7; j++) {
      // Set each element in array initialMatrix to the value of 0
      initialMatrix[innerArray][j] = 0;

      // Declare variable innerDiv set equal to object document, method createElement, passing "div" as an argument
      var innerDiv = document.createElement("div");

      // Modify innerDiv, classList, to add class "grid-box"
      innerDiv.classList.add("grid-box");

      // Modify innerDiv to setAttribute "data-value" to loop control variable j
      innerDiv.setAttribute("data-value", j);

      // Modify innerDiv to addEventListener, passing arguments "click" and (e) => { fillBox(e); }
      innerDiv.addEventListener("click", (e) => {
        fillBox(e);
      });

      // Modify outerDiv to appendChild, passing argument innerDiv
      outerDiv.appendChild(innerDiv);
    }
    // Modify container to appendChild, passing argument outerDiv
    container.appendChild(outerDiv);
  }
}

// Write function startGame
function startGame() {
  // Set currentPlayer to 1, player 1 always goes first
  currentPlayer = 1;

  // Set the container's innerHTML to an empty string
  container.innerHTML = "";

  // Call function createBoard
  createBoard();

  // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
  playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// For the window.onload event, call function startGame
window.onload = startGame();

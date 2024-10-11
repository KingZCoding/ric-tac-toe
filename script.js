// creating a 2d array to build a board
let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

// creating a variable to store current player
let currentPlayer = 'X';

let boardContainer = document.getElementById('board-container');

// Get references to the input field and chat display area
const textInput = document.getElementById('chat-text');
const output = document.querySelector('.screen');

// Add an event listener for the 'keydown' event
textInput.addEventListener('keydown', function (event) {
  // Check if the pressed key is "Enter"
  if (event.key === 'Enter' && textInput.value.trim() !== '') {
    // Prevent the default behavior (optional)
    event.preventDefault();

    // Get the current value of the input field
    const message = textInput.value;

    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.textContent = message; // Set the text content to the message

    // Append the message to the chat display area
    output.appendChild(messageElement);

    // Clear the input field after sending the message
    textInput.value = '';
  }
});

function createBoard() {
  boardContainer.innerHTML = '';
  for (let i = 0; i < board.length; i++) {
    // creating a new boardRow looping through the board array
    let boardRow = document.createElement('div');
    if (i === 1) {
      boardRow.classList.add('middle-row');
    }
    boardRow.classList.add('board-row');

    for (let j = 0; j < board[0].length; j++) {
      //   creating a new column looping through board array
      let boardCell = document.createElement('span');
      if (j === 1) {
        boardCell.classList.add('middle-col');
      }
      boardCell.classList.add('cells');
      boardCell.textContent = board[i][j];
      // appending the cell to the row
      boardRow.appendChild(boardCell);
    }
    //   appending the row to the board
    boardContainer.appendChild(boardRow);
  }
  const cells = document.querySelectorAll('.cells');
  cells.forEach((cell, index) => {
    //
    const row = Math.floor(index / 3);
    const col = index % 3;

    cell.addEventListener('click', function () {
      handleCellClick(row, col, cell);
    });
  });
}

// creating a function to handle the cell click
function handleCellClick(row, col, cell) {
  // board row and column = 0 then it is currentPlayers turn changing text content to X and assigning class list
  if (board[row][col] === 0) {
    board[row][col] = currentPlayer;
    cell.textContent = currentPlayer;

    //checking for winner after each move
    const winner = checkWinner(board);
    if (winner) {
      const message = document.getElementById('message');
      message.textContent = `${winner} has won the game!`;
      message.style.display = 'block';
    } else {
      // setting current player to 'X' if not then setting to 'O' else 'X'
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWinner(board) {
  // checking row
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }

  // checking col
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
      return board[0][j];
    }
  }

  // checking diagnols
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }
  return null;
}

function resetGame() {
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  createBoard();
  currentPlayer = 'X';
  message.style.display = 'none';
}

createBoard();

const key = 'tic-tac-toe-game-state';
let currentPlayerSymbol = 'x';
let squareValues = ['', '', '', '', '', '', '', '', ''];
let gameStatus = '';
const newGameButton = document.getElementById('new-game');

function saveGameState() {
     const state = {
          currentPlayerSymbol,
          squareValues,
          gameStatus,
     };

     window.localStorage.setItem(key, JSON.stringify(state));
}

function loadGameState() {
     const savedState = localStorage.getItem(key);

     if (savedState === null) {
          return;
     }

     const state = JSON.parse(savedState);

     currentPlayerSymbol = state.currentPlayerSymbol;
     squareValues = state.squareValues;
     gameStatus = state.gameStatus;

     for (let i = 0; i < 9; i++) {
          if (squareValues[i] !== '') {
               const img = document.createElement("img");

               img.setAttribute(
                 "src",
                 `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currentPlayerSymbol}.svg`
               )

               document.getElementById(`square-${i}`).appendChild(img);
          }
     }

     if (gameStatus !== '') {
          document.getElementById('game-status').innerHTML = `Winner: ${gameStatus}`;
          newGameButton.disabled = false;
          document.getElementById('give-up').disabled = true;
     } else {
          document.getElementById('game-status').innerHTML = '';
          newGameButton.disabled = true;
          document.getElementById('give-up').disabled = false;
     }
}

function checkGameStatus() {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    if (squareValues[i] !== "" &&
      squareValues[i] === squareValues[i + 1] &&
      squareValues[i] === squareValues[i + 2]) {
      gameStatus = squareValues[i];
    }
  }

  //Check columns
  for (let i = 0; i < 3; i++) {
    if (squareValues[i] !== "" &&
      squareValues[i] === squareValues[i + 3] &&
      squareValues[i] === squareValues[i + 6]
    ) {
      gameStatus = squareValues[i];
    }
  }

  //Check diagonals
  if (squareValues[0] !== "" &&
    squareValues[0] === squareValues[4] &&
    squareValues[0] === squareValues[8]) {
    gameStatus = squareValues[0];
  }

  if (squareValues[2] !== "" &&
    squareValues[2] === squareValues[4] &&
    squareValues[2] === squareValues[6]) {
    gameStatus = squareValues[2];
  }

  // Check for a tie
  let boardIsFilled = true;
  for (let i = 0; i < 9; i++) {
       if (squareValues[i] === '') {
            boardIsFilled = false;
       }
  }

  if (boardIsFilled) {
       gameStatus = 'None';
  }


  if (gameStatus !== "") {
    let gameStatusMessage = document.getElementById("game-status");
    gameStatusMessage.innerHTML = `Winner: ${gameStatus.toUpperCase()}`;
    newGameButton.disabled = false;
    giveUpButton.disabled = true;
  }
}

window.addEventListener('DOMContentLoaded', event => {
     loadGameState();
     const ticTacToeGrid = document.getElementById("tic-tac-toe-board");
     ticTacToeGrid.addEventListener('click', event => {
          const targetID = event.target.id;
          if (!targetID.includes('square-')) {
               return;
          }

          let index = Number.parseInt(targetID.charAt(targetID.length - 1));

          if (squareValues[index] !== '') {
               return;
          }

          const img = document.createElement('img');

          img.setAttribute(
            "src",
            `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currentPlayerSymbol}.svg`
          );

          squareValues[index] = currentPlayerSymbol;

          currentPlayerSymbol = currentPlayerSymbol === 'x' ? 'o': 'x'

          event.target.appendChild(img);


     checkGameStatus();
     saveGameState();
     });

     newGameButton.addEventListener('click', event => {
          gameStatus = '';

          // Clear out the header that contains the game status
          document.getElementById('game-status').innerHTML = '';

          // Loop through the values 0-8
          for (let i = 0; i < 9; i++) {
               // Get a reference to the HTML element with id='square-X' and set its innerHTML to blank
               document.getElementById(`square-${i}`).innerHTML = '';
          }

          currentPlayerSymbol = 'x';
          newGameButton.disabled = true;
          squareValues = ["", "", "", "", "", "", "", "", ""];

          giveUpButton.disabled = false;
          saveGameState();

     });

     const giveUpButton = document.getElementById("give-up");

     giveUpButton.addEventListener('click', event => {
          if (currentPlayerSymbol === 'x') {
            gameStatus = "O";
          } else {
            gameStatus = "X";
          }


          let gameStatusMessage = document.getElementById("game-status");
          gameStatusMessage.innerHTML = `Winner: ${gameStatus}`;
          newGameButton.disabled = false;
          giveUpButton.disabled = true;

          saveGameState();

     })

})

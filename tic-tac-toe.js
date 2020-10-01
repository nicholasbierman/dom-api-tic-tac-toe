let currentPlayerSymbol = 'x';
const squareValues = ['', '', '', '', '', '', '', '', '']
window.addEventListener('DOMContentLoaded', event => {
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



     })
})

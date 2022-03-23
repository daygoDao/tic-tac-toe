const gameboard = () => {
  let board = ['', '', '', '', '', '', '', '', ''];
  let playerX = 'x';
  let playerO = 'o';
  const checkWinner = () => {
    if (board[0] == playerO && board[1] == playerO && board[2] == playerO) {
      return playerO;
    } else {
      return playerX;
    }
  }
  return {
    checkWinner
  };
}

function markSpot(e) {
  console.log(e.target.title)
  if (e.target.textContent !== '') {
    console.log('already taken');
  } else {
    // x goes first then o
    if (playerX.moveCounter == playerO.moveCounter) {
      e.target.textContent = 'X'
      playerX.moveCounter++;
      console.log(playerX.moveCounter)
    } else if (playerX.moveCounter > playerO.moveCounter) {
      e.target.textContent = 'O'
      playerO.moveCounter++;
      console.log(playerO.moveCounter)
    }
  }

  //check if winner is found

}

// player object
const player = (faction) => {
  let moveCounter = 0;
  this.faction = faction;
  return {
    moveCounter,
    faction
  };
}

//create player 1 and 2
const playerO = player('O');
const playerX = player('X');






// start game
document.querySelector('.start-it').addEventListener('click', start);


function start(e) {
  //console.log(e);
  let count = 0;

  if (count % 2 == 0) {
    //markSpot(playerO);
    count++;
  } else {
    //markSpot(playerX);
    count++;
  }

  //reset gameboard to blank
  let squares = document.querySelectorAll('.territory')
  for (let square of squares) {
    console.log(square.textContent = '');
  }
  // add event listeners to all playable squares
  for (let square of squares) {
    square.addEventListener('click', markSpot);
  }


}
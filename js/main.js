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
    e.target.textContent = 'X'
    console.log('marked!')
  }

  //check if winner is found

}

// start game
document.querySelector('.start-it').addEventListener('click', start);

function start(e) {
  //console.log(e);
  //reset gameboard to blank
  let squares = document.querySelectorAll('.territory')
  for (let square of squares) {
    console.log(square.textContent = '');
  }
  // add event listeners to all playable squares
  for (let square of squares) {
    square.addEventListener('click', markSpot);
  }

  //create player 1 and 2

}
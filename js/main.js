// player object
const player = (faction) => {
  let moveCounter = 0;
  this.faction = faction;
  const getCounter = () => moveCounter;
  const resetCounter = () => moveCounter = 0;
  const addOne = () => moveCounter++;
  return {
    faction,
    getCounter,
    resetCounter,
    addOne
  };
}


const gameboard = () => {
  let squares = [];
  let game = 1;
  const resetSquareArr = () => squares.length = 0;
  const getGameNumber = () => {
    return game;
  }
  const nextGame = () => game++;
  const resetGame = () => game = 1;
  return {
    squares,
    getGameNumber,
    resetSquareArr,
    nextGame,
    resetGame
  };
}

const checkWinner = (player) => {
  // check consec rows
  for (let i = 0; i < 9; i += 3)
    if (board.squares[i] == player.faction &&
      board.squares[i + 1] == player.faction &&
      board.squares[i + 2] == player.faction) {
      alert(`winner is ${player.faction}, consec row`);
      board.nextGame();
      setBoard();
      return `winner is ${player.faction}`;
    }

  // check consec columns
  for (let i = 0; i < 3; i++) {
    if (board.squares[i] == player.faction &&
      board.squares[i + 3] == player.faction &&
      board.squares[i + 6] == player.faction) {
      alert(`winner is ${player.faction}, consec column`);
      board.nextGame();
      setBoard();
      return `winner is ${player.faction}`;
    }
  }

  // check diagonal
  if ((board.squares[0] == player.faction &&
      board.squares[4] == player.faction &&
      board.squares[8] == player.faction) ||
    (board.squares[2] == player.faction &&
      board.squares[4] == player.faction &&
      board.squares[6] == player.faction)) {
    alert(`winner is ${player.faction}, consec diagonal`);
    board.nextGame();
    setBoard();
    return `winner is ${player.faction}`;
  }

}

function markSpot(e) {
  console.log(e.target.title)
  if (e.target.textContent !== '') {
    console.log('already taken');
  } else {
    // x goes first then o
    if (playerX.getCounter() == playerO.getCounter()) {
      e.target.textContent = 'X'
      board.squares[e.target.title] = playerX.faction;
      playerX.addOne();
      checkWinner(playerX);
      console.log(playerX.getCounter())
    } else if (playerX.getCounter() > playerO.getCounter()) {
      e.target.textContent = 'O'
      board.squares[e.target.title] = playerO.faction;
      playerO.addOne();
      console.log(playerO.getCounter())
      checkWinner(playerO);
    }
  }
}



function setBoard(e) {
  alert('this is game: ' + board.getGameNumber());
  if(board.getGameNumber() > 3) {
    alert('3 games are done, now to reset back to game 1')
    board.resetGame();
  }

  //reset gameboard to blank
  let squares = document.querySelectorAll('.territory')
  for (let square of squares) {
    console.log(square.textContent = '');
  }
  // reset move counter from player obj
  playerO.resetCounter();
  playerX.resetCounter();
  //reset board arr
  board.resetSquareArr();

  // add event listeners to all playable squares
  for (let square of squares) {
    square.addEventListener('click', markSpot);
  }
}

//create player 1 and 2
const playerO = player('O');
const playerX = player('X');
const board = gameboard();

document.querySelector('.start-it').addEventListener('click', setBoard);
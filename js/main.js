// player object
const player = (faction) => {
  let moveCounter = 0;
  let wins = 0;
  this.faction = faction;
  const getCounter = () => moveCounter;
  const resetCounter = () => moveCounter = 0;
  const movesDone = () => moveCounter++;
  const addWin = () => wins++;
  const getWins = () => {
    return wins;
  }
  const resetWins = () => wins = 0;
  return {
    faction,
    getCounter,
    resetCounter,
    movesDone,
    addWin,
    getWins,
    resetWins
  };
}

const gameboard = () => {
  let squares = [];
  const resetSquareArr = () => squares.length = 0;
  return {
    squares,
    resetSquareArr
  }
}

// winner of war will be determined by best of three matches
const bestOf3 = () => {
  let game = 1;
  const getGameNumber = () => {
    return game;
  }
  const nextGame = () => game++;
  const resetGame = () => game = 1;
  return {
    getGameNumber,
    nextGame,
    resetGame
  }
}

const checkMatchWinner = (player) => {
  // check consec rows
  for (let i = 0; i < 9; i += 3)
    if (board.squares[i] == player.faction &&
      board.squares[i + 1] == player.faction &&
      board.squares[i + 2] == player.faction) {
      alert(`winner is ${player.faction}, consec row`);
      player.addWin();
      war.nextGame();
      setBoard();
      return `winner is ${player.faction}`;
    }

  // check consec columns
  for (let i = 0; i < 3; i++) {
    if (board.squares[i] == player.faction &&
      board.squares[i + 3] == player.faction &&
      board.squares[i + 6] == player.faction) {
      alert(`winner is ${player.faction}, consec column`);
      player.addWin();
      war.nextGame();
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
    player.addWin();
    war.nextGame();
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
      playerX.movesDone();
      checkMatchWinner(playerX);
      console.log(playerX.getCounter())
    } else if (playerX.getCounter() > playerO.getCounter()) {
      e.target.textContent = 'O'
      board.squares[e.target.title] = playerO.faction;
      playerO.movesDone();
      console.log(playerO.getCounter())
      checkMatchWinner(playerO);
    }
  }
}

function setBoard(e) {
  checkWarWinner();

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

function checkWarWinner() {
  let xScore = document.querySelector('.scorePlayerX');
  let oScore = document.querySelector('.scorePlayerO');

  if (playerO.getWins() == 2) {
    alert('O wins the war!')
    war.resetGame();
    playerO.resetWins();
    playerX.resetWins();
  } else if (playerX.getWins() == 2) {
    alert('X wins the war!');
    playerO.resetWins();
    playerX.resetWins();
    war.resetGame();
  } else {
    alert('this is game: ' + war.getGameNumber() + '. X goes first.');
  }

  oScore.textContent = playerO.getWins();
  xScore.textContent = playerX.getWins();
}

////////////////////////////////////////////////////////////////

//create player 1 and 2
const playerO = player('O');
const playerX = player('X');
const board = gameboard();
const war = bestOf3();
document.querySelector('.start-it').addEventListener('click', setBoard);
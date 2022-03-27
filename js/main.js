// player object
const Player = (faction) => {
  let moveCounter = 0;
  let wins = 0;
  let isAI = false;
  this.goesFirst = false;
  this.faction = faction;
  const getMoveCounter = () => moveCounter;
  const resetMoveCounter = () => moveCounter = 0;
  const addToMoveCounter = () => ++moveCounter;
  const addWin = () => wins++;
  const getWins = () => {
    return wins;
  }
  const resetWins = () => wins = 0;
  return {
    isAI,
    goesFirst,
    faction,
    getMoveCounter,
    resetMoveCounter,
    addToMoveCounter,
    addWin,
    getWins,
    resetWins
  };
}

class Gameboard {
  constructor() {
    this.squaresFilled = 0;
    this.squares = ['', '', '', '', '', '', '', '', ''];
  }
  fillSquares() {
    this.squaresFilled++;
  }
  getFilledSquares() {
    return this.squaresFilled;
  }
  resetSquareArr() {
    this.squaresFilled = 0;
    for (let i = 0; i < 9; i++) {
      this.squares[i] = ''
    }
  }
}

// winner of war will be determined by best of three matches
const BestOf3 = () => {
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
  // if tie
  //console.log('within checkMatchWinner.', `squaresFilled is ${board.getFilledSquares()}`)
  if (board.getFilledSquares() == 9) {
    alert('tie game')
    matchWinner();
  }

  // check consec rows
  for (let i = 0; i < 9; i += 3)
    if (board.squares[i] == player.faction &&
      board.squares[i + 1] == player.faction &&
      board.squares[i + 2] == player.faction) {
      alert(`winner is ${player.faction}, consec row`);
      matchWinner(player);
    }

  // check consec columns
  for (let i = 0; i < 3; i++) {
    if (board.squares[i] == player.faction &&
      board.squares[i + 3] == player.faction &&
      board.squares[i + 6] == player.faction) {
      alert(`winner is ${player.faction}, consec column`);
      matchWinner(player);
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
    matchWinner(player);
  }
}

function matchWinner(player = 'tie') {
  if (player !== 'tie') {
    player.addWin();
    war.nextGame();

    //return `winner is ${player.faction}`;
  } else {
    alert('its a tie within matchWinner');
  }
  setBoard();
}

function markSpot(e) {
  if (e.target.textContent !== '') {
    console.log('already taken');
  } else {
    if ((playerX.goesFirst == true && board.getFilledSquares() % 2 == 0) ||
      (playerX.goesFirst == false && board.getFilledSquares() % 2 !== 0)) {
      helpMarkSpot(playerX, e);
      checkMatchWinner(playerX);
      //check if O is AI
      if (playerO.isAI == true && playerX.getMoveCounter() > 0) {
        console.log('calling from markSpot')
        vsComputer();
      }
    } else if ((playerO.goesFirst == true && board.getFilledSquares() % 2 == 0) ||
      (playerO.goesFirst == false && board.getFilledSquares() % 2 !== 0)) {
      helpMarkSpot(playerO, e);
      checkMatchWinner(playerO);
    }
  }
}

/**
 * markSpot helper
 */
function helpMarkSpot(player, e) {
  e.target.textContent = player.faction;
  board.squares[e.target.title] = player.faction;
  board.fillSquares();
  player.addToMoveCounter();
}

function setBoard() {
  checkWarWinner();
  // reset move counter from player obj
  playerO.resetMoveCounter();
  playerX.resetMoveCounter();
  playerO.goesFirst = false;
  playerX.goesFirst = false;
  //reset board arr
  board.resetSquareArr();

  //reset gameboard to blank
  let squares = document.querySelectorAll('.territory')
  for (let square of squares) {
    square.textContent = '';
  }

  // add event listeners to all playable squares
  for (let square of squares) {
    square.addEventListener('click', markSpot);
  }

  // rng who starts this round
  let goesFirst = (Math.random() < .5) ? 'X' : 'O';
  if (goesFirst == 'X') {
    playerX.goesFirst = true;
  } else {
    playerO.goesFirst = true;
  }
  alert(`o ${playerO.goesFirst} x ${playerX.goesFirst}`);

  //does player O go first? if so then make that move!
  if (playerO.goesFirst == true && playerO.isAI == true) {
    alert('meep meep')
    console.log('calling from setBoard')
    vsComputer();
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
    alert('Match: ' + war.getGameNumber());
  }

  oScore.textContent = playerO.getWins();
  xScore.textContent = playerX.getWins();
}

function startWar() {
  // reset scoreboard
  playerO.resetWins();
  playerX.resetWins();
  war.resetGame();

  let gameMode = document.getElementById('playerMode');
  if (gameMode.value == 1) { //pve
    alert(`gameMode value is ${gameMode.value}`)
    playerO.isAI = true;
    //pve function?

  }
  setBoard();
}

/**
 * playerO will be the computer
 * @param
 * @returns 
 */
function vsComputer() {
  if(playerO.goesFirst == true && playerO.getMoveCounter() == 0){}
  let compChoice = Math.floor(Math.random() * 10);
  while (board.squares[compChoice] !== '') {
    compChoice = Math.floor(Math.random() * 10);
  }
  //console.log(compChoice)
  //now mark spot on board and on UI
  let squares = document.querySelector('.gameboard').children;
  let square = squares.item(compChoice);
  console.log(square);
  square.textContent = playerO.faction;
  board.squares[square.title] = playerO.faction;
  board.fillSquares();
  playerO.addToMoveCounter();
  checkMatchWinner(playerO)

  return compChoice;
}

////////////////////////////////////////////////////////////////

//create player 1 and 2
const playerO = Player('O');
const playerX = Player('X');
const board = new Gameboard();
const war = BestOf3();
document.querySelector('.start-it').addEventListener('click', startWar);
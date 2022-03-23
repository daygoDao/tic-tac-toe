// player object
const player = (faction) => {
  let moveCounter = 0;
  this.faction = faction;
  const getCounter = () => moveCounter;
  const resetCounter = () => moveCounter = 0;
  const addOne = () => moveCounter++;
  return {
    getCounter,
    resetCounter,
    addOne
  };
}

//create player 1 and 2
const playerO = player('O');
const playerX = player('X');

const gameboard = () => {
  let board = ['', '', '', '', '', '', '', '', ''];
  let playerX = 'x';
  let playerO = 'o';
}

function markSpot(e) {
  console.log(e.target.title)
  if (e.target.textContent !== '') {
    console.log('already taken');
  } else {
    // x goes first then o
    if (playerX.getCounter() == playerO.getCounter()) {
      e.target.textContent = 'X'
      playerX.addOne();
      console.log(playerX.getCounter())
    } else if (playerX.getCounter() > playerO.getCounter()) {
      e.target.textContent = 'O'
      playerO.addOne();
      console.log(playerO.getCounter())
    }
  }

  //check if winner is found

}

// start game
document.querySelector('.start-it').addEventListener('click', start);


function start(e) {
  //reset gameboard to blank
  let squares = document.querySelectorAll('.territory')
  for (let square of squares) {
    console.log(square.textContent = '');
  }
  // reset move counter from player obj
  playerO.resetCounter();
  playerX.resetCounter();

  // add event listeners to all playable squares
  for (let square of squares) {
    square.addEventListener('click', markSpot);
  }
}
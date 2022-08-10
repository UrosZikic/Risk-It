const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score_1 = document.querySelector('#score0');
const score_2 = document.querySelector('#score1');
const current_score_0 = document.querySelector('#current-score-0');
const current_score_1 = document.querySelector('#current-score-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.new');
const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');

//condition
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.querySelector(`#current-score-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
//rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. start generating random numbers via roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.check for rolled 1. if true, switch]
    if (dice !== 1) {
      // add to current score
      currentScore += dice;
      document.querySelector(`#current-score-${activePlayer}`).textContent =
        currentScore;
      // current_score_0.textContent = currentScore; // this will only work for  player 1
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to the score of the active player
    scores[activePlayer] += currentScore;

    //scores[1] = scores[1] + currentScore

    document.getElementById(`score${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if score is at least 100
    //finish the game
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // else, switch to the next player
      switchPlayer();
    }
  }
});

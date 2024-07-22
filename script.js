'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scorePl0 = document.querySelector('#score--0');
const scorePl1 = document.querySelector('#score--1');
const currentPl0 = document.querySelector('#current--0');
const currentPl1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

scorePl0.textContent = 0;
scorePl1.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice != 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  scorePl0.textContent = 0;
  scorePl1.textContent = 0;
  currentPl0.textContent = 0;
  currentPl1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceEl.classList.add('hidden');
});

'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling the functionality

//Use rolls dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1
    if (dice !== 1) {
      //Add the dice to current score
      currentScore += dice; // corentScore = curentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //selecting the score dynamically based on which player is the active player rn
      // current0El.textContent = currentScore; // change later
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

//Use the holds button
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player'score
    scores[activePlayer] += currentScore;
    //ex: scores[0] = scores[0] + currentScore;
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if player's score is >=100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Swich to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// Code made by me(functional but not reliable)
// Implementing new game button
//1. Select the elemnt 'new game' button and add a event handler
//2. In the handler function restore inital values of the currentScore and scores[] and the interface
//3. Restore the initial player
//4. Also restore the original background color

/*btnNew.addEventListener('click', function () {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  score0El.textContent = 0;
  score1El.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
});*/

//Sugestions by Iulia
// cate jocuri ai castigat per general
// sa inceapa jucatorul care castiga

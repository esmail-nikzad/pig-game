// انتخاب کردن عناصر از طریق DOM

const scoreElemant0 = document.querySelector("#score--0");
const scoreElemant1 = document.querySelector("#score--1");
const diceElemant = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// scoreElemant0.textContent = 0;
// scoreElemant1.textContent = 0;

let scores, currentScore, activePlayer, playing;

const resetBtnNew = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreElemant0.textContent = 0;
  scoreElemant1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceElemant.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
resetBtnNew();

function changePlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

// چرخاندن دکمه رول تاس
btnRoll.addEventListener("click", function () {
  if (playing) {
    //زمانی که تاس را می چرخانیم و یک عدد رندم از آن می گیریم

    const dice = Math.trunc(Math.random() * 6) + 1;
    //نحوه نمایش تاس که نمایش داده بشود یا نه
    diceElemant.classList.remove("hidden");
    diceElemant.src = `img/dice-${dice}.png`;

    //وقتی که تاس عدد یک را به ما داده نوبت بازیکن بعدی بشه

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //برای تغییر بازیکن
      changePlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //اضافه کردن امتیاز بازیکنان به امتیاز کل آنها
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //اگر امتیاز بازیکن یک بیشتر از صد باشد بازیکن دوم بازی را می شود
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceElemant.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //اگر امتیازش کمتر از صد بود و امتیاز خود را به امتیاز کل اضافه کرد نوبت بازیکن دوم شود
      changePlayer();
    }
  }
});

//برای ریست کردن دکمه چیزی که خودم کد کردم
// function scoreElemants() {
//   scoreElemant0.textContent = 0;
//   scoreElemant1.textContent = 0;
//   currentScore0.textContent = 0;
//   currentScore1.textContent = 0;
// }

// btnNew.addEventListener("click", function () {
//   playing = true;
//   scoreElemants();
//   currentScore = 0;
//   activePlayer = 0;
//   document.querySelector(`current--${activePlayer}`).textContent = 0;
//   document.querySelector(`score--${activePlayer}`).textContent = 0;
//   diceElemant.classList.remove("hidden");
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove("player--winner");
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove("player--active");
// });

// برای ریست کردن دکمه چیزی که استاد گفته

btnNew.addEventListener("click", resetBtnNew);

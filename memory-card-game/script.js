const cards = document.querySelectorAll(".card");
const restartBtn = document.querySelector(".restart-button");

// set variables to track if cards are flipped
let hasFlippedCard = false;
// wait for the cards to stop unflipping
let lockBoard = false;
// and which cards are flipped
let firstCard, secondCard;

function flipCard(e) {
  if (lockBoard) return;
  if (this === firstCard) return;
  console.log(e);
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //second click
  hasFlippedCard = false;
  secondCard = this;

  //check if cards match
  checkforMatch();
}

function checkforMatch() {
  let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  // lock board if not a match
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    // unlock after unflipping
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function restartGame() {
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });

  setTimeout(() => {
    shuffle();
    resetBoard();
  }, 500);
}

window.onload = () => {
  resetBoard();
  shuffle();
};

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

restartBtn.addEventListener("click", restartGame);

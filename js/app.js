const startOverlay = document.querySelector('#overlay');
const startTitle = startOverlay.querySelector('.title');
const startButton = document.querySelector('.btn__reset');
const phrase = document.querySelector('#phrase');
const phraseUl = phrase.firstElementChild;
const qwerty = document.querySelector('#qwerty');
const keyrow = document.querySelectorAll('.keyrow');
const keyboardButtons = document.querySelectorAll('.keyrow button');
const scoreboard = document.querySelector('#scoreboard ol');
let missed = 0;

let phrases = [
  'You you you oughta know',
  'I hope you had the time of your life',
  'Hit me baby one more time',
  'And I will always love you',
  'I wanna really really really wanna zigazig ha',
  'And I dont wanna miss a thing',
  'Now that your rose is in bloom a light hits the gloom on the grey',
  'I dont want to wait for our lives to be over',
  'He belongs to me the boy is mine'
];

startButton.addEventListener('click', () => {
  if (startOverlay.classList.contains('win') || startOverlay.classList.contains('lose')) {
    resetGame();
  } else {
    startOverlay.style.visibility = 'hidden';
    startOverlay.style.zIndex = "1000";
  }
});

const getRandomPhraseAsArray = arr => {
  const arrayLength = arr.length;
  const randomNumber = Math.floor(Math.random() * arrayLength);
  const randomPhrase = arr[randomNumber];
  const characterArray = randomPhrase.split("");
  return characterArray;
};


const addPhrasetoDisplay = arr => {
  for (i = 0; i < arr.length; i += 1) {
    let newListItem = document.createElement('LI');
    newListItem.textContent = arr[i];
    if (arr[i] === " ") {
      newListItem.className = 'space';
    } else {
      newListItem.className = 'letter';
    };
    phraseUl.appendChild(newListItem);
  };
  return;
};

const checkLetter = button => {
  let match = null;
  const letterClassListItems = phraseUl.children;
  for (i = 0; i < letterClassListItems.length; i += 1) {
    const lowerCaseLetter = letterClassListItems[i].textContent.toLowerCase();
    if (lowerCaseLetter === button) {
      letterClassListItems[i].className += ' show';
      letterClassListItems[i].style.transition = "all .5s ease-out";
      match = button;
    }
  };
  return match;
};

const checkWin = () => {
  const checkLetterClass = phraseUl.querySelectorAll('.letter');
  const checkShowClass = phraseUl.querySelectorAll('.show');
  const loseText = document.createElement('H3');
  if (checkLetterClass.length === checkShowClass.length) {
    startOverlay.className += ' win';
    startOverlay.style.display = 'flex';
    startTitle.insertAdjacentHTML('afterend', `<body>"${phraseUsed}"</body>
      <h3>You know your 90s tunes, homeskillet. Definitely give it another go.</h3>`);
    startTitle.innerHTML = "Awesome!";
    startButton.innerHTML = "Try Again";
    startOverlay.style.visibility = 'visible';
  } else if (missed > 4) {
    startOverlay.className += ' lose';
    startOverlay.style.display = 'flex';
    startTitle.insertAdjacentHTML('afterend', `<h3>Sorry, homeslice. Definitely give it another go.</h3>`);
    startTitle.innerHTML = "Bummer!";
    startButton.innerHTML = "Try Again";
    startOverlay.style.visibility = 'visible';
  }
  return;
};

const resetGame = () => {
  // Reset missed counter
  missed = 0;
  // Clear phrase display, get new phrase, display phrase
  phraseUl.innerHTML = '';
  phraseArray = getRandomPhraseAsArray(phrases);
  addPhrasetoDisplay(phraseArray);
  let newPhraseUsed = phraseArray.join().replace(/,/g, '');
  // Hide overlay and remove win/lose elements
  startOverlay.style.visibility = 'hidden';
  if (startOverlay.classList.contains('win')) {
    startOverlay.classList.remove('win');
    startTitle.nextSibling.remove();
    startTitle.nextSibling.remove();
  } else if (startOverlay.classList.contains('lose')) {
    startOverlay.classList.remove('lose');
    startTitle.nextSibling.remove();
  }
  // Reset heart scoreboard if <5 hearts
  if (scoreboard.childElementCount < 5) {
    scoreboard.innerHTML = ' ';
    for (i = 0; i <= 4; i += 1) {
      let newHeart = document.createElement('LI');
      newHeart.className = 'tries';
      newHeart.innerHTML = ` <img src="images/liveHeart.png" height="35px" width="30px">`;
      scoreboard.appendChild(newHeart);
    }
  }
  // Reset keyboard by enabling buttons and removing chose class
  for (i = 0; i < keyboardButtons.length; i += 1) {
    if (keyboardButtons[i].disabled === true) {
      keyboardButtons[i].disabled = false;
    }
    if (keyboardButtons[i].classList.contains('chosen')) {
      keyboardButtons[i].classList.remove('chosen');
    }
  }
  // Retrieving new phrase to be saved to global variable
  return phraseUsed = newPhraseUsed;
};

qwerty.addEventListener('click', () => {
  const clickedButton = event.target;
  const clickedButtonText = event.target.textContent;
  const parentOfClickedButton = clickedButton.parentNode.className;
  const classListClickedButton = clickedButton.classList;
  let letterFound = '';
  if (parentOfClickedButton === 'keyrow' && !classListClickedButton.contains('chosen')) {
    clickedButton.className += 'chosen';
    clickedButton.disabled = true;
    letterFound = checkLetter(clickedButtonText);
  }
  if (parentOfClickedButton === 'keyrow' && !letterFound) {
    scoreboard.removeChild(scoreboard.lastElementChild);
    missed += 1;
  }
  setTimeout(checkWin(), 3000);
});

let phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray);

let phraseUsed = phraseArray.join().replace(/,/g, '');

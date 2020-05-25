const startOverlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const qwerty = document.querySelector('#qwerty');
const keyrow = document.querySelectorAll('.keyrow');
const phrase = document.querySelector('#phrase');
const phraseUl = phrase.firstElementChild;
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
  startOverlay.style.visibility = 'hidden';
});

const getRandomPhraseAsArray = arr => {
  // Get length of array
  const arrayLength = arr.length;
  // Get random number based on length of array
  const randomNumber = Math.floor(Math.random() * arrayLength);
  // Get phrase from array via random random number
  const randomPhrase = arr[randomNumber];
  // Split random phrase and save characters to array
  const characterArray = randomPhrase.split("");
  return characterArray;
};

const addPhrasetoDisplay = arr => {
  // Loop thru each character in characterArray
  for (i = 0; i < arr.length; i += 1) {
    // Create a list item for each character
    let newListItem = document.createElement('LI');
    newListItem.textContent = arr[i];
    // If list item is letter, add .letter class
    if (arr[i] === " ") {
      newListItem.className = 'space';
    } else {
      newListItem.className = 'letter';
    };
    phraseUl.appendChild(newListItem);
  };
  return arr;
};

const checkLetter = button => {
  let match = null;
  const letterClassListItems = phraseUl.children;
  for (i = 0; i < letterClassListItems.length; i += 1) {
    const lowerCaseLetter = letterClassListItems[i].textContent.toLowerCase();
    if (lowerCaseLetter === button) {
      letterClassListItems[i].className += ' show';
      match = button;
    }
  };
  return match;
};

qwerty.addEventListener('click', () => {
  const clickedButton = event.target;
  const clickedButtonText = event.target.textContent;
  const parentOfClickedButton = clickedButton.parentNode.className;
  const classListClickedButton = clickedButton.classList;
  let letterFound = '';
  console.log(clickedButton);
  console.log(clickedButtonText);
  console.log(parentOfClickedButton);
  console.log(classListClickedButton);
  if (parentOfClickedButton === 'keyrow' && !classListClickedButton.contains('chosen')) {
    console.log('keyrow match');
    clickedButton.className += 'chosen';
    clickedButton.disabled = true;
    letterFound = checkLetter(clickedButtonText);
    console.log(letterFound);
  }
  if (!letterFound) {
    scoreboard.removeChild(scoreboard.lastElementChild);
    missed += 1;
    console.log(missed);
  }
});


const phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray);

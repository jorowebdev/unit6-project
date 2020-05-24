const startOverlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
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

console.log(startOverlay);
console.log(startButton);
console.log(qwerty);
console.log(phrase);

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

console.log(getRandomPhraseAsArray(phrases));

// const lengthInput = document.getElementById('length-input');
const outputParagraph = document.querySelector('.output-paragraph');
const copyContentBtn = document.querySelector('.copy-content');
const lengthInput = document.querySelector('#length-input');
const generate = document.querySelector('.generate');
// const lengthInput = 8;
// Numbers
function randomNumber() {
  const numbers = Array.from({ length: 10 }, (_, i) => String(i));
  return shuffle(numbers)[0];
}
// console.log(randomNumber());

// Uppercase Alphabet
function randomUpLetter() {
  const upperAlpha = Array.from(Array(26)).map((_, i) => i + 65);
  const upperCaseAlphabet = upperAlpha.map(el => String.fromCharCode(el));
  return shuffle(upperCaseAlphabet)[0];
}
console.log(randomUpLetter());

// Lowercase Alphabet
function randomLoLetter() {
  const lowerAlpha = Array.from(Array(26)).map((_, i) => i + 97);
  const lowerCaseAlphabet = lowerAlpha.map(el => String.fromCharCode(el));
  return shuffle(lowerCaseAlphabet[0]);
}

// console.log(randomLoLetter());
// Special Characters
function randomSymbol() {
  // const string = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';
  const string = '!#$%&*+-/<>?@^_`';
  const specChars = string.split('');
  return shuffle(specChars)[0];
}
console.log(randomSymbol());

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  //While there remain elements to shuffle...
  while (0 !== currentIndex) {
    //Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    //And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// console.log(shuffle(numbers)[0]);
generate.addEventListener('click', function () {
  const output = [];
  let lengthInputCopy = lengthInput.value / 4;
  console.log(lengthInputCopy);
  while (lengthInputCopy > 0) {
    output.push(randomSymbol());
    output.push(randomNumber());
    output.push(randomUpLetter());
    output.push(randomLoLetter());

    lengthInputCopy--;
  }
  console.log(shuffle(output));
  outputParagraph.textContent = shuffle(output).join('');
});

function copyPassword() {
  // if (outputParagraph.textContent !== '') {
  outputParagraph.select();
  document.execCommand('copy');
  console.log('copied');
  alert('Copied the text: ' + lengthInput.value);
  // } else {
  //   alert('Empty');
  // }
}
copyContentBtn.addEventListener('click', copyPassword);

'use strict';
const outputParagraph = document.querySelector('.password-output');
const copyContentBtn = document.querySelector('.btn-copy');
const lengthInput = document.querySelector('.input-length');
const generate = document.querySelector('.generate');
// Numbers
function randomNumber() {
  const numbers = Array.from({ length: 10 }, (_, i) => String(i));
  return shuffle(numbers)[0];
}
// Uppercase Alphabet
function randomUpLetter() {
  const upperAlpha = Array.from(Array(26)).map((_, i) => i + 65);
  const upperCaseAlphabet = upperAlpha.map(el => String.fromCharCode(el));
  return shuffle(upperCaseAlphabet)[0];
}
// Lowercase Alphabet
function randomLoLetter() {
  const lowerAlpha = Array.from(Array(26)).map((_, i) => i + 97);
  const lowerCaseAlphabet = lowerAlpha.map(el => String.fromCharCode(el));
  return shuffle(lowerCaseAlphabet)[0];
}
// Special Characters
function randomSymbol() {
  // const string = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';
  const string = '!#$%&*+-/<>?@^_`';
  const specChars = string.split('');
  return shuffle(specChars)[0];
}
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
generate.addEventListener('click', function () {
  const output = [];
  // ///////////////////////////////////////////////
  let lengthInputCopy = +lengthInput.value;
  // ///////////////////////////////////////////////

  if (lengthInput.value === '') {
    lengthInputCopy = 9;
  }
  /////////////////////////////////////////////////
  while (output.length < lengthInputCopy) {
    if (output.length < lengthInputCopy) {
      output.push(randomSymbol());
    }
    if (output.length < lengthInputCopy) {
      output.push(randomNumber());
    }
    if (output.length < lengthInputCopy) {
      output.push(randomUpLetter());
    }
    if (output.length < lengthInputCopy) {
      output.push(randomLoLetter());
    }
    lengthInputCopy--;
  }
  console.log(shuffle(output));
  outputParagraph.value = shuffle(output).join('');
});

function copyPassword() {
  if (outputParagraph.value !== '') {
    outputParagraph.select();
    document.execCommand('copy');
    console.log('copied');
    alert('Copied the text: ' + outputParagraph.value);
  } else {
    alert('Empty');
  }
}
copyContentBtn.addEventListener('click', copyPassword);

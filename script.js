'use strict';
// /////////////////////////////////////////////////////////////////
const outputParagraph = document.querySelector('.password-output');
const copyContentBtn = document.querySelector('.btn-copy');
const lengthInput = document.querySelector('.input-length');
const generate = document.querySelector('.generate');
// //////////////////////////////////////////////////////////////////
const numbersChkbox = document.querySelector('.numbers');
const symbolsChkbox = document.querySelector('.symbols');
const smallLettersChkbox = document.querySelector('.small-letters');
const bigLettersChkbox = document.querySelector('.big-letters');
const checkBoxes = document.querySelectorAll('input[type=checkbox]');
// console.log(checkBoxes);
// /////////////////////////////////////////////////////////////////
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
  // //////////////////////////////////////
  isInputValid(lengthInput);
  if (areAllBoxesUnchecked(checkBoxes)) {
    alert('Check at least one box !');
    return;
  }
  // /////////////////////////////////////
  function limit() {
    const limit = +lengthInput.value || 7;
    return limit === 7 ? 7 : limit - 1;
  }
  // ////////////////////////////////////////////

  filterChecked(checkBoxes);

  const checkedArrLength = filterChecked(checkBoxes).length;
  const calcLength = Math.ceil(limit() / checkedArrLength);
  console.log(limit() / checkedArrLength);
  console.log(limit());
  console.log(calcLength);
  console.log(checkedArrLength);
  const test = Array(calcLength).fill(filterChecked(checkBoxes)).flat();
  console.log(test);
  // ///////////////////////////////////////////
  // const output = [];
  // ///////////////////////////////////////////
  function fillOutputArray(arr) {
    const choice = function (el) {
      return el === 'rN'
        ? randomNumber()
        : el === 'rS'
        ? randomSymbol()
        : el === 'rLL'
        ? randomLoLetter()
        : randomUpLetter();
    };

    return test.map(el => choice(el));
  }
  // ///////////////////////////////////////////
  outputParagraph.value = shuffle(
    fillOutputArray([...filterChecked(checkBoxes)])
  ).join('');
  // //////////////////////////////////////////////
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

// ///////////////////////////////////////////////////////////
function areAllBoxesUnchecked(list) {
  return Array.from(list).every(input => !input.checked);
}
function isInputValid(input) {
  if (!isFinite(input.value)) {
    alert('Enter numeric value !');
    input.value = '';
  }
}
function filterChecked(list) {
  const test = Array.from(list).filter(input => input.checked);
  return test.map(el => el.dataset.description);
}

'use strict';
// Selections
// /////////////////////////////////////////////////////////////////
const outputParagraph = document.querySelector('.password-output');
const copyContentBtn = document.querySelector('.btn-copy');
const lengthInput = document.querySelector('.input-length');
const generateBtn = document.querySelector('.generate');
// //////////////////////////////////////////////////////////////////
const numbersChkbox = document.querySelector('.numbers');
const symbolsChkbox = document.querySelector('.symbols');
const smallLettersChkbox = document.querySelector('.small-letters');
const bigLettersChkbox = document.querySelector('.big-letters');
const checkBoxes = document.querySelectorAll('input[type=checkbox]');
// /////////////////////////////////////////////////////////////////
// Numbers
function randomNumber() {
  const numbers = Array.from({ length: 10 }, (_, i) => String(i));
  return shuffle(numbers)[0];
}
// Uppercase Letter
function randomUpLetter() {
  const upperAlpha = Array.from(Array(26)).map((_, i) => i + 65);
  const upperCaseAlphabet = upperAlpha.map(el => String.fromCharCode(el));
  return shuffle(upperCaseAlphabet)[0];
}
// Lowercase Letter
function randomLoLetter() {
  const lowerAlpha = Array.from(Array(26)).map((_, i) => i + 97);
  const lowerCaseAlphabet = lowerAlpha.map(el => String.fromCharCode(el));
  return shuffle(lowerCaseAlphabet)[0];
}
// Special Characters/Symbols
function randomSymbol() {
  const string = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';
  // const string = '!#$%&*+-/<>?@^_`';
  const specChars = string.split('');
  return shuffle(specChars)[0];
}
// Fisher–Yates shuffle
// /////////////////////////////////////////////////////
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
// /////////////////////////////////////////////////////
generateBtn.addEventListener('click', function () {
  // //////////////////////////////////////
  isInputValid(lengthInput);
  if (areAllBoxesUnchecked(checkBoxes)) {
    alert('Check at least one box !');
    outputParagraph.value = '';
    return;
  }
  // /////////////////////////////////////
  filterChecked(checkBoxes);
  // ////////////////////////////////////////////
  const limit = +lengthInput.value || 8;
  // ////////////////////////////////////////////
  const checkedArrLength = filterChecked(checkBoxes).length;
  const calcLength = Math.ceil(limit / checkedArrLength);
  // ////////////////////////////////////////////
  const test = Array(calcLength).fill(filterChecked(checkBoxes)).flat();
  // ///////////////////////////////////////////
  trimTestArrayIfLongerThanLimit(test, limit);
  // ///////////////////////////////////////////
  function fillOutputArray() {
    return test.map(el => fnChoice(el));
  }
  // ///////////////////////////////////////////
  outputParagraph.value = shuffle(fillOutputArray()).join('');
});
//////////////////////////////////////////////////////////////
function fnChoice(element) {
  return element === 'rN'
    ? randomNumber()
    : element === 'rS'
    ? randomSymbol()
    : element === 'rLL'
    ? randomLoLetter()
    : randomUpLetter();
}
//////////////////////////////////////////////////////////////
function trimTestArrayIfLongerThanLimit(arr, limitValue) {
  if (arr <= limitValue) {
    return arr;
  } else {
    let length = arr.length;
    while (length > limitValue) {
      arr.pop();
      length--;
    }
    return arr;
  }
}
// ///////////////////////////////////////////////////////////
function areAllBoxesUnchecked(list) {
  return Array.from(list).every(input => !input.checked);
}
// ///////////////////////////////////////////////////////////
function isInputValid(input) {
  if (!isFinite(input.value)) {
    alert('Enter numeric value !');
    input.value = '';
  }
}
// ///////////////////////////////////////////////////////////
function filterChecked(list) {
  const test = Array.from(list).filter(input => input.checked);
  return test.map(el => el.dataset.description);
}
//////////////////////////////////////////////////////////////
// Copy-Paste functionality
// //////////////////////////////////////////////////////////
function copyPassword() {
  if (outputParagraph.value !== '') {
    outputParagraph.select();
    document.execCommand('copy');
  } else {
    alert('You copied empty field !');
  }
}
copyContentBtn.addEventListener('click', copyPassword);

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
const helperObject = {
  randomNumber: randomNumber(),
  randomSymbol: randomSymbol(),
  randomLoLetter: randomLoLetter(),
  randomUpLetter: randomUpLetter(),
};
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
  console.log(filterChecked(checkBoxes));
  // ///////////////////////////////////////////
  const output = [];
  // ///////////////////////////////////////////
  while (output.length <= limit()) {
    if (!numbersChkbox.checked) continue;
    {
      if (numbersChkbox.checked && output.length <= limit()) {
        output.push(randomNumber());
        if (!symbolsChkbox.checked) continue;
        {
          if (symbolsChkbox.checked && output.length <= limit()) {
            output.push(randomSymbol());
            if (!smallLettersChkbox.checked) continue;
            {
              if (smallLettersChkbox.checked && output.length <= limit()) {
                output.push(randomLoLetter());
                if (!bigLettersChkbox.checked) continue;
                {
                  if (bigLettersChkbox.checked && output.length <= limit()) {
                    output.push(randomUpLetter());
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // ///////////////////////////////////////////
  outputParagraph.value = shuffle(output).join('');
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
  // console.log(test);
}
// let temporary = new Array(+lengthInput.value).fill('*');
// if (lengthInput.value === '') {
//   temporary = new Array(8).fill('*');
// }
// console.log(bigLettersChkbox.checked);
// // ////////////////////////////////////////////////////////////
// if (
//   bigLettersChkbox.checked &&
//   !smallLettersChkbox.checked &&
//   !numbersChkbox.checked &&
//   !symbolsChkbox.checked
// ) {
//   const result = temporary.map((el, i, arr) => {
//     return (el = randomUpLetter());
//   });
//   console.log(result);
// outputParagraph.value = shuffle(output).join('');
// outputParagraph.value = shuffle(result).join('');
// }
// while (output.length <= limit()) {
//   if (numbersChkbox.checked && output.length <= limit()) {
//     output.push(randomNumber());
//     if (symbolsChkbox.checked && output.length <= limit()) {
//       output.push(randomSymbol());
//       if (smallLettersChkbox.checked && output.length <= limit()) {
//         output.push(randomLoLetter());
//         if (bigLettersChkbox.checked && output.length <= limit()) {
//           output.push(randomUpLetter());
//         }
//       }
//     }
//   }
// }

// while (output.length <= limit()) {
//   if (!numbersChkbox.checked) {
//     continue;
//   } else if (numbersChkbox.checked && output.length <= limit()) {
//     output.push(randomNumber());
//     if (!symbolsChkbox.checked) {
//       continue;
//     } else if (symbolsChkbox.checked && output.length <= limit()) {
//       output.push(randomSymbol());
//       if (!smallLettersChkbox.checked) {
//         continue;
//       } else if (smallLettersChkbox.checked && output.length <= limit()) {
//         output.push(randomLoLetter());
//         if (!bigLettersChkbox.checked) {
//           continue;
//         } else if (bigLettersChkbox.checked && output.length <= limit()) {
//           output.push(randomUpLetter());
//         }
//       }
//     }
//   }
// }
// ////////////////////////////////

// while (output.length <= limit()) {
//   if (output.length <= limit()) {
//     filterChecked(checkBoxes).forEach(el => {
//       output.push(helperObject[el]);
//     });
//   }
//   console.log(output);
// }

import { WORD_SIZE, WORD_DIVIDER, CHARS } from "./vars.js";
import { getRandomNumber } from './helpers.js';


function getSize() {
  const index = getRandomNumber(0, WORD_SIZE.length - 1);
  return WORD_SIZE[index];
}





function getWord() {
  const size = getSize();
  const randomLetters = _.shuffle(CHARS);
  return randomLetters.slice(0, size).join('');
}





function getPhrase() {
  const words = getSize();
  const result = [];

  for (let i = 0; i < words; i++) {
    result.push(getWord());
  }

  return result.join(WORD_DIVIDER);
}





export {
  getPhrase
};
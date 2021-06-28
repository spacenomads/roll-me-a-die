const MIN_NUMBER = 1;
const WORD_DIVIDER = ' ';
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const CHARS = [...NUMBERS, ...LETTERS];
const WORD_SIZE = [3, 4, 5, 10];
const MODIFIER_CALC = {
  "+": (dice, modifier) => dice + modifier,
  "-": (dice, modifier) => dice - modifier,
  "*": (dice, modifier) => dice * modifier,
  "/": (dice, modifier) => dice / modifier,
};
const ROLL_REGEXP = new RegExp(/[0-9][d][0-9]+([\+\-\*\/][0-9]+)?/);




export {
  CHARS,
  WORD_SIZE,
  WORD_DIVIDER,
  MIN_NUMBER,
  MODIFIER_CALC,
  ROLL_REGEXP,
};
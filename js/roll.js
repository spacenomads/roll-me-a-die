import { checkRollFormat } from "./roll-detection.js";
import { getRandomNumber, sum } from "./helpers.js";
import { MIN_NUMBER, MODIFIERCALC } from "./vars.js";
import { getPhrase } from './seed.js';





function applyModifier(total, mod) {
  let result = total;
  if (mod) {
    // TODO; Refactor
    const operator = mod[0];
    const modValue = parseInt(mod.split(mod[0])[1]);
    result = MODIFIERCALC[operator](total, modValue);
  }
  return result;
}





function getRoll(max) {
  const phrase = getPhrase();
  Math.seedrandom(phrase, { entropy: true });
  return getRandomNumber(MIN_NUMBER, max);
}





function roll(data) {
  const {tries, dice, modifier} = data;

  const triesResult = [];
  for (let t = 0; t < tries; t++) {
    triesResult.push(getRoll(dice));
  }
  const triesTotal = sum(triesResult);
  const result = applyModifier(triesTotal, modifier);
  return { ...data, results: triesResult, result};
}





function getUserRoll(userRoll) {
  const isValid = checkRollFormat(userRoll);
  const rollData = {
    roll: userRoll,
    valid: false,
    tries: null,
    dice: null,
    modifier: null
  }

  if (isValid) {

    const tries = userRoll.split('d')[0];
    const { dice, modifier } = userRoll.match(/[d](?<dice>[0-9]+)(?<modifier>[\+\-\/\*][0-9]+)?/i).groups;
    rollData.valid = isValid;
    rollData.tries = Number(tries);
    rollData.dice = Number(dice);
    rollData.modifier = modifier;
  }
  return roll(rollData);
}





export {
  getUserRoll
};
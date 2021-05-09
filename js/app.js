'use strict';
const SEED = 'En serio?';
const rollField = document.querySelector('#roll');
const rollBtn = document.querySelector('#rollThis');
const modifierCalc = {
  "+": (dice, modifier) => dice + modifier,
  "-": (dice, modifier) => dice - modifier,
  "*": (dice, modifier) => dice * modifier,
  "/": (dice, modifier) => dice / modifier,
};





function getUserRoll(event) {
  const userRoll = rollField.value;
  const isValid = !!userRoll.match(/[0-9][dD][0-9]+([\+\-\/\*][0-9]+?)/g);
  const tries = userRoll.split('d')[0];
  const { dice, modifier } = userRoll.match(/[dD](?<dice>[0-9]+)(?<modifier>[\+\-\/\*][0-9]+)?/i).groups;
  console.log({isValid, tries, dice, modifier});
}





rollBtn.addEventListener('click', getUserRoll);


Math.seedrandom(SEED, { entropy: true });
//console.log('> 0.9282578795792454', Math.random());          // Always 0.9282578795792454
//console.log('> 0.3752569768646784', Math.random());          // Always 0.3752569768646784
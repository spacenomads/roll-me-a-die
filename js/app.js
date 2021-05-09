'use strict';
const SEED = 'En serio?';
const rollField = document.querySelector('#roll');
const rollBtn = document.querySelector('#rollThis');
const ROLL_REGEXP = new RegExp(/[0-9][d][0-9]+([\+\-\*\/][0-9]+)?/);


const modifierCalc = {
  "+": (dice, modifier) => dice + modifier,
  "-": (dice, modifier) => dice - modifier,
  "*": (dice, modifier) => dice * modifier,
  "/": (dice, modifier) => dice / modifier,
};






function checkRollFormat(roll) {
  return ROLL_REGEXP.test(roll);
}




function getUserRoll(event) {
  const userRoll = rollField.value.trim().toLowerCase();
  const isValid = checkRollFormat(userRoll);

  if (isValid) {

    const tries = userRoll.split('d')[0];
    const { dice, modifier } = userRoll.match(/[d](?<dice>[0-9]+)(?<modifier>[\+\-\/\*][0-9]+)?/i).groups;
    console.log({isValid, tries, dice, modifier});
    result.innerHTML = `
      <p>tirada: ${userRoll}</p>
      <p>Válida: Sí</p>
      <p>nº de dados: ${tries}</p>
      <p>caras: ${dice}</p>
      <p>modificador: ${modifier || '--'}</p>
    `;
  } else {
    console.log({userRoll, isValid});
    result.innerHTML = `
      <p>tirada: ${userRoll}</p>
      <p>Válida: NO</p>
      <p>nº de dados: --</p>
      <p>caras: --</p>
      <p>modificador: --</p>
    `;
  }
}





rollBtn.addEventListener('click', getUserRoll);

const rolls = [
  "3d6*6",
  "1d100",
  "paco",
  "2d6/2",
  "2d6/2",
  "2d6/2",
  "3d6*3",
  "2d5+10"
]


rolls.forEach(roll => {
  const isValid = checkRollFormat(roll);
  console.log(`tirada: ${roll} | Válida: ${isValid ? 'Sí' : 'No'}`);
});

//Math.seedrandom(SEED, { entropy: true });
//console.log('> 0.9282578795792454', Math.random());          // Always 0.9282578795792454
//console.log('> 0.3752569768646784', Math.random());          // Always 0.3752569768646784










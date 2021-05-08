'use strict';
const SEED = 'En serio?';
const rollField = document.querySelector('#roll');

function getUserRoll(event) {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  
  const field = event.currentTarget;
  const userRoll = field.value;

  const tries = userRoll.split('d')[0];
  const dice = userRoll.match(/[Dd]([0-9]+)/g);
  const operation = userRoll.match(/[\+-/*]([0-9]+)/g);
  
  // '1d100*5'.match(/[Dd](?<dice>[0-9]+)/i).groups
  
  if (event.keyCode === 13) {
    console.group('Roll');
    console.log({tries, dice, operation});
    console.groupEnd();
  }
}


rollField.addEventListener('keydown', getUserRoll);


Math.seedrandom(SEED, { entropy: true });
console.log('> 0.9282578795792454', Math.random());          // Always 0.9282578795792454
console.log('> 0.3752569768646784', Math.random());          // Always 0.3752569768646784
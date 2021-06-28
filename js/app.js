import { checkRollFormat } from './roll-detection.js';
import { getUserRoll } from './roll.js';
import { sum } from './helpers.js';
import { saveRollHistory } from './history.js';


const rollField = document.querySelector('#roll');
const rollBtn = document.querySelector('#rollThis');
const result = document.querySelector('#result');





function showRoll(data, el) {
  el.innerHTML = `
    <h1>${data.result}</h1>
    <p>
      <small>[${data.results.join(', ')}] = ${sum(data.results)} ${data.modifier || ''}</small>
    </p>
  `;
}


function generateRoll() {
  const userRoll = rollField.value.trim().toLowerCase();
  const rollResult = getUserRoll(userRoll);
  console.log(rollResult);
  showRoll(rollResult, result);
  saveRollHistory(rollResult);
}

rollBtn.addEventListener('click', generateRoll);

// TEST

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










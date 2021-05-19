'use strict';

console.log('🌈');
const DICE = 100;
const ROLLS = 100;
const SEED = 'adk cjksv , dnsvnasNÑLA SLKD JADÑLJALSK FJLAKÑ F';
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const NUMBERS = [1,2,3,4,5,6,7,8,9,0];
const WORD_SIZE = [3,4,5,10];
const MIN_NUMBER = 1;
const WORD_DIVIDER = ' ';


function getSize() {
  const index = getRandomNumber(0, WORD_SIZE.length - 1);
  return WORD_SIZE[index];
}


function getWord() {
  const size = getSize()
  const CHARS = [...NUMBERS, ...LETTERS];
  const randomLetters = _.shuffle(CHARS);
  const result = randomLetters.slice(0, size).join('');
  return result;
}




function getPhrase() {
  const words = getSize();
  const result = [];
  
  for (let i = 0; i < words; i++) {
    result.push(getWord());
  }

  return result.join(WORD_DIVIDER);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function getRoll(max) {
  return getRandomNumber(MIN_NUMBER, max);
}


function getRolls() {
  const result = [];
  const phrase = getPhrase();
  Math.seedrandom(phrase, { entropy: true });
  for (let i = 0; i < ROLLS; i++) {
    result.push({ id: i, roll: getRoll(DICE) });
  }
  return result;
}





function generateDataset(rawData, max) {
  let result = [];
  for (let index = 1; index <= max; index++) {
    const times = rawData.filter(item => item.roll === index).length;
    result.push({number: index, times})
  }
  return result;
}

function getMaxValue(data) {
  return data.map(roll=>roll.times).reduce((a,b) => Math.max(a, b))
}

function getPercentage(value, total) {
  return value*100/total;
}





function drawChart(selector, data) {
  const maxValue = getMaxValue(data);
  const graphContainer = d3.select(selector).append('div')
    .attr('class', 'graph__container');
  const graph = graphContainer.append('ul')
    .attr('class', 'graph__bars')
    .attr('style',`grid-template-columns: repeat(${DICE}, 1fr);`);

  const axis = graphContainer.append('div')
    .attr('class', 'graph__axis');
  
    for (let i = 0; i < maxValue; i++) {
      axis.append('div')
        .attr('class', 'graph__axis-bar')
        .html(d=>`<div class="graph__axis-bar-level">${maxValue - i}</div>`);
    }

  const items = graph.selectAll('li')
  .data(data)
  .enter()
  .append('li')
  .attr('class', 'graph__bar')
  .append('div')
  .attr('class', 'bar')
  .attr('data-index', (d,i)=>i)
  .html(d=>{
    const per = getPercentage(d.times, maxValue);
    return `
    <div class="bar__label">${d.number}</div>
    <div class="bar__progress ${per >=75 ? 'bar__progress--max' : ''} ${d.number >= 75 ? 'bar__progress--high':''}" style="height:${per}%"></div>
  `});
}


function getVersus(data) {
  const result = data.map(col=>{
    const mins = col.filter(roll => roll.times > 0 && roll.number < 50).length;
    const maxs = col.filter(roll => roll.times > 0 && roll.number >= 50).length;

    return `${mins}/${maxs}`;
  });
  return {label: 'Menores/Mayores de 50', res: result};
}





function getMedia(data) {
  const result = data.map(col => {
    return col
      .filter(roll => roll.times > 0)
      .map(roll => roll.number)
      .reduce((a,b)=>a+b)/2;
  });
  return { label: 'Media', res: result };
}



function greaterLowerThan25(data) {
  const result = data.map(col => {
    return (col
      .filter(roll => roll.times > 0)
      .map(roll => roll.number)
      .filter(number => number <=25)
      .length);
  });
  return { label: 'Menores de 25', res: result };
}

function frecuentGreater(data) {
  const result = data.map(col => {
    return col
        .filter(roll => roll.times > 0)
        .sort((a,b)=>a.times < b.times)
        .map(roll => roll.number)
        .slice(0, 5)
        .sort((a,b) => a < b)
        .join(', ');
  });
  return { label: 'Más veces', res: result };
}




function frecuentLower(data) {
  const result = data.map(col => {
    return col
      .filter(roll => roll.times > 0)
      .sort((a, b) => a.times > b.times)
      .map(roll => roll.number)
      .slice(0, 5)
      .sort((a, b) => a < b)
      .join(', ');
  });
  return { label: 'menos veces', res: result };
}





function topNumber(data) {
  const result = data.map(col => {
    const maxValue = getMaxValue(col);
    return col
      .filter(roll => roll.times === maxValue)
      .map(roll => roll.number)
      .sort((a, b) => a < b)
      .join(', ');
      
  });
  console.log(result)
  return { label: 'Sale más', res: result };
}





function writeStat(el, data) {
  let result = '<tr>';
  result += `<th>${data.label}</th>`;
  for (const stat of data.res) {
    result+= `<td>${stat}</td>`;
  }
  result += '</tr>';
  el.insertAdjacentHTML('beforeend', result)
}




function addStats(el) {
  const SET = [DATASET1, DATASET2, DATASET3, DATASET4 ];
  
  writeStat(el, getVersus(SET));
  writeStat(el, getMedia(SET));
  writeStat(el, greaterLowerThan25(SET));
  writeStat(el, frecuentGreater(SET));
  writeStat(el, frecuentLower(SET));
  writeStat(el, topNumber(SET));
}






const stNumbers = getRolls(false);
const DATASET1 = generateDataset(stNumbers, DICE);
drawChart('#graphSt', DATASET1);





const seedNumbers = getRolls(false);
const DATASET2 = generateDataset(seedNumbers, DICE);
drawChart('#graphSeed', DATASET2);





const maidenNumbers = [98, 98, 97, 97, 97, 95, 95, 95, 89, 89, 89, 88, 80, 80, 79, 78, 78, 78, 78, 77, 75, 75, 74, 73, 72, 71, 69, 68, 67, 67, 66, 66, 65, 63, 63, 61, 60, 60, 59, 57, 56, 55, 55, 54, 52, 50, 45, 44, 44, 43, 43, 42, 41, 40, 39, 38, 36, 36, 36, 36, 35, 34, 34, 33, 32, 31, 30, 29, 29, 29, 28, 27, 25, 25, 25, 24, 24, 23, 20, 18, 18, 15, 15, 15, 14, 13, 13, 13, 10, 9, 7, 6, 6, 6, 5, 5, 4, 4, 4, 1].map((roll, index) => {
  return {id: index, roll};
});
  const DATASET3 = generateDataset(maidenNumbers, DICE);;
drawChart('#graphMaiden', DATASET3);





const maidenNumbers2 = [100, 100, 98, 98, 95, 94, 94, 94, 92, 92, 90, 89, 88, 87, 87, 87, 86, 86, 84, 84, 82, 80, 79, 79, 79, 78, 75, 74, 74, 70, 70, 70, 69, 68, 67, 66, 62, 62, 62, 61, 59, 59, 58, 54, 54, 53, 52, 51, 51, 49, 49, 48, 47, 45, 45, 41, 39, 38, 38, 38, 37, 36, 35, 35, 35, 35, 35, 31, 29, 29, 29, 29, 27, 25, 25, 24, 23, 22, 22, 20, 19, 18, 17, 15, 14, 12, 12, 10, 10, 10, 9, 6, 5, 4, 4, 3, 3, 2, 2, 1].map((roll, index) => {
  return {id: index, roll};
});
  const DATASET4 = generateDataset(maidenNumbers2, DICE);;
drawChart('#graphMaiden2', DATASET4);


const stats = document.querySelector('.js__stats-body');

stats && addStats(stats);








//Math.seedrandom(SEED, { entropy: true });
//console.log('> 0.9282578795792454', Math.random());          // Always 0.9282578795792454
//console.log('> 0.3752569768646784', Math.random());          // Always 0.3752569768646784

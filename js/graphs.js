'use strict';

console.log('🌈');
const DICE = 100;
const ROLLS = 50;
const SEED = 'adk cjksv , dnsvnasNÑLA SLKD JADÑLJALSK FJLAKÑ F';





function getRoll(max) {
  return Math.ceil(Math.random() * max);
}


function getRolls(seed) {
  let result = [];
  seed && Math.seedrandom(SEED, { entropy: true });
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
  const maValue = getMaxValue(data);
  const graph = d3.select(selector).append('ul')
    .attr('class', 'graph')
    .attr('style',`grid-template-columns: repeat(${DICE}, 1fr);`);
  
   const items = graph.selectAll('li')
    .data(data)
    .enter()
    .append('li')
    .attr('class', 'graph__item')
    .append('div')
    .attr('class', 'bar')
    .html(d=>{
      const per = getPercentage(d.times, maValue);
      return `
      <div class="bar__label">${d.number}</div>
      <div class="bar__progress ${per >=75 ? 'bar__progress--max' : ''} ${d.number >= 75 ? 'bar__progress--high':''}" style="height:${per}%"></div>
    `});
}



const stNumbers = getRolls(false);
const DATASET1 = generateDataset(stNumbers, DICE);
console.log('--- Standard');
console.log('max', getMaxValue(DATASET1));
console.log(ROLLS, DATASET1);
drawChart('#graphSt', DATASET1);
console.log('---');

const seedNumbers = getRolls(true);
const DATASET2 = generateDataset(seedNumbers, DICE);
console.log('--- Seed');
console.log('max', getMaxValue(DATASET2));
console.log(ROLLS, DATASET2);
drawChart('#graphSeed', DATASET2);


//Math.seedrandom(SEED, { entropy: true });
//console.log('> 0.9282578795792454', Math.random());          // Always 0.9282578795792454
//console.log('> 0.3752569768646784', Math.random());          // Always 0.3752569768646784

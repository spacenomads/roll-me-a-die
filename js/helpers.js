function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}





function sum(list) {
  return list.reduce((acc, current) => current + acc);
}





export {
  getRandomNumber,
  sum
};
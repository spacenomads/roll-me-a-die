function saveRollHistory(data) {
  const rollHistory = JSON.parse(localStorage.getItem('rolls')) || [];

  rollHistory.push(data);
  localStorage.setItem('rolls', JSON.stringify(rollHistory));
}





export {
  saveRollHistory
}
import { ROLL_REGEXP } from "./vars.js";

function checkRollFormat(roll) {
  return ROLL_REGEXP.test(roll);
}





export {
  checkRollFormat,
};
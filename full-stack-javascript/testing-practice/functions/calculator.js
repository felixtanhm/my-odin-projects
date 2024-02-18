const calculator = (() => {
  function sum(a, b) {
    return numCheck(a, b) ? a + b : "Inputs contain a non-number.";
  }

  function subtract(a, b) {
    return numCheck(a, b) ? a - b : "Inputs contain a non-number.";
  }

  function multiply(a, b) {
    return numCheck(a, b) ? a * b : "Inputs contain a non-number.";
  }

  function divide(a, b) {
    if (b === 0) return "Dividing by 0 will give you infinity and beyond! 🚀.";
    return numCheck(a, b) ? a / b : "Inputs contain a non-number.";
  }

  function numCheck(a, b) {
    return isValidNumber(a) && isValidNumber(b);
  }

  function isValidNumber(number) {
    return !Number.isNaN(number) && typeof number === "number";
  }

  return { sum, multiply, subtract, divide };
})();

export default calculator;

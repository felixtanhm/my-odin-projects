function isValidNumber(number) {
  return !Number.isNaN(number) && typeof number === "number";
}

function sum(a, b) {
  if (isValidNumber(a) && isValidNumber(b)) {
    return a + b;
  }
  return "Inputs need to be integers.";
}

export default sum;

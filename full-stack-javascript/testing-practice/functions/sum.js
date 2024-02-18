function sum(a, b) {
  if (typeof a == "number" && typeof b == "number") {
    return a + b;
  }
  return "Inputs need to be integers.";
}

export default sum;

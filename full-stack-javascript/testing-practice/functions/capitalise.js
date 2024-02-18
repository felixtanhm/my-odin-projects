function capitalise(string) {
  if (typeof string == "string") {
    return string[0].toUpperCase() + string.slice(1);
  }
  return "Not a string.";
}

export default capitalise;

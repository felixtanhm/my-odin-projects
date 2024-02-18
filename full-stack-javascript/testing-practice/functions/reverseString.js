function reverseString(string) {
  if (typeof string == "string") {
    const stringArr = string.split("");
    const reversedStr = stringArr.reverse();
    return reversedStr.join("");
  }
  return "This is not a string.";
}

export default reverseString;

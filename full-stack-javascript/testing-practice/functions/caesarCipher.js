const caesarCipher = (() => {
  function validateKey(num) {
    if (Number.isInteger(num)) return true;
    return "Shift factor provided must be an integer.";
  }

  function validateString(string) {
    if (typeof string == "string") return true;
    return "Input must be a string.";
  }

  function shiftChar(char, key) {
    let charCode = char.charCodeAt(0);
    //Accounts for negative keys
    if (key < 0) {
      key = 26 + (key % 26);
    }
    //Shift character if it is uppercase
    if (charCode > 64 && charCode < 91) {
      //Determine how far along the character is in the alphabet
      charCode -= 65;
      charCode += key;
      //Modulo allows for higher integers to be used as the key. 53 would return 1, returning 'b'.
      charCode = 65 + (charCode % 26);
      return String.fromCharCode(charCode);
    }

    //Shift character if it is lowercase
    if (charCode > 96 && charCode < 123) {
      charCode -= 97;
      charCode += key;
      charCode = 97 + (charCode % 26);
      return String.fromCharCode(charCode);
    }
    return char;
  }

  function encrypt(string, shiftFactor) {
    //Validate if provided shift factor is an integer
    const keyResults = validateKey(shiftFactor);
    if (keyResults !== true) return keyResults;

    //Validate if input is a string
    const stringResults = validateString(string);
    if (stringResults !== true) return stringResults;

    //Encrypt the string
    let encryptedString = "";
    string.split("").forEach((char) => {
      encryptedString += shiftChar(char, shiftFactor);
    });
    return encryptedString;
  }

  return { encrypt };
})();

export default caesarCipher;

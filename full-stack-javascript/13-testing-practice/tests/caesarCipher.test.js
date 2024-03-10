import caesarCipher from "../functions/caesarCipher";

test("Basic cipher works: 'abc' is returned as 'bcd'", () => {
  expect(caesarCipher.encrypt("abc", 1)).toBe("bcd");
});

test("Cipher returns uppercase: 'aBc' is returned as 'bCd'", () => {
  expect(caesarCipher.encrypt("aBc", 1)).toBe("bCd");
});

test("Cipher wraps around Z: 'xyz' is returned as 'yza'", () => {
  expect(caesarCipher.encrypt("xyz", 1)).toBe("yza");
});

test("Cipher wraps around A: 'abc' is returned as 'zab'", () => {
  expect(caesarCipher.encrypt("abc", -1)).toBe("zab");
});

test("Cipher shift factor can be higher integers: 'abc' is returned as 'xyz'", () => {
  expect(caesarCipher.encrypt("abc", 27)).toBe("bcd");
});

test("Cipher skips special characters: 'Abc!@#xyZ' is returned as 'Bcd!@#yzA'", () => {
  expect(caesarCipher.encrypt("Abc!@#xyZ", 1)).toBe("Bcd!@#yzA");
});

test("Cipher throws error if a string is not provided.", () => {
  expect(caesarCipher.encrypt(123, 1)).toBe("Input must be a string.");
});

test("Cipher throws error if a decimal number is provided as a shift factor.", () => {
  expect(caesarCipher.encrypt("abc", 5.5)).toBe(
    "Shift factor provided must be an integer."
  );
});

test("Cipher throws error if shift factor provided is not a number.", () => {
  expect(caesarCipher.encrypt("abc", "6")).toBe(
    "Shift factor provided must be an integer."
  );
});

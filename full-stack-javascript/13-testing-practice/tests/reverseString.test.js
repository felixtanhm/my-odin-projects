import reverseString from "../functions/reverseString";

test("'hello' is returned as 'olleh'", () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("'This string is reversed.' is returned as '.desrever si gnirts siht'", () => {
  expect(reverseString("This string is reversed.")).toBe(
    ".desrever si gnirts sihT"
  );
});

test("'12345' to be returned as '54321'", () => {
  expect(reverseString("12345")).toBe("54321");
});

test("12345 to throw an error specifying that it is not a string", () => {
  expect(reverseString(12345)).toBe("This is not a string.");
});

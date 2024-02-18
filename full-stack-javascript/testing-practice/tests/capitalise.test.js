import capitalise from "../functions/capitalise";

test('"testing" should return "Testing"', () => {
  expect(capitalise("testing")).toBe("Testing");
});

test('"Testing" should return "Testing"', () => {
  expect(capitalise("Testing")).toBe("Testing");
});

test('"TESTING" should return "TESTING"', () => {
  expect(capitalise("TESTING")).toBe("TESTING");
});

test('"this is a test" should return "This is a test"', () => {
  expect(capitalise("this is a test")).toBe("This is a test");
});

test('1234 should return "Not a string."', () => {
  expect(capitalise(1234)).toBe("Not a string.");
});

import sum from "../functions/sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 1.1 + 2.2 to equal 3.3", () => {
  expect(sum(1.1, 2.2)).toBeCloseTo(3.3);
});

test("non integer returns error message", () => {
  expect(sum("hello", 2)).toBe("Inputs need to be integers.");
});

test("NaN returns error message", () => {
  expect(sum(NaN, 5)).toBe("Inputs need to be integers.");
});

test("Null returns error message", () => {
  expect(sum(null, 5)).toBe("Inputs need to be integers.");
});

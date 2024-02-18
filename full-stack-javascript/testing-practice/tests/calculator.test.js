import calculator from "../functions/calculator";

test("4 added to 2 returns 6", () => {
  expect(calculator.sum(4, 2)).toBe(6);
});

test("-4 added to 2 returns -2", () => {
  expect(calculator.sum(-4, 2)).toBe(-2);
});

test("0.5 added to 0.2 returns 0.7", () => {
  expect(calculator.sum(0.5, 0.2)).toBe(0.7);
});

test('"4" added to 2 returns "Inputs contains a non-number."', () => {
  expect(calculator.sum("4", 2)).toBe("Inputs contain a non-number.");
});

test("2 subtracted from 4 returns 2", () => {
  expect(calculator.subtract(4, 2)).toBe(2);
});

test("2 subtracted from -4 returns -6", () => {
  expect(calculator.subtract(-4, 2)).toBe(-6);
});

test("0.2 subtracted from 0.5 returns 0.3", () => {
  expect(calculator.subtract(0.5, 0.2)).toBe(0.3);
});

test('2 subtracted from "4" returns "Inputs contain a non-number."', () => {
  expect(calculator.subtract("4", 2)).toBe("Inputs contain a non-number.");
});

test("4 divided by 2 returns 2", () => {
  expect(calculator.divide(4, 2)).toBe(2);
});

test("-4 divided by 2 is -2", () => {
  expect(calculator.divide(-4, 2)).toBe(-2);
});

test("0.5 divided by 0.2 returns 2.5", () => {
  expect(calculator.divide(0.5, 0.2)).toBe(2.5);
});

test('"4" divided by 2 returns "Inputs contain a non-number."', () => {
  expect(calculator.divide("4", 2)).toBe("Inputs contain a non-number.");
});

test("4 multiplied by 2 returns 8", () => {
  expect(calculator.multiply(4, 2)).toBe(8);
});

test("-4 multiplied by 2 returns -8", () => {
  expect(calculator.multiply(-4, 2)).toBe(-8);
});

test("0.5 multiplied by 0.2 returns 0.1", () => {
  expect(calculator.multiply(0.5, 0.2)).toBe(0.1);
});

test('"4" multiplied by 2 returns "Inputs contain a non-number."', () => {
  expect(calculator.multiply("4", 2)).toBe("Inputs contain a non-number.");
});

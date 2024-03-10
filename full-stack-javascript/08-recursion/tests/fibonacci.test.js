import { fibsItr, fibsRec } from "../functions/fibonacci";

describe("fibsItr Function", () => {
  test("Fibonacci sequence up to 0 is []", () => {
    expect(fibsItr(0)).toEqual([]);
  });

  test("Fibonacci sequence up to 1 is [0]", () => {
    expect(fibsItr(1)).toEqual([0]);
  });

  test("Fibonacci sequence up to 2 is [0, 1]", () => {
    expect(fibsItr(2)).toEqual([0, 1]);
  });

  test("Fibonacci sequence up to 8 is [0, 1, 1, 2, 3, 5, 8, 13]", () => {
    expect(fibsItr(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  test("Fibonacci sequence up to 5 is [0, 1, 1, 2, 3]", () => {
    expect(fibsItr(5)).toEqual([0, 1, 1, 2, 3]);
  });

  test("Fibonacci sequence up to -5 is []", () => {
    expect(fibsItr(-5)).toEqual([]);
  });
});

describe("fibsRec Function", () => {
  test("Fibonacci sequence up to 0 is []", () => {
    expect(fibsRec(0)).toEqual([]);
  });

  test("Fibonacci sequence up to 1 is [0]", () => {
    expect(fibsRec(1)).toEqual([0]);
  });

  test("Fibonacci sequence up to 2 is [0, 1]", () => {
    expect(fibsRec(2)).toEqual([0, 1]);
  });

  test("Fibonacci sequence up to 8 is [0, 1, 1, 2, 3, 5, 8, 13]", () => {
    expect(fibsRec(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  test("Fibonacci sequence up to 5 is [0, 1, 1, 2, 3]", () => {
    expect(fibsRec(5)).toEqual([0, 1, 1, 2, 3]);
  });

  test("Fibonacci sequence up to -5 is []", () => {
    expect(fibsRec(-5)).toEqual([]);
  });
});

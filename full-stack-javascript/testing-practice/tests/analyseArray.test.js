import analyseArray from "../functions/analyseArray";

test("Analysed array returns an object with the correct structure.", () => {
  expect(analyseArray.analyse([1, 1, 1, 1, 1])).toEqual({
    average: 1,
    min: 1,
    max: 1,
    length: 5,
  });
});

test("Analysed array returns an object with the correct values.", () => {
  expect(analyseArray.analyse([2, 4, 6, 8, 10])).toEqual({
    average: 6,
    min: 2,
    max: 10,
    length: 5,
  });
});

test("Analyser throws an error when non-number exists.", () => {
  expect(analyseArray.analyse([1, 1, 1, 1, "1"])).toBe(
    "Array consists of a non-number."
  );
});

test("Analyser throws an error when input is not an array.", () => {
  expect(analyseArray.analyse("1,2,3,4,5")).toBe(
    "Input does not consist of an Array."
  );
});

import { mergeSort } from "../functions/mergeSort";

describe("MergeSort", () => {
  test("Empty array", () => {
    const list = [];
    expect(mergeSort(list)).toStrictEqual("Array is empty");
  });

  test("Array with a single element", () => {
    const list = [-1];
    expect(mergeSort(list)).toStrictEqual(list);
  });

  test("Already sorted array", () => {
    const list = [-1, 2, 4, 5];
    expect(mergeSort(list)).toStrictEqual(list);
  });

  test("Array with positive and negative integers", () => {
    const list = [1, -10, 3, -1, 100, 5, 2, 1];
    const result = [-10, -1, 1, 1, 2, 3, 5, 100];
    expect(mergeSort(list)).toStrictEqual(result);
  });

  test("Array of zeroes", () => {
    const list = [0, 0, 0, -0];
    const result = [0, 0, 0, -0];
    expect(mergeSort(list)).toStrictEqual(result);
  });

  test("Array of alphabets", () => {
    const list = ["c", "z", "e", "k", "a"];
    const result = ["a", "c", "e", "k", "z"];
    expect(mergeSort(list)).toStrictEqual(result);
  });

  test("Array of integers as strings", () => {
    const list = ["10", "01", "-1", "0", "6"];
    const result = ["-1", "0", "01", "10", "6"];
    // list should get sorted by ASCII value not numerical value
    expect(mergeSort(list)).toStrictEqual(result);
  });

  test("Array with non-exact numbers", () => {
    const list = [0.11, 0.53, 5, -0.99];
    const result = [-0.99, 0.11, 0.53, 5];
    expect(mergeSort(list)).toStrictEqual(result);
  });

  test("Large array of random integers", () => {
    function getRandomArray(n, max = 40) {
      const sign = [-1, 1];
      return Array(n)
        .fill()
        .map(
          () =>
            sign[Math.floor(Math.random() * 2)] *
            Math.round(Math.random() * max)
        );
    }
    //create random array
    const size = 99999 + parseInt(Math.random() * 1000, 10);
    const list = getRandomArray(size, 10000);
    const mySortedList = mergeSort(list);
    expect(mySortedList).toStrictEqual(list.sort((a, b) => a - b));
  });
});

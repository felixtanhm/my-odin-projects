function split(numArr) {
  if (numArr.length === 0) return "Array is empty";
  if (numArr.length === 1) return numArr;

  const mid = Math.floor(numArr.length / 2);
  const leftArr = numArr.slice(0, mid);
  const rightArr = numArr.slice(mid, numArr.length);

  return mergeSort(split(leftArr), split(rightArr));
}

function mergeSort(arr1, arr2) {
  if (arr1 === undefined) return arr2;
  if (arr2 === undefined) return arr1;

  const result = [];
  let l = 0;
  let r = 0;

  while (l < arr1.length && r < arr2.length) {
    if (arr1[l] < arr2[r]) {
      result.push(arr1[l]);
      l++;
    } else {
      result.push(arr2[r]);
      r++;
    }
  }

  while (l < arr1.length) {
    result.push(arr1[l]);
    l++;
  }

  while (r < arr2.length) {
    result.push(arr2[r]);
    r++;
  }

  return result;
}

console.log(split([5, 3, 4, 1, 2]));

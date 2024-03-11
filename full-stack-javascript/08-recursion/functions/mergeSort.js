function split(numArr) {
  if (numArr.length === 0) return "Array is empty";
  if (numArr.length === 1) return numArr;

  const mid = Math.floor(numArr.length / 2);
  const leftArr = numArr.slice(0, mid);
  const rightArr = numArr.slice(mid, numArr.length);

  mergeSort(split(leftArr), split(rightArr));
}

function mergeSort(arr1, arr2) {
  console.log(arr1);
  console.log(arr2);
}

split([0, 1, 2, 3, 4]);

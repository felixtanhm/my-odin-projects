function fibsItr(int) {
  let result = [];

  for (let i = 0; i < int; i++) {
    if (i < 2) {
      result = [...result, i];
    } else result = [...result, result[i - 2] + result[i - 1]];
  }
  return result;
}

function fibsRec(int) {
  if (int <= 0) return [];
  if (int === 1) return [0];
  if (int === 2) return [0, 1];
  return [
    ...fibsRec(int - 1),
    fibsRec(int - 1)[int - 2] + fibsRec(int - 1)[int - 3],
  ];
}

export { fibsItr, fibsRec };

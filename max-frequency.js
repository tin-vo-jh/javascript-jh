function findMostRepetitions(arr) {
  const map = {};
  const result = [];
  let maxCount = 0;

  for (const num of arr) {
    map[num] = (map[num] || 0) + 1;
    const count = map[num];

    if (count > maxCount) {
      maxCount = count;
      result.length = 0;
      result.push(num);
    } else if (count === maxCount) {
      if (!result.includes(num)) {
        result.push(num);
      }
    }
  }

  return result;
}

console.log(findMostRepetitions([1, 2, 2, 3, 3, 4]));

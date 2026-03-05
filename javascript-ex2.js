function findMostRepetitions(arr) {
  const frequencyMap = {};
  
  // Loop 1: Count frequency
  for (let num of arr) {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  }

  // Loop 2: Find the maximum count (maxCount)
  let maxCount = 0;
  for (let count of Object.values(frequencyMap)) {
    if (count > maxCount) {
      maxCount = count;
    }
  }

  // Loop 3: Filter out the numbers with the maximum count
  const result = [];
  for (let key in frequencyMap) {
    if (frequencyMap[key] === maxCount) {
      result.push(Number(key)); 
    }
  }

  return result;
}

console.log(findMostRepetitions([1, 2, 2, 3, 3, 4]));
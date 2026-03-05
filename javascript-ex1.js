function removeDuplicatesOne(arr) {
  let uniqueSet = new Set(arr); 

  let resultArray = [];

  for (let item of uniqueSet) {
    resultArray.push(item);
  }

  return resultArray;
}

function removeDuplicatesTwo(arr) {
  let uniqueSet = new Set(arr); 

  return Array.from(uniqueSet);
}

function removeDuplicatesThree(arr) {
  let uniqueArray = [];
  for (let item of arr) {
    if (!uniqueArray.includes(item)) {
      uniqueArray.push(item);
    }
  }
  return uniqueArray;
}

console.log(removeDuplicatesOne([1, 2, 2, 3, 4, 4, 4, 5, 6])); 
console.log(removeDuplicatesTwo([1, 2, 2, 3, 4, 4, 4, 5, 6])); 
console.log(removeDuplicatesThree([1, 2, 2, 3, 4, 4, 4, 5, 6])); 

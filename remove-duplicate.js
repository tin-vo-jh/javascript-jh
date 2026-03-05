function removeDuplicatesBySet(arr) {
  const uniqueSet = new Set(arr);

  const resultArray = [];

  for (const item of uniqueSet) {
    resultArray.push(item);
  }

  return resultArray;
}

function removeDuplicatesBySetReduceInSyntax(arr) {
  const uniqueSet = new Set(arr); 

  return Array.from(uniqueSet);
}

function removeDuplicatesByMap(arr) {
  const seen = {};
  const result = [];

  for (const item of arr) {
    if (!seen[item]) {
      seen[item] = true;
      result.push(item);
    }
  }

  return result;
}

const a = {
  name: "Alice",
  age: 30,
  city: "New York"
};

a.name = 'a';


console.log(removeDuplicatesBySet([1, 2, 2, 3, 4, 4, 4, 5, 6])); 
console.log(removeDuplicatesBySetReduceInSyntax([1, 2, 2, 3, 4, 4, 4, 5, 6])); 
console.log(removeDuplicatesByMap([1, 2, 2, 3, 4, 4, 4, 5, 6]));

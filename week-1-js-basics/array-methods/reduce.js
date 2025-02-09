// Reduce

// The reduce method executes a reducer function ( that you provide) on each element of the array, resulting in a single output

// How it works
// 1. It iterates over each element in the array
// 2. IT APPLIES THE REDUCER function to an accumulator and the current element
// 3. The accumulator is the value that reduce returns after each iteration
// 4. After all elements have been processed, the final value of the accumulator is returned

// Example

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

// The 0 in the reduce method is the initial value of the accumulator

console.log("sum", sum);

// What is a Callback Function?
// A callback function is simply a function that is passed as an argument to another function. 
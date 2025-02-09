// Filter

// The filter method creates a new array will all elements that pass  the test implemented by the provided function.

// How it works
// 1. It applies the testing function to each element.
// 2. If the testing function returns true for an element, that elements is included in the new array
// 3. If the testing function returns false for an element, that element is excluded from the new array.

// Example
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = numbers.filter((num) => num % 2 === 0);

console.log("evenNumbers", evenNumbers);
console.log("numbers", numbers);

// Practice exercise

// Given an array of objects representing products, filter out the products that are out of stock

const product = [
  { id: 1, name: "apple", isAvailable: true },
  { id: 2, name: "banana", isAvailable: false },
  { id: 3, name: "cherry", isAvailable: true },
  { id: 4, name: "date", isAvailable: false },
];

const insStockProducts = product.filter((product) => product.isAvailable);
console.log("insStockProducts", insStockProducts);

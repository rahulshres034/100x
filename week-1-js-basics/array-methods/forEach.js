// For Each

//  The forEach method executes a provided function once for each array element.

// How it works
// 1. The foreach method iterates over each elelemnt in the array
// 2. It applies the provided function to each element
// 3. Unlike map, forEach does not return a new array; it simple executes the function for each element.

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numbers.forEach((numb) => console.log(numb * 5));
console.log("numbers", numbers);

// Practice exercise

// Given an array of strings, log each string in uppercase

const fruits = ["apple", "banana", "cherry", "date"];

fruits.forEach((fruits) => console.log(fruits.toUpperCase()));

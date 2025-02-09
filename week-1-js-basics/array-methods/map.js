// Map

// The map method creates a new array populated with the result of callign a provided function on every element in the calling array

// How it works
// 1. It iterates over each element in the array
// 2. It applies the provided function to each element
// 3. It creates a new array with the results of the provided function
// 4. It returns the new array

// Example

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doubledNumbers = numbers.map((num) => num * 2);

console.log("doubledNumbers", doubledNumbers);

// Practice exercise

//  Given an array of objects representing a books, create a new array with just the book titles.

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen" },
];

const title = books.map((bookTitles) => bookTitles.title);
console.log("title", title);

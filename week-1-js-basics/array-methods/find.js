// Find method

// It returns the value of first element in an array that satisfies a provided testing function.
// If no elements satisfy the testing function, undefined is returned.

// How it works
// It iterates over each element in the array
// IT apples the testing function to each element
// if the testing function returns true, for an element, find immediately returns that element
// If the testing function never returns true, find returns undefined

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const found = numbers.find((num) => num < 3);

console.log("found", found);

// The find() method's key characteristic is that it stops iterating and returns immediately upon finding the first element that satisfies the condition.

// Practice exercise
//  Given an array of objects representing users, find the first user who is an admin

// Defining array of user objects
const user = [
  { id: 1, name: "Alice", isAdmin: false },
  { id: 2, name: "Bob", isAdmin: true },
  { id: 3, name: "Charlie", isAdmin: false },
];

const adminUser = user.find((user) => user.isAdmin);
console.log("adminUser", adminUser);

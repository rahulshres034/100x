/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  // Create an object to store category totals
  const categoryTotals = {};

  // Loop through each transaction
  transactions.forEach((transaction) => {
    const category = transaction.category; // Get the category
    const price = transaction.price; // Get the price

    // If category doesn't exist in our tracking object, initialize it to 0
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    // Add the price to the running total for this category
    categoryTotals[category] += price;
  });

  // Convert the object into the required array format
  return Object.keys(categoryTotals).map((category) => ({
    category: category,
    totalSpent: categoryTotals[category],
  }));
}

// Let's test it with some examples
const transactions = [
  {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: "Food",
    itemName: "Pizza",
  },
  {
    id: 2,
    timestamp: 1656076800000,
    price: 20,
    category: "Food",
    itemName: "Burger",
  },
  {
    id: 3,
    timestamp: 1656076800000,
    price: 15,
    category: "Entertainment",
    itemName: "Movie",
  },
];

console.log(calculateTotalSpentByCategory(transactions));
/* Output will be:
[
    { category: 'Food', totalSpent: 30 },
    { category: 'Entertainment', totalSpent: 15 }
]
*/

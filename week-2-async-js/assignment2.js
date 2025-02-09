// Create promisified version of  fetch

// function to create a promisified version of fetch
function promisifiedFetch(url) {
  // returns a promise  that resolve after the fetch is complete
  return new Promise((resolve, reject) => {
    // fetch the data from the given url
    fetch(url)
      .then((data) => resolve(data)) // if the fetch is successful, resolve the promise with data
      .catch((error) => {
        reject(error);
      }); // if the fetch is unsuccessful, reject the promise with error
  });
}

// call the promisified fetch
promisifiedFetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

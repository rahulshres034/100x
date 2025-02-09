// Create promisified version of  fs.readFile

//import the fs module
const fs = require("fs");

// function to create promisified version of fs.readfile

function promisifiedReadFile(path) {
  //
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (error, data) => {
      // if the file is read successfully, resolve the promise with the data
      if (!error) {
        resolve(data);
      } else {
        // if hte file is not read, reject the promise with error
        reject(error);
      }
    });
  });
}

// call the promisified read file function to read file with path

promisifiedReadFile("a.txt")
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

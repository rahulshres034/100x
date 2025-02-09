// Try to create promosofied version of setTimeout


console.log("first me")
// function to create a promisified version of settimeout
function promisifiedSettimeout(time){

    // returns a promise that is resolved after given time
    return new Promise((resolve, reject) => {
        // set a timeout for given time
        setTimeout(()=>{
            //resolve the promise after given time
            resolve();
        }, time)
    })
}

// call the promisified timeout after two seconds

promisifiedSettimeout(2000).then(()=>{
    console.log("Called after 2 seconds")
})
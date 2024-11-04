const { addOne, minusOne } = require("./coverage/lib");

let x = 42;

console.log("X value is:", x);

console.log("X+1 value is:", addOne(x));
console.log("X-1 value is:", minusOne(x));
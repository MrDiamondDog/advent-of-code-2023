import {getInput} from "../../utils/input";

const input = getInput(6).replaceAll(" ", "").split("\n");

const time = parseInt(input[0].split(":")[1]);
const distance = parseInt(input[1].split(":")[1]);

// This is the brute force technique. It's actually pretty fast if you don't log anything
console.time("brute force");
let product = 1;
let possibleRaces = 0;
for (let j = 0; j < time; j++) {
    if (j * (time - j) <= distance) continue;
    possibleRaces++;
}
product *= possibleRaces;
console.timeEnd("brute force");
console.log("product:", product);

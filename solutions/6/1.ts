import {getInput} from "../../utils/input";

const input = getInput(6)
    .replaceAll(/[ \t]+/g, " ")
    .split("\n");

const times = input[0].split(" ").map((val) => parseInt(val));
times.shift();
const distances = input[1].split(" ").map((val) => parseInt(val));
distances.shift();

let product = 1;
for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distanceToBeat = distances[i];

    let possibleRaces = 0;
    for (let j = 0; j < time; j++) {
        const distance = j * (time - j);
        if (distance <= distanceToBeat) continue;
        possibleRaces++;
    }
    console.log(possibleRaces);
    product *= possibleRaces;
}

console.log(product);

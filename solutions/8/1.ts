import {getInput} from "../../utils/input";

type Direction = {
    str: string;
    location: string;
    right: string;
    left: string;
};

const input = getInput(8);

const sequence = input.split("\n\n")[0];
const directionsStr = input.split("\n\n")[1].replaceAll(" ", "").split("\n");

const directions: Direction[] = [];

for (const direction of directionsStr) {
    let [location, everythingElse] = direction.split("=");
    everythingElse = everythingElse.replaceAll("(", "").replaceAll(")", "");

    const [left, right] = everythingElse.split(",");

    directions.push({
        str: direction,
        left,
        right,
        location
    });
}

const start = directions.find((dir) => dir.location == "AAA")!;
const end = directions.find((dir) => dir.location == "ZZZ")!;

let steps = 0;
let i = 0;
let currentDir: Direction = start;
while (currentDir != end) {
    console.log(currentDir, sequence[i]);
    if (sequence[i] == "L") currentDir = directions.find((dir) => dir.location == currentDir.left)!;
    else if (sequence[i] == "R")
        currentDir = directions.find((dir) => dir.location == currentDir.right)!;

    steps++;

    i++;
    if (i >= sequence.length) i = 0;
}

console.log(steps);

import {getInput} from "../../utils/input";
import {lcmAll} from "../../utils/math";

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

const start = directions.filter((dir) => dir.location.endsWith("A"))!;

let seqI = 0;
let currentPaths = start;
const steps: number[] = [];
for (const path of currentPaths) {
    seqI = 0;
    let currentPath = path;
    let currentSteps = 0;

    console.log(path);
    while (true) {
        currentPath =
            sequence[seqI] == "L"
                ? directions.find((dir) => dir.location == currentPath.left)!
                : directions.find((dir) => dir.location == currentPath.right)!;

        currentSteps++;

        if (currentPath.location.endsWith("Z")) break;

        seqI++;
        if (seqI >= sequence.length) seqI = 0;
    }

    steps.push(currentSteps);
}

console.log(lcmAll(steps));

import {getInput} from "../../utils/input";

const input = getInput(1).split("\n");
let sum = 0;

for (let i = 0; i < input.length; i++) {
    let num = "";
    for (let j = 0; j < input[i].length; j++) {
        const char = input[i][j];

        const int = parseInt(char);
        if (Number.isNaN(int)) continue;

        num += int;
    }
    num = num.substring(0, 1) + num.substring(num.length - 1);
    sum += parseInt(num);
}

console.log(sum);

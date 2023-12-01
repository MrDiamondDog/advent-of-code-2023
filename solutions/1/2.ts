import {getInput} from "../../utils/input";

interface Numbers {
    [key: string]: number;
}

const numbers: Numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

const input = getInput(1).split("\n");
let sum = 0;

for (var i = 0; i < input.length; i++) {
    let num = "";
    let line = input[i];

    Object.keys(numbers).forEach((number) => {
        line = line.replaceAll(
            number,
            number + numbers[number] + number.substring(number.length - 1)
        );
    });

    for (let j = 0; j < line.length; j++) {
        const char = line[j];

        const int = parseInt(char);
        if (Number.isNaN(int)) continue;

        num += int;
    }
    num = num.substring(0, 1) + num.substring(num.length - 1);
    console.log(line, "|", num);
    sum += parseInt(num);
}

console.log(sum, "in", i, "iterations");

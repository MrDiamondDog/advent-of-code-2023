import {getInput} from "../../utils/input";

const input = getInput(4).split("\n");

interface Card {
    id: number;
    winningNumbers: number[];
    numbers: number[];
}
const cards: Card[] = [];

for (let i = 0; i < input.length; i++) {
    const card: Card = {
        id: i + 1,
        winningNumbers: [],
        numbers: []
    };

    let line = input[i];
    line = line.split(": ")[1];
    line = line.replaceAll("  ", " ");

    const [winning, yours] = line.split(" | ");
    card.winningNumbers = winning.split(" ").map((val) => parseInt(val));
    card.numbers = yours.split(" ").map((val) => parseInt(val));

    cards.push(card);
}
console.log(cards);

let sum = 0;
for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    let points = 0;

    card.numbers.forEach((num) => {
        if (card.winningNumbers.includes(num)) {
            if (points == 0) points = 1;
            else points *= 2;
        }
    });

    sum += points;
}

console.log(sum);

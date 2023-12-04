import {getInput} from "../../utils/input";

const input = getInput(4).split("\n");

function range(from: number, to: number): number[] {
    const out: number[] = [];
    for (let i = from; i <= to; i++) {
        out.push(i);
    }
    return out;
}

interface Card {
    id: number;
    winningNumbers: number[];
    numbers: number[];
    matches: number;
    copies: number;
}
const cards: Card[] = [];

for (let i = 0; i < input.length; i++) {
    const card: Card = {
        id: i + 1,
        winningNumbers: [],
        numbers: [],
        matches: 0,
        copies: 1
    };

    let line = input[i];
    line = line.split(": ")[1];
    line = line.replaceAll("  ", " ");

    const [winning, yours] = line.split(" | ");
    card.winningNumbers = winning.split(" ").map((val) => parseInt(val));
    card.numbers = yours.split(" ").map((val) => parseInt(val));

    cards.push(card);
}

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    card.numbers.forEach((num) => {
        if (card.winningNumbers.includes(num)) {
            card.matches++;
        }
    });

    range(card.id, card.matches + i).forEach((j) => {
        cards[j].copies += card.copies;
    });
}

console.log(cards.map((card) => `id: ${card.id} copies: ${card.copies}`).join("\n"));

let sum = 0;
cards.forEach((card) => {
    sum += card.copies;
});

console.log(sum);

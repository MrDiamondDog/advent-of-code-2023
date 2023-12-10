import { getInput } from "../../utils/input";

type Hand = {
    str: string;
    bid: number;
    handRank?: Rank;
};

type Rank =
    | "five of a kind"
    | "four of a kind"
    | "full house"
    | "three of a kind"
    | "two pair"
    | "one pair"
    | "high card";
const rankOrder: Rank[] = [
    "five of a kind",
    "four of a kind",
    "full house",
    "three of a kind",
    "two pair",
    "one pair",
    "high card"
];
const charOrder = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const input = getInput(7).split("\n");
const hands: Hand[] = input.map((line) => {
    return {
        str: line.split(" ")[0],
        bid: parseInt(line.split(" ")[1])
    };
});

function rankHand(hand: Hand): Rank {
    const charCounts: { [key: string]: number; } = {};

    for (let i = 0; i < hand.str.length; i++) {
        const char = hand.str[i];

        if (!charCounts[char]) charCounts[char] = 1;
        else charCounts[char]++;
    }

    // this took hours to find
    if (charCounts["J"] == 5) return "five of a kind";
    if (charCounts["J"]) {
        let highest = "";
        for (const key in charCounts) {
            if (key == "J") continue;
            if (highest == "") {
                highest = key;
                continue;
            }
            if (charCounts[key] > charCounts[highest]) highest = key;
        }

        charCounts[highest] += charCounts["J"];

        delete charCounts["J"];
    }

    const keys = Object.keys(charCounts);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = charCounts[key];

        if (val == 5) return "five of a kind";
        if (val == 4) return "four of a kind";

        if (i < keys.length - 1) {
            if (val == 3 && charCounts[keys[i + 1]] == 2) return "full house";
            if (val == 2 && charCounts[keys[i + 1]] == 3) return "full house";
        }

        if (val == 3) return "three of a kind";
    }

    let count = 0;
    for (const key in charCounts) {
        const val = charCounts[key];

        if (val <= 1) continue;
        count++;
    }

    if (count == 2) return "two pair";
    if (count == 1) return "one pair";

    return "high card";
}

for (const hand of hands) {
    hand.handRank = rankHand(hand);
    console.log(hand.str, hand.handRank);
}

hands.sort((a, b) => {
    if (rankOrder.indexOf(a.handRank!) > rankOrder.indexOf(b.handRank!)) return 1;
    if (rankOrder.indexOf(a.handRank!) < rankOrder.indexOf(b.handRank!)) return -1;

    for (let i = 0; i < a.str.length; i++) {
        if (charOrder.indexOf(a.str[i]) > charOrder.indexOf(b.str[i])) return 1;
        if (charOrder.indexOf(a.str[i]) < charOrder.indexOf(b.str[i])) return -1;
    }

    return 0;
});

hands.reverse();
console.log(hands);

let sum = 0;
for (const hand of hands) {
    console.log(hand.str, hands.indexOf(hand) + 1);
    sum += hand.bid * (hands.indexOf(hand) + 1);
}

console.log(sum);

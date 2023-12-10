import { getInput } from "../../utils/input";

type History = number[];
type Sequence = {
    original: History;
    subsequences: History[];
};

function allZeros(history: History) {
    if (history.length == 0) return false;

    for (let i = 0; i < history.length; i++) {
        const num = history[i];
        if (num != 0) return false;
    }

    return true;
}

function extrapolate(sequence: Sequence): number {
    let currentVal = 0;

    for (let i = sequence.subsequences.length - 2; i >= 0; i--) {
        const subsequence = sequence.subsequences[i];
        const left = subsequence[subsequence.length - 1];
        currentVal += left;
    }

    currentVal += sequence.original[sequence.original.length - 1];

    return currentVal;
}

const input = getInput(9).split("\n");
const rawSequences = input.map(line => line.split(" ").map(num => parseInt(num)) as History);

const sequences: Sequence[] = [];
for (const rawSequence of rawSequences) {
    const sequence: Sequence = {
        original: rawSequence,
        subsequences: [[]]
    };

    let i = 0;
    let lastSequence = rawSequence;
    while (!allZeros(sequence.subsequences[sequence.subsequences.length - 1])) {
        if (i != 0) sequence.subsequences.push([]);

        for (let j = 0; j < lastSequence.length - 1; j++) {
            sequence.subsequences[i].push(lastSequence[j + 1] - lastSequence[j]);
        }
        lastSequence = sequence.subsequences[i];

        i++;
    }

    sequences.push(sequence);
}

let sum = 0;
for (const sequence of sequences) {
    sum += extrapolate(sequence);
}

console.log(sum);
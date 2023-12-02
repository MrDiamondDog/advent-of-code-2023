import { getInput } from "../../utils/input";

const config = {
    red: 12,
    green: 13,
    blue: 14
};

interface Game {
    id: number;
    sets: {
        red: number;
        blue: number;
        green: number;
    }[];
}

const input = getInput(2).split("\n");

function parseGame(index: number): Game {
    let line = input[index];

    const out: Game = {
        id: index,
        sets: []
    };

    line = line.replaceAll(/(,|;) /g, "$1");
    line = line.split(": ")[1];

    const sets = line.split(";");

    for (let i = 0; i < sets.length; i++) {
        const set = sets[i];

        out.sets.push({
            red: 0,
            green: 0,
            blue: 0
        });

        const subsets = set.split(",");

        for (let j = 0; j < subsets.length; j++) {
            const subset = subsets[j];

            let index = 0;
            let num = "";
            while (subset[index] != " ") {
                num += subset[index];
                index++;
            }

            const parsedNum = parseInt(num);
            const color = subset.split(" ")[1] as keyof Game["sets"][0];

            out.sets[out.sets.length - 1][color] = parsedNum;
        }
    }

    return out;
}

function isValidGame(game: Game): boolean {
    for (const set of game.sets) {
        if (set.red > config.red) return false;
        if (set.green > config.green) return false;
        if (set.blue > config.blue) return false;
    }
    return true;
}

function fewest(game: Game, color: keyof Game["sets"][0]) {
    let max = 0;
    for (const set of game.sets) {
        if (set[color] > max) max = set[color];
    }
    return max;
}

function power(set: Game["sets"][0]) {
    return set.red * set.green * set.blue;
}

let total = 0;
for (let i = 0; i < input.length; i++) {
    const game = parseGame(i);
    const fewestColors: Game["sets"][0] = {
        red: fewest(game, "red"),
        green: fewest(game, "green"),
        blue: fewest(game, "blue")
    };
    total += power(fewestColors);
}
console.log(total);